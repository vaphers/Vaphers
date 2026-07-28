import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import admin from 'firebase-admin';

// Initialize Firebase Admin
const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT || '{}');
if (!admin.apps.length && Object.keys(serviceAccount).length > 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}
const db = admin.apps.length ? admin.firestore() : null;

// Simple In-memory Sliding Window Rate Limiter
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  
  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, validTimestamps);
    return true;
  }
  
  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

function escapeHtml(str: string | undefined | null): string {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "Unknown IP";
    const userAgent = request.headers.get("user-agent") || "Unknown User Agent";

    // 1. IP Rate Limiting Check
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: "Too many submissions from your network. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    // Support both JSON body and FormData
    const contentType = request.headers.get("content-type") || "";
    let data: Record<string, any> = {};

    if (contentType.includes("application/json")) {
      data = await request.json();
    } else {
      const formData = await request.formData();
      formData.forEach((value, key) => {
        data[key] = value.toString();
      });
    }

    // 2. Honeypot Anti-Spam Check
    const honeypot = data.botcheck || data._hp || data.website_url_hp;
    if (honeypot && String(honeypot).trim() !== "") {
      console.warn(`[Anti-Spam] Honeypot triggered from IP ${ip}`);
      return NextResponse.json({ success: true, message: "Submission received." });
    }

    // 3. Render Timestamp Check (Bot Velocity Prevention)
    if (data._ts) {
      const renderTime = Number(data._ts);
      if (!isNaN(renderTime) && Date.now() - renderTime < 1200) {
        console.warn(`[Anti-Spam] Instant bot submission (<1.2s) from IP ${ip}`);
        return NextResponse.json({ success: true, message: "Submission received." });
      }
    }

    // Extract Form Fields
    const formType = escapeHtml(data.formType || "Website Contact Form");
    const firstName = escapeHtml(data.first_name || data.name || "");
    const lastName = escapeHtml(data.last_name || "");
    const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Website Visitor";
    const email = escapeHtml(data.email || "");
    const website = escapeHtml(data.website || data.client_website || "");
    const service = escapeHtml(data.service || "General Inquiry");
    const message = escapeHtml(data.message || data.note || "");
    const contactMethod = escapeHtml(data.contactMethod || "");
    const pageUrl = escapeHtml(data.pageUrl || request.headers.get("referer") || "https://www.vaphers.com");
    const blogTitle = escapeHtml(data.blogTitle || "");
    const phoneNumber = escapeHtml(data.phoneNumber || "");
    const websiteSkipReason = escapeHtml(data.websiteSkipReason || "");

    const submissionTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    }) + " (IST)";

    // Validate Required Email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // 4. Create Nodemailer Transporter
    const gmailUser = process.env.GMAIL_USER || "vapherstech@gmail.com";
    const gmailPass = (process.env.GMAIL_APP_PASSWORD || "uvbk vgsd ltfk jaxa").replace(/\s+/g, "");
    
    // Multiple recipients: crew@vaphers.com + primary recipient
    const primaryRecipient = process.env.RECIPIENT_EMAIL || "vapherstech@gmail.com";
    const recipientEmails = Array.from(
      new Set([primaryRecipient, "crew@vaphers.com", "vapherstech@gmail.com"])
    ).filter(Boolean).join(", ");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const serviceLabels: Record<string, string> = {
      audit: "Website Audit (Free)",
      seo: "Search Engine Optimization",
      ppc: "Pay Per Click (Paid Ads)",
      smo: "Social Media Optimization",
      webdev: "Website Development",
      appdev: "App Development",
      custom: "Custom Softwares",
    };
    const serviceDisplay = serviceLabels[service] || service;

    // 5. Clean, Minimal, Professional HTML Email Template (No logo, No bold fonts, Streamlined)
    const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Form Submission</title>
</head>
<body style="margin:0;padding:0;background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;line-height:1.5;">

  <div style="max-width:520px;margin:0 auto;padding:24px 16px;">
    
    <!-- Minimal Blue Accent Line -->
    <div style="height:2px;background-color:#2383e2;margin-bottom:20px;"></div>

    <!-- Subtitle Header -->
    <p style="margin:0 0 4px 0;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;font-weight:400;">${formType}</p>
    <h2 style="margin:0 0 20px 0;font-size:17px;font-weight:500;color:#0f172a;">
      New submission from ${fullName}
    </h2>

    <!-- Key-Value Table -->
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-size:13px;font-weight:400;">
      
      ${fullName ? `
      <tr>
        <td style="padding:9px 0;color:#64748b;width:130px;vertical-align:top;border-bottom:1px solid #f1f5f9;font-weight:400;">Name</td>
        <td style="padding:9px 0;color:#0f172a;vertical-align:top;border-bottom:1px solid #f1f5f9;font-weight:400;">${fullName}</td>
      </tr>
      ` : ''}

      ${email ? `
      <tr>
        <td style="padding:9px 0;color:#64748b;width:130px;vertical-align:top;border-bottom:1px solid #f1f5f9;font-weight:400;">Email</td>
        <td style="padding:9px 0;color:#2383e2;vertical-align:top;border-bottom:1px solid #f1f5f9;font-weight:400;">
          <a href="mailto:${email}" style="color:#2383e2;text-decoration:none;">${email}</a>
        </td>
      </tr>
      ` : ''}

      ${phoneNumber ? `
      <tr>
        <td style="padding:9px 0;color:#64748b;width:130px;vertical-align:top;border-bottom:1px solid #f1f5f9;font-weight:400;">Phone</td>
        <td style="padding:9px 0;color:#0f172a;vertical-align:top;border-bottom:1px solid #f1f5f9;font-weight:400;">
          <a href="tel:${phoneNumber}" style="color:#0f172a;text-decoration:none;">${phoneNumber}</a>
        </td>
      </tr>
      ` : ''}

      ${serviceDisplay && serviceDisplay !== "General Inquiry" ? `
      <tr>
        <td style="padding:9px 0;color:#64748b;width:130px;vertical-align:top;border-bottom:1px solid #f1f5f9;font-weight:400;">Service</td>
        <td style="padding:9px 0;color:#0f172a;vertical-align:top;border-bottom:1px solid #f1f5f9;font-weight:400;">${serviceDisplay}</td>
      </tr>
      ` : ''}

      ${website ? `
      <tr>
        <td style="padding:9px 0;color:#64748b;width:130px;vertical-align:top;border-bottom:1px solid #f1f5f9;font-weight:400;">Website</td>
        <td style="padding:9px 0;color:#2383e2;vertical-align:top;border-bottom:1px solid #f1f5f9;font-weight:400;">
          <a href="${website.startsWith("http") ? website : "https://" + website}" target="_blank" style="color:#2383e2;text-decoration:none;">${website}</a>
        </td>
      </tr>
      ` : ''}

      ${!website && websiteSkipReason ? `
      <tr>
        <td style="padding:9px 0;color:#64748b;width:130px;vertical-align:top;border-bottom:1px solid #f1f5f9;font-weight:400;">Website Notes</td>
        <td style="padding:9px 0;color:#dc2626;vertical-align:top;border-bottom:1px solid #f1f5f9;font-weight:400;">${websiteSkipReason}</td>
      </tr>
      ` : ''}

      ${contactMethod ? `
      <tr>
        <td style="padding:9px 0;color:#64748b;width:130px;vertical-align:top;border-bottom:1px solid #f1f5f9;font-weight:400;">Preference</td>
        <td style="padding:9px 0;color:#0f172a;vertical-align:top;border-bottom:1px solid #f1f5f9;font-weight:400;">${contactMethod === "call" ? "Request a Call" : "Email"}</td>
      </tr>
      ` : ''}

      ${blogTitle ? `
      <tr>
        <td style="padding:9px 0;color:#64748b;width:130px;vertical-align:top;border-bottom:1px solid #f1f5f9;font-weight:400;">Article</td>
        <td style="padding:9px 0;color:#0f172a;vertical-align:top;border-bottom:1px solid #f1f5f9;font-weight:400;">${blogTitle}</td>
      </tr>
      ` : ''}

      <tr>
        <td style="padding:9px 0;color:#64748b;width:130px;vertical-align:top;border-bottom:1px solid #f1f5f9;font-weight:400;">Source Page</td>
        <td style="padding:9px 0;color:#64748b;vertical-align:top;border-bottom:1px solid #f1f5f9;font-weight:400;word-break:break-all;">
          <a href="${pageUrl}" target="_blank" style="color:#64748b;text-decoration:underline;">${pageUrl}</a>
        </td>
      </tr>

    </table>

    ${message ? `
    <!-- Message Section -->
    <div style="margin-top:16px;padding:12px 14px;background:#f8fafc;border-radius:6px;border:1px solid #e2e8f0;">
      <p style="margin:0 0 4px 0;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;font-weight:400;">Message</p>
      <p style="margin:0;font-size:13px;color:#334155;white-space:pre-wrap;font-weight:400;">${message}</p>
    </div>
    ` : ''}

    <!-- Quick Action & Footer -->
    <div style="margin-top:20px;padding-top:16px;border-top:1px solid #f1f5f9;font-size:12px;color:#64748b;">
      <p style="margin:0 0 8px 0;font-weight:400;">
        <a href="mailto:${email}" style="color:#2383e2;text-decoration:none;">Reply directly to ${email} &rarr;</a>
      </p>
      <p style="margin:0;font-size:11px;color:#94a3b8;font-weight:400;">
        ${submissionTime} &middot; IP: ${ip}
      </p>
    </div>

  </div>

</body>
</html>
    `;

    // 6. Save to Firestore Database
    if (db) {
      try {
        await db.collection("leads").add({
          fullName,
          firstName,
          lastName,
          email,
          website,
          service,
          message,
          contactMethod,
          pageUrl,
          blogTitle,
          phoneNumber,
          websiteSkipReason,
          formType,
          ip,
          userAgent,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          status: "new"
        });
      } catch (dbError) {
        console.error("Failed to save lead to Firestore:", dbError);
      }
    }

    // 7. Send Mail via Gmail SMTP to recipientEmails (including crew@vaphers.com)
    const mailOptions = {
      from: `"Vaphers Forms" <${gmailUser}>`,
      to: recipientEmails,
      replyTo: email,
      subject: `[Lead Submission] ${formType} - ${fullName}`,
      html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully.",
    });

  } catch (error: any) {
    console.error("[Email Sending Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to send email notification." },
      { status: 500 }
    );
  }
}

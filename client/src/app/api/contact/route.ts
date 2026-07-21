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
  
  // Filter out timestamps older than the window
  const validTimestamps = timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  
  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, validTimestamps);
    return true;
  }
  
  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

// Escape HTML special characters to prevent HTML injection in emails
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
    // If botcheck or _hp is filled, silently return success without sending email
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
    const contactMethod = escapeHtml(data.contactMethod || "email");
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

    // 4. Create Nodemailer Gmail Transporter
    const gmailUser = process.env.GMAIL_USER || "vapherstech@gmail.com";
    const gmailPass = (process.env.GMAIL_APP_PASSWORD || "uvbk vgsd ltfk jaxa").replace(/\s+/g, "");
    const recipientEmail = process.env.RECIPIENT_EMAIL || "vapherstech@gmail.com";

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    // 5. Build Premium Vaphers HTML Email Template
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

    const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead - Vaphers</title>
  <!--[if mso]>
  <style>table,td,div,p,span{font-family:Arial,Helvetica,sans-serif !important;}</style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#eef2f7;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;">

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#eef2f7;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Card -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:560px;background-color:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.07),0 1px 3px rgba(0,0,0,0.04);">

          <!-- Top accent stripe -->
          <tr>
            <td style="height:5px;background:linear-gradient(90deg,#2563eb 0%,#38bdf8 50%,#818cf8 100%);font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding:36px 40px 28px 40px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <!-- Logo mark -->
                    <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width:36px;height:36px;background:#2563eb;border-radius:10px;text-align:center;vertical-align:middle;color:#fff;font-weight:800;font-size:16px;letter-spacing:-0.5px;">V</td>
                        <td style="padding-left:12px;font-size:18px;font-weight:700;color:#0f172a;letter-spacing:-0.3px;">Vaphers</td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" valign="top">
                    <span style="display:inline-block;background:#eff6ff;color:#2563eb;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;padding:5px 12px;border-radius:20px;">New Lead</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="padding:0 40px;"><div style="height:1px;background:#e2e8f0;"></div></td></tr>

          <!-- Form Type Banner -->
          <tr>
            <td style="padding:24px 40px 8px 40px;">
              <p style="margin:0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;">${formType}</p>
              <h1 style="margin:6px 0 0 0;font-size:22px;font-weight:700;color:#0f172a;letter-spacing:-0.3px;line-height:1.3;">
                ${fullName}
              </h1>
              <p style="margin:4px 0 0 0;font-size:14px;color:#2563eb;">
                <a href="mailto:${email}" style="color:#2563eb;text-decoration:none;">${email}</a>
              </p>
            </td>
          </tr>

          <!-- Data Fields -->
          <tr>
            <td style="padding:20px 40px 0 40px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse:separate;border-spacing:0;">

                ${contactMethod ? `
                <!-- Contact Method -->
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #f1f5f9;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width:32px;vertical-align:top;">
                          <div style="width:32px;height:32px;background:#f0fdf4;border-radius:8px;text-align:center;line-height:32px;font-size:12px;font-weight:700;color:#16a34a;">${contactMethod === "call" ? "TEL" : "MSG"}</div>
                        </td>
                        <td style="padding-left:14px;vertical-align:middle;">
                          <p style="margin:0;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#94a3b8;">Preferred Contact</p>
                          <p style="margin:2px 0 0 0;font-size:14px;font-weight:600;color:#0f172a;">${contactMethod === "call" ? "Request a Call" : "Contact via Email"}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ""}

                ${serviceDisplay && serviceDisplay !== "General Inquiry" ? `
                <!-- Service -->
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #f1f5f9;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width:32px;vertical-align:top;">
                          <div style="width:32px;height:32px;background:#eff6ff;border-radius:8px;text-align:center;line-height:32px;font-size:12px;font-weight:700;color:#2563eb;">SVC</div>
                        </td>
                        <td style="padding-left:14px;vertical-align:middle;">
                          <p style="margin:0;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#94a3b8;">Service Interest</p>
                          <p style="margin:2px 0 0 0;font-size:14px;font-weight:600;color:#0f172a;">${serviceDisplay}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ""}

                ${website ? `
                <!-- Website -->
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #f1f5f9;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width:32px;vertical-align:top;">
                          <div style="width:32px;height:32px;background:#fef3c7;border-radius:8px;text-align:center;line-height:32px;font-size:12px;font-weight:700;color:#d97706;">WEB</div>
                        </td>
                        <td style="padding-left:14px;vertical-align:middle;">
                          <p style="margin:0;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#94a3b8;">Client Website</p>
                          <p style="margin:2px 0 0 0;font-size:14px;font-weight:600;color:#2563eb;word-break:break-all;">
                            <a href="${website.startsWith("http") ? website : "https://" + website}" target="_blank" style="color:#2563eb;text-decoration:none;">${website}</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ""}

                ${!website && websiteSkipReason ? `
                <!-- Website Skip Reason -->
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #f1f5f9;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width:32px;vertical-align:top;">
                          <div style="width:32px;height:32px;background:#fee2e2;border-radius:8px;text-align:center;line-height:32px;font-size:12px;font-weight:700;color:#dc2626;">N/A</div>
                        </td>
                        <td style="padding-left:14px;vertical-align:middle;">
                          <p style="margin:0;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#94a3b8;">No Website Provided</p>
                          <p style="margin:2px 0 0 0;font-size:14px;font-weight:600;color:#ef4444;">${websiteSkipReason}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ""}

                ${phoneNumber ? `
                <!-- Phone Number -->
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #f1f5f9;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width:32px;vertical-align:top;">
                          <div style="width:32px;height:32px;background:#dcfce7;border-radius:8px;text-align:center;line-height:32px;font-size:12px;font-weight:700;color:#16a34a;">PHN</div>
                        </td>
                        <td style="padding-left:14px;vertical-align:middle;">
                          <p style="margin:0;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#94a3b8;">Phone Number</p>
                          <p style="margin:2px 0 0 0;font-size:14px;font-weight:600;color:#0f172a;">
                            <a href="tel:${phoneNumber}" style="color:#0f172a;text-decoration:none;">${phoneNumber}</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ""}


                ${blogTitle ? `
                <!-- Blog Title -->
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #f1f5f9;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width:32px;vertical-align:top;">
                          <div style="width:32px;height:32px;background:#fce7f3;border-radius:8px;text-align:center;line-height:32px;font-size:12px;font-weight:700;color:#db2777;">BLOG</div>
                        </td>
                        <td style="padding-left:14px;vertical-align:middle;">
                          <p style="margin:0;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#94a3b8;">Blog Article</p>
                          <p style="margin:2px 0 0 0;font-size:14px;font-weight:600;color:#0f172a;">${blogTitle}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ""}

                <!-- Page URL -->
                <tr>
                  <td style="padding:14px 0;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width:32px;vertical-align:top;">
                          <div style="width:32px;height:32px;background:#f5f3ff;border-radius:8px;text-align:center;line-height:32px;font-size:12px;font-weight:700;color:#7c3aed;">URL</div>
                        </td>
                        <td style="padding-left:14px;vertical-align:middle;">
                          <p style="margin:0;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#94a3b8;">Submitted From</p>
                          <p style="margin:2px 0 0 0;font-size:13px;font-weight:500;color:#64748b;word-break:break-all;">
                            <a href="${pageUrl}" target="_blank" style="color:#64748b;text-decoration:underline;">${pageUrl}</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          ${message ? `
          <!-- Message Section -->
          <tr>
            <td style="padding:4px 40px 0 40px;">
              <div style="background:#f8fafc;border-radius:14px;padding:20px 24px;border:1px solid #e2e8f0;">
                <p style="margin:0 0 8px 0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;">Message</p>
                <p style="margin:0;font-size:14px;line-height:1.7;color:#334155;white-space:pre-wrap;">${message}</p>
              </div>
            </td>
          </tr>
          ` : ""}

          <!-- CTA Button -->
          <tr>
            <td style="padding:28px 40px 0 40px;" align="center">
              <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="border-radius:12px;background:#2563eb;box-shadow:0 4px 14px rgba(37,99,235,0.3);">
                    <a href="mailto:${email}" target="_blank" style="display:inline-block;padding:14px 36px;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;letter-spacing:0.2px;">
                      Reply to ${firstName || "Client"} &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Spacer -->
          <tr><td style="height:32px;"></td></tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #f1f5f9;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="font-size:11px;color:#94a3b8;line-height:1.7;">
                    ${submissionTime}<br>
                    IP: ${ip}
                  </td>
                  <td align="right" style="font-size:11px;color:#cbd5e1;">
                    Spam check passed ✓
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

        <!-- Sub-footer -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:560px;">
          <tr>
            <td align="center" style="padding:24px 0 0 0;font-size:11px;color:#b0bec5;">
              Vaphers &middot; Lead Management &middot; &copy; ${new Date().getFullYear()}
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

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
        // Continue and send email even if DB save fails
      }
    }

    // 7. Send Mail via Gmail SMTP
    const mailOptions = {
      from: `"Vaphers Forms" <${gmailUser}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `[Vaphers Lead] ${formType} from ${fullName}`,
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

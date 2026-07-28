import { NextResponse } from "next/server";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
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
    const body = await request.json();
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "Unknown IP";
    const userAgent = request.headers.get("user-agent") || "Unknown User Agent";

    // 1. Honeypot check
    if (body.botcheck || body._hp) {
      return NextResponse.json({ success: true, message: "Lead received." });
    }

    const website = escapeHtml(body.website || "");
    const blogTitle = escapeHtml(body.blogTitle || "Blog Article");
    const pageUrl = escapeHtml(body.pageUrl || request.headers.get("referer") || "https://www.vaphers.com/blogs");
    const submissionTime = body.submissionTime || new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    }) + " (IST)";

    // 2. Save to Firestore Database
    if (db) {
      try {
        await db.collection("leads").add({
          website,
          blogTitle,
          pageUrl,
          formType: "Blog Sidebar Lead",
          ip,
          userAgent,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          status: "new"
        });
      } catch (dbError) {
        console.error("Failed to save blog lead to Firestore:", dbError);
      }
    }

    // 3. Send Gmail Email Notification
    try {
      const gmailUser = process.env.GMAIL_USER || "vapherstech@gmail.com";
      const gmailPass = (process.env.GMAIL_APP_PASSWORD || "uvbk vgsd ltfk jaxa").replace(/\s+/g, "");
      
      // Multiple recipients: crew@vaphers.com + primary recipient
      const primaryRecipient = process.env.RECIPIENT_EMAIL || "vapherstech@gmail.com";
      const recipientEmails = Array.from(
        new Set([primaryRecipient, "crew@vaphers.com", "vapherstech@gmail.com"])
      ).filter(Boolean).join(", ");

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailUser, pass: gmailPass },
      });

      // Clean, Minimal, Logo-Free HTML Email Template
      const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog Sidebar Lead</title>
</head>
<body style="margin:0;padding:0;background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;line-height:1.5;">

  <div style="max-width:520px;margin:0 auto;padding:24px 16px;">
    
    <!-- Minimal Blue Accent Line -->
    <div style="height:2px;background-color:#2383e2;margin-bottom:20px;"></div>

    <!-- Header -->
    <p style="margin:0 0 4px 0;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;font-weight:400;">Blog Sidebar Lead</p>
    <h2 style="margin:0 0 20px 0;font-size:17px;font-weight:500;color:#0f172a;">
      New website lead submitted
    </h2>

    <!-- Key-Value Table -->
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-size:13px;font-weight:400;">
      
      <tr>
        <td style="padding:9px 0;color:#64748b;width:130px;vertical-align:top;border-bottom:1px solid #f1f5f9;font-weight:400;">Submitted Website</td>
        <td style="padding:9px 0;color:#2383e2;vertical-align:top;border-bottom:1px solid #f1f5f9;font-weight:400;word-break:break-all;">
          <a href="${website.startsWith("http") ? website : "https://" + website}" target="_blank" style="color:#2383e2;text-decoration:none;">${website}</a>
        </td>
      </tr>

      <tr>
        <td style="padding:9px 0;color:#64748b;width:130px;vertical-align:top;border-bottom:1px solid #f1f5f9;font-weight:400;">Blog Article</td>
        <td style="padding:9px 0;color:#0f172a;vertical-align:top;border-bottom:1px solid #f1f5f9;font-weight:400;">${blogTitle}</td>
      </tr>

      <tr>
        <td style="padding:9px 0;color:#64748b;width:130px;vertical-align:top;border-bottom:1px solid #f1f5f9;font-weight:400;">Source Page</td>
        <td style="padding:9px 0;color:#64748b;vertical-align:top;border-bottom:1px solid #f1f5f9;font-weight:400;word-break:break-all;">
          <a href="${pageUrl}" target="_blank" style="color:#64748b;text-decoration:underline;">${pageUrl}</a>
        </td>
      </tr>

    </table>

    <!-- Quick Action & Footer -->
    <div style="margin-top:20px;padding-top:16px;border-top:1px solid #f1f5f9;font-size:12px;color:#64748b;">
      <p style="margin:0 0 8px 0;font-weight:400;">
        <a href="${website.startsWith("http") ? website : "https://" + website}" target="_blank" style="color:#2383e2;text-decoration:none;">Inspect submitted website &rarr;</a>
      </p>
      <p style="margin:0;font-size:11px;color:#94a3b8;font-weight:400;">
        ${submissionTime} &middot; IP: ${ip}
      </p>
    </div>

  </div>

</body>
</html>
      `;

      await transporter.sendMail({
        from: `"Vaphers Blog Leads" <${gmailUser}>`,
        to: recipientEmails,
        subject: `[Blog Lead] ${website}`,
        html: htmlTemplate,
      });
    } catch (emailErr) {
      console.error("Gmail notification error:", emailErr);
    }

    // 4. Optional Google Sheets Backup (if configured)
    if (process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
      try {
        const serviceAccountAuth = new JWT({
          email: process.env.GOOGLE_CLIENT_EMAIL,
          key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
          scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, serviceAccountAuth);
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];

        await sheet.addRow({
          Website: website,
          "Blog Title": blogTitle,
          "Page URL": pageUrl,
          "Submission Time": submissionTime,
        });
      } catch (sheetErr) {
        console.error("Google Sheets backup error:", sheetErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Submit lead error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save lead" },
      { status: 500 }
    );
  }
}
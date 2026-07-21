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
    const submissionTime = body.submissionTime || new Date().toISOString();

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
      const recipientEmail = process.env.RECIPIENT_EMAIL || "vapherstech@gmail.com";

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailUser, pass: gmailPass },
      });

      const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Blog Lead - Vaphers</title>
  <!--[if mso]>
  <style>table,td,div,p,span{font-family:Arial,Helvetica,sans-serif !important;}</style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#eef2f7;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">

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
                    <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width:36px;height:36px;background:#2563eb;border-radius:10px;text-align:center;vertical-align:middle;color:#fff;font-weight:800;font-size:16px;letter-spacing:-0.5px;">V</td>
                        <td style="padding-left:12px;font-size:18px;font-weight:700;color:#0f172a;letter-spacing:-0.3px;">Vaphers</td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" valign="top">
                    <span style="display:inline-block;background:#fef3c7;color:#b45309;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;padding:5px 12px;border-radius:20px;">Blog Lead</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="padding:0 40px;"><div style="height:1px;background:#e2e8f0;"></div></td></tr>

          <!-- Lead Headline -->
          <tr>
            <td style="padding:24px 40px 8px 40px;">
              <p style="margin:0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;">Blog Sidebar Lead</p>
              <h1 style="margin:6px 0 0 0;font-size:22px;font-weight:700;color:#0f172a;letter-spacing:-0.3px;line-height:1.3;">
                New website submitted
              </h1>
            </td>
          </tr>

          <!-- Data Fields -->
          <tr>
            <td style="padding:20px 40px 0 40px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse:separate;border-spacing:0;">

                <!-- Client Website -->
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #f1f5f9;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width:32px;vertical-align:top;">
                          <div style="width:32px;height:32px;background:#eff6ff;border-radius:8px;text-align:center;line-height:32px;font-size:15px;">🌐</div>
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

                <!-- Blog Title -->
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #f1f5f9;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width:32px;vertical-align:top;">
                          <div style="width:32px;height:32px;background:#fce7f3;border-radius:8px;text-align:center;line-height:32px;font-size:15px;">📝</div>
                        </td>
                        <td style="padding-left:14px;vertical-align:middle;">
                          <p style="margin:0;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#94a3b8;">Blog Article</p>
                          <p style="margin:2px 0 0 0;font-size:14px;font-weight:600;color:#0f172a;">${blogTitle}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Page URL -->
                <tr>
                  <td style="padding:14px 0;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width:32px;vertical-align:top;">
                          <div style="width:32px;height:32px;background:#f5f3ff;border-radius:8px;text-align:center;line-height:32px;font-size:15px;">📍</div>
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

          <!-- CTA Button -->
          <tr>
            <td style="padding:8px 40px 0 40px;" align="center">
              <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="border-radius:12px;background:#2563eb;box-shadow:0 4px 14px rgba(37,99,235,0.3);">
                    <a href="${website.startsWith("http") ? website : "https://" + website}" target="_blank" style="display:inline-block;padding:14px 36px;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;letter-spacing:0.2px;">
                      Visit Website &rarr;
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

      await transporter.sendMail({
        from: `"Vaphers Blog Leads" <${gmailUser}>`,
        to: recipientEmail,
        subject: `[Vaphers Blog Lead] ${website}`,
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
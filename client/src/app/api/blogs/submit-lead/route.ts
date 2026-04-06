import { NextResponse } from "next/server";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Initialize auth
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      // The replace function ensures newlines in the key are parsed correctly from the .env file
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(
      process.env.GOOGLE_SHEET_ID!,
      serviceAccountAuth
    );

    await doc.loadInfo(); 
    
    // Select the first tab in the spreadsheet
    const sheet = doc.sheetsByIndex[0]; 

    // Append the row (Keys must match your column headers exactly)
    await sheet.addRow({
      Website: body.website,
      "Blog Title": body.blogTitle,
      "Page URL": body.pageUrl,
      "Submission Time": body.submissionTime,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Google Sheets API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save lead" },
      { status: 500 }
    );
  }
}
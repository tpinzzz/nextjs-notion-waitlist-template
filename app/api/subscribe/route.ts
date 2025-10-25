import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DB_ID = process.env.NOTION_DB_ID!;

export async function POST(req: Request) {
  try {
    const { name, email, source } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    // Create a page (row) in your DB
    await notion.pages.create({
      parent: { database_id: DB_ID },
      properties: {
        // Must match your property names exactly
        Name: { title: [{ text: { content: String(name).slice(0, 200) } }] },
        Email: { email: String(email) }, // property type: Email
        Source: {
          rich_text: source ? [{ text: { content: String(source).slice(0, 500) } }] : [],
        },
        // "Created time" is an auto property—no need to set it
      },
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    // Helpful error to read in Vercel → Functions → Logs
    console.error("Notion error:", err?.body ?? err);
    return NextResponse.json({ ok: false, error: "Notion write failed" }, { status: 500 });
  }
}

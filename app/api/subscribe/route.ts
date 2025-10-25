export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

function normalizeDbId(input: string) {
  const m = input?.match(/[a-f0-9]{32}/i)?.[0];
  return m ? m.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, "$1-$2-$3-$4-$5") : input;
}
const DB_ID = normalizeDbId(process.env.NOTION_DB_ID || "");

export async function GET() {
  try {
    if (!process.env.NOTION_TOKEN || !DB_ID) {
      return NextResponse.json(
        { ok:false, reason:"Missing env vars", hasToken:!!process.env.NOTION_TOKEN, hasDbId:!!DB_ID },
        { status: 500 }
      );
    }
    const db = await notion.databases.retrieve({ database_id: DB_ID });
    return NextResponse.json({ ok:true, dbId: DB_ID, props: Object.keys(db.properties) });
  } catch (e:any) {
    return NextResponse.json({ ok:false, error: e?.body ?? String(e) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, source } = await req.json();
    if (!name || !email) return NextResponse.json({ ok:false, error:"Missing fields" }, { status: 400 });

    const props: any = {
      Name:   { title: [{ text: { content: String(name).slice(0,200) } }] },
      Source: { rich_text: source ? [{ text: { content: String(source).slice(0,500) } }] : [] },
      Email:  { email: String(email) },
    };

    try {
      await notion.pages.create({ parent: { database_id: DB_ID }, properties: props });
    } catch {
      // Fallback if Email column is not Email type
      props.Email = { rich_text: [{ text: { content: String(email) } }] };
      await notion.pages.create({ parent: { database_id: DB_ID }, properties: props });
    }

    return NextResponse.json({ ok:true });
  } catch (err:any) {
    console.error("Notion error:", err?.body ?? err);
    return NextResponse.json({ ok:false, error:"Notion write failed" }, { status: 500 });
  }
}

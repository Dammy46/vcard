import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { name, phone, email = "", company = "", website = "" } = data;

  const vcardContent = `
BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL:${phone}
EMAIL:${email}
ORG:${company}
URL:${website}
END:VCARD
  `.trim();

  const fileId = uuidv4();
  const encoded = encodeURIComponent(vcardContent);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const link = `${baseUrl}/vcard/${fileId}.vcf?data=${encoded}`;

  return NextResponse.json({ link });
}

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

interface VCardData {
  name: string;
  phone: string;
  email?: string;
  company?: string;
  website?: string;
}

export async function POST(req: NextRequest) {
  const data: VCardData = await req.json();
  const { name, phone, email = "", company = "", website = "" } = data;
  const filename = `${uuidv4()}.vcf`;

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

  const filePath = path.join(process.cwd(), "public", "vcards", filename);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, vcardContent);

  const link = `/vcards/${filename}`;
  return NextResponse.json({ link });
}

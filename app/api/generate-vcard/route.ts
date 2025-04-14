// app/api/generate-vcard/route.ts
import { NextRequest, NextResponse } from "next/server";

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

  return new NextResponse(vcardContent, {
    headers: {
      "Content-Type": "text/vcard",
      "Content-Disposition": `attachment; filename="${name.replace(
        /\s+/g,
        "_"
      )}.vcf"`,
    },
  });
}

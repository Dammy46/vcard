import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const encodedData = searchParams.get("data");
  const pathSegments = req.nextUrl.pathname.split("/");
  const filename = pathSegments[pathSegments.length - 1];

  if (!encodedData) {
    return new NextResponse("Missing vCard data", { status: 400 });
  }

  const decoded = decodeURIComponent(encodedData);
  return new NextResponse(decoded, {
    headers: {
      "Content-Type": "text/vcard",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}

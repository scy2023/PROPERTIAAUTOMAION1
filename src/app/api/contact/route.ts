import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // In real app: send email, save to DB, etc.
  console.log("New contact form submission:", body);

  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { sign, safeEq } from "@/lib/auth";

export async function POST(req) {
  const { login, password } = await req.json().catch(() => ({}));
  const ok =
    process.env.ADMIN_LOGIN && process.env.ADMIN_PASSWORD &&
    safeEq(login || "", process.env.ADMIN_LOGIN) && safeEq(password || "", process.env.ADMIN_PASSWORD);
  if (!ok) return NextResponse.json({ error: "bad credentials" }, { status: 401 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set("adm", sign(), {
    httpOnly: true, secure: process.env.NODE_ENV === "production",
    sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

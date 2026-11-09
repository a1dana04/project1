import crypto from "crypto";
import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { isAdmin } from "@/lib/auth";

const OK = ["jpg", "jpeg", "png", "webp", "mp3", "m4a", "ogg", "wav", "aac"];

export async function POST(req) {
  if (!isAdmin()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { ext } = await req.json().catch(() => ({}));
  const e = String(ext || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!OK.includes(e)) return NextResponse.json({ error: "file type not allowed" }, { status: 400 });
  const path = `${crypto.randomUUID()}.${e}`;
  const { data, error } = await db().storage.from("media").createSignedUploadUrl(path);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({
    path, token: data.token,
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/${path}`,
  });
}

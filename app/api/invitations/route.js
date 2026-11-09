import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";
const no = () => NextResponse.json({ error: "unauthorized" }, { status: 401 });

function clean(d) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const okUrl = (u) => typeof u === "string" && u.startsWith(base + "/storage/v1/object/public/media/");
  const o = JSON.parse(JSON.stringify(d || {}));
  ["cover", "vphoto", "audio"].forEach((k) => { if (!okUrl(o[k])) o[k] = ""; });
  o.photos = Array.isArray(o.photos) ? o.photos.filter(okUrl).slice(0, 30) : [];
  o.fx = Array.isArray(o.fx) ? o.fx.slice(0, 5) : [];
  return o;
}

export async function GET() {
  if (!isAdmin()) return no();
  const { data, error } = await db().from("invitations").select("id,data,updated_at").order("updated_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ items: data.map((r) => ({ ...r.data, id: r.id })) });
}

export async function POST(req) {
  if (!isAdmin()) return no();
  const { id, data } = await req.json().catch(() => ({}));
  if (!/^[a-z0-9-]{3,40}$/.test(id || "")) return NextResponse.json({ error: "bad id" }, { status: 400 });
  const body = clean(data);
  if (JSON.stringify(body).length > 40000) return NextResponse.json({ error: "too big" }, { status: 413 });
  const { error } = await db().from("invitations").upsert({ id, data: body, updated_at: new Date().toISOString() });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req) {
  if (!isAdmin()) return no();
  const id = new URL(req.url).searchParams.get("id") || "";
  const { error } = await db().from("invitations").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

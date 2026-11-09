import { notFound } from "next/navigation";
import { db } from "@/lib/supabase";
import InvView from "@/components/InvView";

export const dynamic = "force-dynamic";

async function get(id) {
  const { data } = await db().from("invitations").select("data").eq("id", id).maybeSingle();
  return data ? data.data : null;
}

export async function generateMetadata({ params }) {
  const d = await get(params.id);
  const t = d ? `${d.n1}${d.n2 ? " & " + d.n2 : ""} — приглашение` : "Приглашение";
  return { title: t, robots: { index: false } };
}

export default async function InvitationPage({ params }) {
  const d = await get(params.id);
  if (!d) notFound();
  return <InvView data={d} />;
}

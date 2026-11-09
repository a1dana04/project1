"use client";
import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { mountDemo } from "@/lib/landing";

export default function Demo() {
  const ref = useRef(null);
  const { id } = useParams();
  useEffect(() => mountDemo(ref.current, { phone: process.env.NEXT_PUBLIC_WHATSAPP || "" }, id), [id]);
  return <div ref={ref} />;
}

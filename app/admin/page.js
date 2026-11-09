"use client";
import { useEffect, useRef } from "react";
import { mountAdmin } from "@/lib/admin";

export default function Admin() {
  const ref = useRef(null);
  useEffect(() => mountAdmin(ref.current, { phone: process.env.NEXT_PUBLIC_WHATSAPP || "" }), []);
  return <div ref={ref} />;
}

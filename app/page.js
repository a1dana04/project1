"use client";
import { useEffect, useRef } from "react";
import { mountLanding } from "@/lib/landing";

export default function Home() {
  const ref = useRef(null);
  useEffect(() => mountLanding(ref.current, { phone: process.env.NEXT_PUBLIC_WHATSAPP || "" }), []);
  return <div ref={ref} />;
}

"use client";
import { useEffect, useRef } from "react";
import { invHTML, initInv, clearT, musStop } from "@/lib/core";

export default function InvView({ data }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    el.innerHTML = invHTML(data, { intro: true });
    initInv(el, data);
    return () => { clearT(); musStop(); el.innerHTML = ""; };
  }, [data]);
  return <div ref={ref} />;
}

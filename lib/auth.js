import crypto from "crypto";
import { cookies } from "next/headers";

const secret = () => process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "";
export const sign = () => crypto.createHmac("sha256", secret()).update("admin").digest("hex");

export function safeEq(a, b) {
  const x = crypto.createHash("sha256").update(String(a)).digest();
  const y = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(x, y);
}

export function isAdmin() {
  const v = cookies().get("adm")?.value;
  return !!v && !!secret() && safeEq(v, sign());
}

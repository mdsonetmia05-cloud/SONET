import { NextResponse } from "next/server";
// Manual payment verification endpoint. In production this must verify
// the caller's admin role server-side (see src/lib/auth.ts) before
// flipping any payment to verified and granting an entitlement.
export async function POST() {
  return NextResponse.json({ error: "Payment verification requires a signed-in admin and a configured database. Not Configured in this build." }, { status: 503 });
}

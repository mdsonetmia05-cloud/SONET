import { NextResponse } from "next/server";
import { calculateTotal } from "@/lib/pricing";
import { CATALOGUE_PRICES } from "@/lib/catalogue";
// Recalculates from the server catalogue. The client-sent total, if any,
// is ignored entirely — this is the anti-price-tampering control.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = calculateTotal(body.items ?? [], CATALOGUE_PRICES, body.couponPercent ?? 0);
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Invalid cart" }, { status: 400 });
  }
}

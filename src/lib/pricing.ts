// Server-side price recalculation. The browser total is NEVER trusted.
// Catalogue prices are the source of truth; a coupon only applies if it
// exists and is active in the database (checked by the API route).
export type CartItem = { productId: string; quantity: number };
export function calculateTotal(items: CartItem[], catalogue: Record<string, number>, couponPercent = 0) {
  let subtotal = 0;
  for (const item of items) {
    const price = catalogue[item.productId];
    if (price === undefined) throw new Error(`Unknown product: ${item.productId}`);
    if (!Number.isInteger(item.quantity) || item.quantity < 1) throw new Error("Invalid quantity");
    subtotal += price * item.quantity;
  }
  const discount = couponPercent > 0 && couponPercent <= 100 ? (subtotal * couponPercent) / 100 : 0;
  return { subtotal, discount, total: subtotal - discount };
}

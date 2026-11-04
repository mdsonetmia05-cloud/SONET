import test from "node:test";
import assert from "node:assert/strict";
// Pure-function test for the server price control. Run: npm test
function calculateTotal(items, catalogue, couponPercent = 0) {
  let subtotal = 0;
  for (const item of items) {
    const price = catalogue[item.productId];
    if (price === undefined) throw new Error(`Unknown product: ${item.productId}`);
    subtotal += price * item.quantity;
  }
  const discount = couponPercent > 0 && couponPercent <= 100 ? (subtotal * couponPercent) / 100 : 0;
  return { subtotal, discount, total: subtotal - discount };
}
test("10% coupon on $15 item totals $13.50", () => {
  assert.deepEqual(calculateTotal([{ productId: "a", quantity: 1 }], { a: 15 }, 10), { subtotal: 15, discount: 1.5, total: 13.5 });
});
test("unknown product is rejected, not priced at zero", () => {
  assert.throws(() => calculateTotal([{ productId: "nope", quantity: 1 }], { a: 15 }));
});

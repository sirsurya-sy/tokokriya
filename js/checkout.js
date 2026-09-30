function placeOrder(payload) {
  const draftItems = getCheckoutDraft() || [];
  const totals = cartTotalsFromItems(draftItems, payload.deliveryId);
  if (!totals.lines.length) {
    showToast("Keranjang kosong.", "err");
    return null;
  }
  const id = "#TK-" + new Date().toISOString().slice(0, 10).replace(/-/g, "") + Math.floor(Math.random() * 90 + 10);
  const order = {
    id,
    createdAt: new Date().toISOString(),
    dateLabel: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
    status: "Processing",
    customer: payload.customer,
    delivery: totals.delivery,
    payment: payload.payment,
    coupon: totals.coupon,
    totals: {
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      discount: totals.discount,
      total: totals.total
    },
    items: totals.lines.map((l) => ({
      id: l.product.id,
      name: l.product.name,
      image: l.product.images[0],
      price: l.product.price,
      qty: l.qty,
      color: l.color,
      size: l.size
    })),
    timeline: [
      { label: "Order placed", done: true },
      { label: "Processing", done: true },
      { label: "Shipped", done: false },
      { label: "Delivered", done: false }
    ]
  };
  const orders = getOrders();
  orders.unshift(order);
  saveOrders(orders);
  const notes = getNotifications();
  notes.unshift({
    id: uid("n"),
    type: "order",
    title: "Order Confirmed",
    body: `Pesanan ${id} berhasil dibuat.`,
    read: false,
    date: new Date().toISOString().slice(0, 10)
  });
  saveNotifications(notes);
  clearCart();
  clearCheckoutDraft();
  clearCheckoutReturn();
  return order;
}

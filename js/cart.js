function getCart() {
  return isAuthenticated() ? storageGet(userStorageKey(KEYS.cart), []) : [];
}

function saveCart(items) {
  if (!isAuthenticated()) return;
  storageSet(userStorageKey(KEYS.cart), items);
  updateCartBadge();
  window.dispatchEvent(new CustomEvent("tk:cart"));
}

function cartCount() {
  return getCart().reduce((n, i) => n + i.qty, 0);
}

function addToCart(productId, qty = 1, extras = {}) {
  if (!isAuthenticated()) {
    queueAuthAction("cart", { productId, qty, extras, redirect: `${location.pathname.split("/").pop() || "index.html"}${location.search}` });
    showToast("Please log in before adding products to your cart.", "err");
    location.href = "account.html";
    return false;
  }

  const product = getProduct(productId);
  if (!product) {
    showToast("Produk tidak ditemukan.", "err");
    return false;
  }
  if (product.stockStatus === "Out of Stock" || product.stock <= 0) {
    showToast("Produk sedang habis.", "err");
    return false;
  }
  const items = getCart();
  const key = [productId, extras.color || "", extras.size || ""].join("|");
  const found = items.find((i) => i.key === key);
  const nextQty = (found ? found.qty : 0) + qty;
  if (nextQty < 1) return false;
  if (found) found.qty = nextQty;
  else {
    items.push({
      key,
      id: product.id,
      qty,
      color: extras.color || product.colors[0] || "",
      size: extras.size || product.sizes[0] || ""
    });
  }
  saveCart(items);
  showToast("Added to cart");
  return true;
}

function updateCartQty(key, qty) {
  if (!isAuthenticated()) {
    showToast("Please log in before managing your cart.", "err");
    location.href = "account.html";
    return;
  }
  const items = getCart();
  const item = items.find((i) => i.key === key);
  if (!item) return;
  item.qty = Math.max(1, Math.min(20, qty));
  saveCart(items);
}

function removeFromCart(key) {
  if (!isAuthenticated()) {
    showToast("Please log in before managing your cart.", "err");
    location.href = "account.html";
    return;
  }
  saveCart(getCart().filter((i) => i.key !== key));
  showToast("Removed from cart");
}

function clearCart() {
  if (!isAuthenticated()) return;
  saveCart([]);
  storageSet(userStorageKey(KEYS.coupon), null);
}

function getCheckoutDraft() {
  return isAuthenticated() ? storageGet(userStorageKey(KEYS.checkout), null) : null;
}

function saveCheckoutDraft(items) {
  if (!isAuthenticated()) return null;
  const draft = (items || []).map((item) => ({ ...item }));
  storageSet(userStorageKey(KEYS.checkout), draft);
  return draft;
}

function clearCheckoutDraft() {
  if (!isAuthenticated()) return;
  storageSet(userStorageKey(KEYS.checkout), null);
}

function saveCheckoutReturn(url) {
  if (!isAuthenticated()) return;
  storageSet(userStorageKey(KEYS.checkoutReturn), url || "cart.html");
}

function getCheckoutReturn() {
  return isAuthenticated() ? storageGet(userStorageKey(KEYS.checkoutReturn), "cart.html") : "cart.html";
}

function clearCheckoutReturn() {
  if (!isAuthenticated()) return;
  storageSet(userStorageKey(KEYS.checkoutReturn), null);
}

function getCoupon() {
  return storageGet(userStorageKey(KEYS.coupon), null);
}

function applyCoupon(code) {
  const clean = (code || "").trim().toUpperCase();
  const current = getCoupon();
  if (current && current.code === clean) {
    showToast("Kupon sudah diterapkan.", "err");
    return false;
  }
  const def = STORE.coupons[clean];
  if (!def) {
    showToast("Kode kupon tidak valid.", "err");
    return false;
  }
  storageSet(userStorageKey(KEYS.coupon), { code: clean, ...def });
  showToast("Coupon applied: " + def.label);
  window.dispatchEvent(new CustomEvent("tk:cart"));
  return true;
}

function removeCoupon() {
  storageSet(userStorageKey(KEYS.coupon), null);
  window.dispatchEvent(new CustomEvent("tk:cart"));
}

function cartLines() {
  return getCart()
    .map((item) => {
      const product = getProduct(item.id);
      if (!product) return null;
      return { ...item, product, lineTotal: product.price * item.qty };
    })
    .filter(Boolean);
}

function cartTotalsFromItems(items, deliveryId) {
  const lines = items
    .map((item) => {
      const product = getProduct(item.id);
      if (!product) return null;
      return { ...item, product, lineTotal: product.price * item.qty };
    })
    .filter(Boolean);
  const subtotal = lines.reduce((n, l) => n + l.lineTotal, 0);
  const coupon = getCoupon();
  let shipping = 0;
  const delivery = DELIVERY_OPTIONS.find((d) => d.id === deliveryId) || DELIVERY_OPTIONS[0];
  shipping = delivery.price;
  if (subtotal >= STORE.freeShippingMin) shipping = 0;
  let discount = 0;
  if (coupon) {
    if (coupon.type === "percent") discount = Math.round(subtotal * (coupon.value / 100));
    if (coupon.type === "shipping") shipping = 0;
  }
  const total = Math.max(0, subtotal - discount + shipping);
  const remaining = Math.max(0, STORE.freeShippingMin - subtotal);
  return { lines, subtotal, shipping, discount, total, coupon, remaining, delivery };
}

function cartTotals(deliveryId) {
  return cartTotalsFromItems(getCart(), deliveryId);
}

function updateCartBadge() {
  qsa("[data-cart-count]").forEach((el) => {
    const n = cartCount();
    el.textContent = n;
    el.hidden = n === 0;
  });
}

function buyNow(productId, qty, extras) {
  if (!isAuthenticated()) {
    queueAuthAction("buyNow", { productId, qty, extras, redirect: "checkout.html" });
    showToast("Please log in before checking out.", "err");
    location.href = "account.html";
    return false;
  }
  const product = getProduct(productId);
  if (!product || product.stockStatus === "Out of Stock" || product.stock <= 0) {
    showToast("Produk sedang habis.", "err");
    return false;
  }
  saveCheckoutDraft([
    {
      key: [productId, extras?.color || "", extras?.size || ""].join("|"),
      id: product.id,
      qty,
      color: extras?.color || product.colors[0] || "",
      size: extras?.size || product.sizes[0] || ""
    }
  ]);
  saveCheckoutReturn(`${location.pathname.split("/").pop() || "index.html"}${location.search}`);
  location.href = "checkout.html";
  return true;
}

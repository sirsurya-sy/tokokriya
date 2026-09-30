function getWishlist() {
  return isAuthenticated() ? storageGet(userStorageKey(KEYS.wishlist), []) : [];
}

function saveWishlist(ids) {
  if (!isAuthenticated()) return;
  storageSet(userStorageKey(KEYS.wishlist), ids);
  updateWishlistUI();
  window.dispatchEvent(new CustomEvent("tk:wishlist"));
}

function isWishlisted(id) {
  return getWishlist().includes(id);
}

function toggleWishlist(id) {
  if (!isAuthenticated()) {
    queueAuthAction("wishlist", { productId: id, redirect: `${location.pathname.split("/").pop() || "index.html"}${location.search}` });
    showToast("Please log in to use the wishlist feature.", "err");
    location.href = "account.html";
    return false;
  }

  const list = getWishlist();
  const i = list.indexOf(id);
  if (i >= 0) {
    list.splice(i, 1);
    showToast("Removed from wishlist");
  } else {
    list.push(id);
    showToast("Wishlist updated");
  }
  saveWishlist(list);
  return true;
}

function updateWishlistUI() {
  const n = getWishlist().length;
  qsa("[data-wish-count]").forEach((el) => {
    el.textContent = n;
    el.hidden = n === 0;
  });
  qsa("[data-wish-toggle]").forEach((btn) => {
    const on = isWishlisted(btn.dataset.wishToggle);
    btn.classList.toggle("is-active", on);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
  });
}

function moveWishlistToCart(id) {
  if (addToCart(id, 1)) {
    saveWishlist(getWishlist().filter((x) => x !== id));
  }
}

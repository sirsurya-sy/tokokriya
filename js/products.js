function productHref(p) {
  return `product-detail.html?id=${encodeURIComponent(p.id)}`;
}

function productCardHTML(p) {
  const wish = isWishlisted(p.id);
  const isAvailable = p.stockStatus === "In Stock" && p.stock > 0;
  return `
    <article class="product-card reveal" data-id="${p.id}">
      <div class="product-media is-loading">
        ${p.badge ? `<span class="badge ${p.stockStatus !== "In Stock" ? "badge-muted" : p.newArrival && p.badge === "JUST IN" ? "badge-new" : ""}">${p.badge}</span>` : ""}
        <button class="icon-wish ${wish ? "is-active" : ""}" type="button" data-wish-toggle="${p.id}" aria-label="Wishlist ${p.name}" aria-pressed="${wish}">
          ${ICONS.heart}
        </button>
        <a href="${productHref(p)}">
          <img src="${p.images[0]}" alt="${p.name}" loading="lazy" onload="this.closest('.product-card').classList.add('is-loaded'); this.parentElement.parentElement.classList.add('is-loaded')" onerror="this.closest('.product-card').classList.add('is-loaded'); this.parentElement.parentElement.classList.add('is-loaded'); imgFallback(this)">
        </a>
        <button class="card-cart" type="button" data-add="${p.id}" aria-label="${isAvailable ? `Tambah ${p.name} ke keranjang` : `${p.name} sedang habis`}" ${isAvailable ? "" : "disabled"}>${ICONS.cart}</button>
      </div>
      <div class="product-meta">
        <p class="muted tiny">${p.category} · ${p.brand}</p>
        <h3><a href="${productHref(p)}">${p.name}</a></h3>
        <div class="rating-row">${starsHtml(p.rating)} <span class="muted tiny">${p.rating} (${p.reviewCount})</span></div>
        <div class="price-row">
          <strong>${formatRupiah(p.price)}</strong>
          ${p.oldPrice ? `<s>${formatRupiah(p.oldPrice)}</s>` : ""}
        </div>
      </div>
    </article>`;
}

function renderProductGrid(target, list) {
  const el = typeof target === "string" ? qs(target) : target;
  if (!el) return;
  if (!list.length) {
    el.innerHTML = `<div class="empty-state">
      <h3>Tidak ada produk</h3>
      <p>Coba ubah filter atau kata kunci.</p>
      <a class="btn btn-primary" href="shop.html">Lihat semua produk</a>
    </div>`;
    return;
  }
  el.innerHTML = list.map(productCardHTML).join("");
}

function sortProducts(list, sort) {
  const arr = [...list];
  switch (sort) {
    case "newest":
      return arr.sort((a, b) => Number(b.newArrival) - Number(a.newArrival) || b.reviewCount - a.reviewCount);
    case "price-asc":
      return arr.sort((a, b) => a.price - b.price);
    case "price-desc":
      return arr.sort((a, b) => b.price - a.price);
    case "rating":
      return arr.sort((a, b) => b.rating - a.rating);
    default:
      return arr.sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating);
  }
}

function filterProducts(opts = {}) {
  const {
    category,
    brand,
    minPrice,
    maxPrice,
    minRating,
    availability,
    q,
    bestSeller,
    newArrival
  } = opts;
  const query = (q || "").trim().toLowerCase();
  return PRODUCTS.filter((p) => {
    if (p.catalogVisible === false) return false;
    if (category && category !== "All" && p.category !== category) return false;
    if (brand) {
      const brands = Array.isArray(brand) ? brand : [brand];
      if (brands.filter(Boolean).length && !brands.includes(p.brand)) return false;
    }
    if (minPrice != null && p.price < minPrice) return false;
    if (maxPrice != null && p.price > maxPrice) return false;
    if (minRating && p.rating < minRating) return false;
    if (availability === "in") {
      if (p.stockStatus !== "In Stock") return false;
    }
    if (bestSeller && !p.bestSeller) return false;
    if (newArrival && !p.newArrival) return false;
    if (query) {
      const hay = `${p.name} ${p.category} ${p.brand} ${p.description}`.toLowerCase();
      if (!hay.includes(query)) return false;
    }
    return true;
  });
}

function uniqueBrands() {
  return [...new Set(PRODUCTS.filter((p) => p.catalogVisible !== false).map((p) => p.brand))].sort();
}

function relatedProducts(product, n = 4) {
  return PRODUCTS.filter((p) => p.catalogVisible !== false && p.id !== product.id && p.category === product.category).slice(0, n);
}

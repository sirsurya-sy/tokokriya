if ("scrollRestoration" in history) history.scrollRestoration = "manual";

const THEME_STORAGE_KEY = "tokokriya-theme";

let pageThrobber = null;
let pageTransitionPending = false;

function ensurePageThrobber() {
  if (pageThrobber?.isConnected) return pageThrobber;
  pageThrobber = document.createElement("div");
  pageThrobber.className = "page-throbber";
  pageThrobber.setAttribute("role", "status");
  pageThrobber.setAttribute("aria-label", "Memuat halaman");
  pageThrobber.innerHTML = '<span class="page-throbber-spinner" aria-hidden="true"></span>';
  document.body.appendChild(pageThrobber);
  return pageThrobber;
}

try {
  pageTransitionPending = sessionStorage.getItem("tk:page-transition") === "1";
  sessionStorage.removeItem("tk:page-transition");
} catch {}

if (pageTransitionPending && !document.documentElement.hasAttribute("data-page-transition")) {
  ensurePageThrobber().classList.add("is-active");
}

function currentFile() {
  const f = location.pathname.split("/").pop() || "index.html";
  return f === "" ? "index.html" : f;
}

function renderHeader() {
  const file = currentFile();
  const unread = unreadCount();
  const darkMode = document.documentElement.dataset.theme === "dark";
  const header = qs("#site-header");
  if (!header) return;
  const navLink = (href, label, extra = "") => {
    const active = file === href ? "is-active" : "";
    return `<a class="${active}" href="${href}" ${extra}>${label}</a>`;
  };
  header.innerHTML = `
    <div class="container header-inner">
      <a class="logo" href="index.html" aria-label="TokoKriya home">Toko<span>Kriya</span></a>
      <nav class="nav-center" aria-label="Primary">
        ${navLink("index.html", "Home")}
        ${navLink("shop.html", "Shop")}
        ${navLink("best-sellers.html", "Best Seller")}
        ${navLink("new-arrivals.html", "New Arrivals")}
        <div class="dropdown">
          <a href="shop.html" aria-haspopup="true">Categories</a>
          <div class="dropdown-menu" role="menu">
            ${CATEGORIES.map((c) => `<a href="shop.html?category=${encodeURIComponent(c)}" role="menuitem">${c}</a>`).join("")}
          </div>
        </div>
      </nav>
      <div class="nav-right">
        <button class="icon-btn theme-toggle" type="button" data-theme-toggle aria-label="${darkMode ? "Aktifkan mode terang" : "Aktifkan mode gelap"}" aria-pressed="${darkMode}">${darkMode ? ICONS.sun : ICONS.moon}</button>
        <a class="icon-btn" href="wishlist.html" aria-label="Wishlist">
          ${ICONS.heart}<span class="badge-count" data-wish-count hidden>0</span>
        </a>
        <a class="icon-btn" href="cart.html" aria-label="Cart">
          ${ICONS.cart}<span class="badge-count" data-cart-count hidden>0</span>
        </a>
        <a class="icon-btn" href="account.html" aria-label="Account">
          ${ICONS.user}${unread ? `<span class="badge-count">${unread}</span>` : ""}
        </a>
        <button class="icon-btn menu-toggle" type="button" data-toggle-nav aria-label="Open menu">${ICONS.menu}</button>
      </div>
    </div>
    <nav class="mobile-nav" aria-label="Mobile">
      ${navLink("index.html", "Home")}
      ${navLink("shop.html", "Shop")}
      ${navLink("best-sellers.html", "Best Seller")}
      ${navLink("new-arrivals.html", "New Arrivals")}
      ${CATEGORIES.map((c) => `<a href="shop.html?category=${encodeURIComponent(c)}">${c}</a>`).join("")}
      ${navLink("about.html", "About")}
      ${navLink("contact.html", "Contact")}
    </nav>
    `;
}

function renderFooter() {
  const footer = qs("#site-footer");
  if (!footer) return;
  footer.innerHTML = `
    <div class="container footer-grid">
      <div>
        <a class="logo" href="index.html">Toko<span>Kriya</span></a>
        <p class="muted" style="margin:0.7rem 0;max-width:32ch">Kerajinan tangan khas Sidoarjo: kulit Tanggulangin, batik Jetis, dan anyaman pandan pilihan pengrajin lokal.</p>
        <form class="newsletter" data-newsletter>
          <label class="sr-only" for="news-email">Email</label>
          <input id="news-email" type="email" placeholder="Email untuk newsletter" required>
          <button class="btn btn-primary" type="submit">Join</button>
        </form>
      </div>
      <div>
        <h3>Shop</h3>
        <ul>
          <li><a href="shop.html">All Products</a></li>
          <li><a href="best-sellers.html">Best Sellers</a></li>
          <li><a href="new-arrivals.html">New Arrivals</a></li>
          <li><a href="shop.html?category=Kulit Tanggulangin">Kulit Tanggulangin</a></li>
          <li><a href="shop.html?category=Batik Jetis">Batik Jetis</a></li>
        </ul>
      </div>
      <div>
        <h3>Customer Service</h3>
        <ul>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="faq.html">FAQ</a></li>
          <li><a href="shipping.html">Shipping Policy</a></li>
          <li><a href="returns.html">Return Policy</a></li>
          <li><a href="orders.html">Track Order</a></li>
        </ul>
      </div>
      <div>
        <h3>About</h3>
        <ul>
          <li><a href="about.html">Our Story</a></li>
          <li><a href="blog.html">Journal</a></li>
          <li><a href="privacy.html">Privacy</a></li>
          <li><a href="terms.html">Terms</a></li>
        </ul>
      </div>
    </div>
    <div class="container foot-bottom">
      <p>© ${new Date().getFullYear()} TokoKriya Sidoarjo.</p>
      <p>Visa · Mastercard · OVO · GoPay · COD</p>
    </div>`;
}

function showCartButtonFeedback(button, succeeded) {
  if (!button || !succeeded) return;
  const originalHTML = button.innerHTML;
  const originalLabel = button.getAttribute("aria-label");
  const wasDisabled = button.disabled;
  button.disabled = true;
  button.setAttribute("aria-busy", "true");
  button.setAttribute("aria-label", "Menambahkan ke keranjang");
  button.classList.add("is-cart-loading");
  button.innerHTML = '<span class="cart-feedback-spinner" aria-hidden="true"></span>';

  window.setTimeout(() => {
    button.classList.remove("is-cart-loading");
    button.classList.add("is-cart-success");
    button.setAttribute("aria-label", "Berhasil ditambahkan ke keranjang");
    button.innerHTML = '<span class="cart-feedback-check" aria-hidden="true">✓</span>';
    window.setTimeout(() => {
      button.innerHTML = originalHTML;
      button.disabled = wasDisabled;
      button.removeAttribute("aria-busy");
      if (originalLabel === null) button.removeAttribute("aria-label");
      else button.setAttribute("aria-label", originalLabel);
      button.classList.remove("is-cart-success");
    }, 850);
  }, 1000);
}

function bindGlobal() {
  document.addEventListener("click", (e) => {
    const themeToggle = e.target.closest("[data-theme-toggle]");
    if (themeToggle) {
      const darkMode = document.documentElement.dataset.theme !== "dark";
      const theme = darkMode ? "dark" : "light";
      document.documentElement.dataset.theme = theme;
      try { localStorage.setItem(THEME_STORAGE_KEY, theme); } catch {}
      themeToggle.innerHTML = darkMode ? ICONS.sun : ICONS.moon;
      themeToggle.setAttribute("aria-label", darkMode ? "Aktifkan mode terang" : "Aktifkan mode gelap");
      themeToggle.setAttribute("aria-pressed", String(darkMode));
      return;
    }

    const navBtn = e.target.closest("[data-toggle-nav]");
    if (navBtn) document.body.classList.toggle("nav-open");

    const wish = e.target.closest("[data-wish-toggle]");
    if (wish) {
      e.preventDefault();
      toggleWishlist(wish.dataset.wishToggle);
    }

    const add = e.target.closest("[data-add]");
    if (add) {
      e.preventDefault();
      showCartButtonFeedback(add, addToCart(add.dataset.add, 1));
    }

    const closeF = e.target.closest("[data-close-filters]");
    if (closeF) document.body.classList.remove("filters-open");
  });

  document.addEventListener("submit", (e) => {
    const news = e.target.closest("[data-newsletter]");
    if (news) {
      e.preventDefault();
      const email = news.querySelector("input").value.trim();
      if (!validateEmail(email)) {
        showToast("Masukkan email yang valid.", "err");
        return;
      }
      news.reset();
      showToast("Newsletter confirmed");
    }
  });

  const back = document.createElement("button");
  back.className = "back-top";
  back.type = "button";
  back.setAttribute("aria-label", "Back to top");
  back.innerHTML = `<svg class="back-top-progress" viewBox="0 0 48 48" aria-hidden="true"><circle class="back-top-track" cx="24" cy="24" r="21.5"></circle><circle class="back-top-progress-value" cx="24" cy="24" r="21.5"></circle></svg><span class="back-top-arrow">${ICONS.arrowUp}</span>`;
  back.addEventListener("click", () => {
    window.dispatchEvent(new Event("tk:stop-scroll-momentum"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.body.appendChild(back);
  let scrollProgressFrame = 0;
  const updateScrollProgress = () => {
    if (scrollProgressFrame) return;
    scrollProgressFrame = requestAnimationFrame(() => {
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const progress = maxScroll ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      const ring = back.querySelector(".back-top-progress-value");
      const circumference = 2 * Math.PI * 21.5;
      ring.style.strokeDashoffset = String(circumference * (1 - progress));
      back.setAttribute("aria-label", `Back to top, page scroll ${Math.round(progress * 100)}%`);
      back.classList.toggle("is-on", window.scrollY > 400);
      scrollProgressFrame = 0;
    });
  };
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  window.addEventListener("resize", updateScrollProgress, { passive: true });
  updateScrollProgress();

  updateCartBadge();
  updateWishlistUI();
}

function accountNav(active) {
  const items = [
    ["account.html", "Dashboard"],
    ["orders.html", "My Orders"],
    ["wishlist.html", "Wishlist"],
    ["profile.html", "Profile"],
    ["addresses.html", "Addresses"],
    ["payment-methods.html", "Payment Methods"],
    ["notifications.html", "Notifications"],
    ["settings.html", "Settings"]
  ];
  return `<aside class="account-side" aria-label="Account">
    ${items.map(([h, l]) => `<a class="${active === h ? "is-active" : ""}" href="${h}">${l}</a>`).join("")}
    <a href="index.html" data-logout>Logout</a>
  </aside>`;
}

function initHome() {
  const wrap = qs("#home-new");
  const wrapB = qs("#home-best");
  if (wrap) renderProductGrid(wrap, PRODUCTS.filter((p) => p.catalogVisible !== false && p.newArrival).slice(0, 4));
  if (wrapB) renderProductGrid(wrapB, PRODUCTS.filter((p) => p.catalogVisible !== false && p.bestSeller).slice(0, 4));
}

function initShop() {
  const grid = qs("#shop-grid");
  if (!grid) return;
  const state = {
    category: param("category") || "All",
    q: param("q") || "",
    brand: [],
    minPrice: null,
    maxPrice: null,
    minRating: 0,
    availability: "",
    sort: "recommended"
  };

  const brandOptions = qs("#brand-filter-options");
  if (brandOptions) {
    brandOptions.innerHTML = uniqueBrands()
      .map((brand) => `<label><input type="checkbox" name="brand" value="${brand}"> ${brand}</label>`)
      .join("");
  }

  function apply() {
    let list = filterProducts(state);
    list = sortProducts(list, state.sort);
    qs("#result-count").textContent = `Menampilkan ${list.length} produk`;
    renderProductGrid(grid, list);
    qsa(".cat-pill").forEach((p) => p.classList.toggle("is-active", p.dataset.cat === state.category));
  }

  qsa(".cat-pill").forEach((p) =>
    p.addEventListener("click", () => {
      state.category = p.dataset.cat;
      apply();
    })
  );
  qsa("[name=brand]").forEach((el) =>
    el.addEventListener("change", () => {
      state.brand = qsa("[name=brand]:checked").map((x) => x.value);
      apply();
    })
  );
  qsa("[name=price]").forEach((el) =>
    el.addEventListener("change", () => {
      const v = qs("[name=price]:checked")?.value || "";
      if (v === "low") {
        state.minPrice = 0;
        state.maxPrice = 300000;
      } else if (v === "mid") {
        state.minPrice = 300000;
        state.maxPrice = 700000;
      } else if (v === "high") {
        state.minPrice = 700000;
        state.maxPrice = null;
      } else {
        state.minPrice = null;
        state.maxPrice = null;
      }
      apply();
    })
  );
  qsa("[name=rating]").forEach((el) =>
    el.addEventListener("change", () => {
      state.minRating = Number(qs("[name=rating]:checked")?.value || 0);
      apply();
    })
  );
  qsa("[name=avail]").forEach((el) =>
    el.addEventListener("change", () => {
      state.availability = qs("[name=avail]:checked") ? "in" : "";
      apply();
    })
  );
  qs("#sort")?.addEventListener("change", (e) => {
    state.sort = e.target.value;
    apply();
  });
  const searchInput = qs("#shop-q");
  if (searchInput) searchInput.value = state.q;
  qs("#shop-search-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    state.q = searchInput?.value.trim() || "";
    const query = new URLSearchParams();
    if (state.category !== "All") query.set("category", state.category);
    if (state.q) query.set("q", state.q);
    history.replaceState({}, "", `shop.html${query.toString() ? `?${query}` : ""}`);
    apply();
  });
  qs("[data-open-filters]")?.addEventListener("click", () => document.body.classList.add("filters-open"));
  apply();
}

function initSearch() {
  const q = param("q") || "";
  const input = qs("#search-q");
  if (input) input.value = q;
  const grid = qs("#search-grid");
  const label = qs("#search-label");
  function run(term) {
    const list = sortProducts(filterProducts({ q: term }), qs("#sort")?.value || "recommended");
    if (label) label.textContent = term ? `Search results for “${term}” — ${list.length} found` : "Type a keyword to search";
    if (!term) {
      renderProductGrid(grid, PRODUCTS.filter((p) => p.catalogVisible !== false).slice(0, 8));
      return;
    }
    if (!list.length) {
      grid.innerHTML = `<div class="empty-state"><h3>No results</h3><p>Tidak ada produk untuk “${term}”.</p><a class="btn btn-primary" href="shop.html">Browse shop</a></div>`;
      return;
    }
    renderProductGrid(grid, list);
  }
  qs("#search-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const term = input.value.trim();
    history.replaceState({}, "", "search.html?q=" + encodeURIComponent(term));
    run(term);
  });
  qs("#sort")?.addEventListener("change", () => run(input.value.trim()));
  qs("[data-clear-search]")?.addEventListener("click", () => {
    input.value = "";
    history.replaceState({}, "", "search.html");
    run("");
  });
  run(q);
}

function initCatalogFlags() {
  const page = pageName();
  const grid = qs("#catalog-grid");
  if (!grid) return;
  const best = page === "best";
  let list = filterProducts({ bestSeller: best || undefined, newArrival: page === "new" || undefined });
  if (page === "best") list = PRODUCTS.filter((p) => p.catalogVisible !== false && (p.bestSeller || p.rating >= 4.8));
  qs("#result-count") && (qs("#result-count").textContent = `${list.length} products`);
  const sort = qs("#sort");
  const pills = qsa(".cat-pill");
  let cat = "All";
  function draw() {
    let out = list.filter((p) => cat === "All" || p.category === cat);
    out = sortProducts(out, sort?.value || "recommended");
    renderProductGrid(grid, out);
  }
  pills.forEach((p) =>
    p.addEventListener("click", () => {
      cat = p.dataset.cat;
      pills.forEach((x) => x.classList.toggle("is-active", x === p));
      draw();
    })
  );
  sort?.addEventListener("change", draw);
  draw();
}

function initPDP() {
  const id = param("id");
  const product = getProduct(id);
  const root = qs("#pdp-root");
  if (!root) return;
  if (!product) {
    root.innerHTML = `<div class="empty-state"><h3>Produk tidak ditemukan</h3><a class="btn btn-primary" href="shop.html">Kembali ke shop</a></div>`;
    return;
  }
  addRecentlyViewed(product.id);
  let color = product.colors[0] || "";
  let size = product.sizes[0] || "";
  let qty = 1;
  let img = 0;
  const inStock = product.stockStatus === "In Stock";

  function paint() {
    root.innerHTML = `
      <p class="breadcrumb"><a href="index.html">Home</a> / <a href="shop.html">Shop</a> / ${product.name}</p>
      <div class="pdp">
        <div>
          <div class="gallery-main"><img src="${product.images[img]}" alt="${product.name}" onerror="imgFallback(this)"></div>
          <div class="thumbs">
            ${product.images.map((src, i) => `<button type="button" class="${i === img ? "is-active" : ""}" data-img="${i}"><img src="${src}" alt="View ${i + 1}" onerror="imgFallback(this)"></button>`).join("")}
          </div>
          ${product.imageCredit ? `<p class="tiny muted" style="margin:.5rem 0">Foto (${product.imageCredit.changes}): <a href="${product.imageCredit.sourceUrl}" target="_blank" rel="noopener noreferrer">${product.imageCredit.source}</a> · <a href="${product.imageCredit.licenseUrl}" target="_blank" rel="noopener noreferrer">${product.imageCredit.license}</a></p>` : ""}
        </div>
        <div>
          <p class="muted">${product.brand} · ${product.category}</p>
          <h1 style="font-size:2rem;letter-spacing:-.03em">${product.name}</h1>
          <div class="rating-row">${starsHtml(product.rating)} <span class="muted">${product.rating} (${product.reviewCount} reviews)</span></div>
          <div class="pdp-price"><strong>${formatRupiah(product.price)}</strong>${product.oldPrice ? `<s>${formatRupiah(product.oldPrice)}</s>` : ""} ${product.discount ? `<span class="badge" style="position:static">-${product.discount}%</span>` : ""}</div>
          <p>${product.description}</p>
          <p class="muted" style="margin:.8rem 0">${inStock ? `In Stock · ${product.stock} left` : "Out of Stock"}</p>
          ${product.colors.length ? `<p class="tiny muted">Color</p><div class="swatches">${product.colors.map((c) => `<button class="chip ${c === color ? "is-active" : ""}" data-color="${c}" type="button">${c}</button>`).join("")}</div>` : ""}
          ${product.sizes.length ? `<p class="tiny muted">Size</p><div class="sizes">${product.sizes.map((s) => `<button class="chip ${s === size ? "is-active" : ""}" data-size="${s}" type="button">${s}</button>`).join("")}</div>` : ""}
          <div class="qty" aria-label="Quantity">
            <button type="button" data-qty="-1" aria-label="Decrease">${ICONS.minus}</button>
            <span>${qty}</span>
            <button type="button" data-qty="1" aria-label="Increase">${ICONS.plus}</button>
          </div>
          <div class="pdp-actions">
            <button class="btn btn-primary" type="button" data-pdp-add ${inStock ? "" : "disabled"}>Add to Cart</button>
            <button class="btn btn-dark" type="button" data-pdp-buy ${inStock ? "" : "disabled"}>Buy Now</button>
            <button class="btn btn-ghost" type="button" data-wish-toggle="${product.id}">Wishlist</button>
          </div>
          <div class="tabs" role="tablist">
            <button type="button" class="is-active" data-tab="d">Product Details</button>
            <button type="button" data-tab="s">Shipping & Returns</button>
            <button type="button" data-tab="r">Reviews (${product.reviewCount})</button>
          </div>
          <div class="tab-panel" data-panel="d">${Object.entries(product.details || {}).map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`).join("") || "<p>Premium materials, careful finishing.</p>"}</div>
          <div class="tab-panel" data-panel="s" hidden><p>Pengiriman JNE, J&T, dan SiCepat. Gratis ongkir dari ${formatRupiah(STORE.freeShippingMin)}. Retur 7 hari untuk barang cacat atau salah kirim.</p></div>
          <div class="tab-panel" data-panel="r" hidden>${DEFAULT_REVIEWS.map((rv) => `<p><strong>${rv.name}</strong> ${starsHtml(rv.rating)}<br>${rv.text}</p>`).join("")}</div>
        </div>
      </div>
      <h2 style="margin:1rem 0">You may also like</h2>
      <div class="products-grid" id="related-grid"></div>
      <h2 id="viewed-heading" style="margin:2rem 0 1rem">Recently viewed</h2>
      <div class="products-grid" id="viewed-grid"></div>`;
    renderProductGrid("#related-grid", relatedProducts(product));
    const viewedProducts = getRecentlyViewed().filter((p) => p.id !== product.id).slice(0, 4);
    if (viewedProducts.length) renderProductGrid("#viewed-grid", viewedProducts);
    else {
      qs("#viewed-heading")?.remove();
      qs("#viewed-grid")?.remove();
    }
    updateWishlistUI();
  }
  paint();
  root.addEventListener("click", (e) => {
    if (e.target.closest("[data-img]")) {
      img = Number(e.target.closest("[data-img]").dataset.img);
      paint();
    }
    if (e.target.closest("[data-color]")) {
      color = e.target.closest("[data-color]").dataset.color;
      paint();
    }
    if (e.target.closest("[data-size]")) {
      size = e.target.closest("[data-size]").dataset.size;
      paint();
    }
    if (e.target.closest("[data-qty]")) {
      qty = Math.max(1, qty + Number(e.target.closest("[data-qty]").dataset.qty));
      paint();
    }
    const addButton = e.target.closest("[data-pdp-add]");
    if (addButton) showCartButtonFeedback(addButton, addToCart(product.id, qty, { color, size }));
    if (e.target.closest("[data-pdp-buy]")) buyNow(product.id, qty, { color, size });
    const tab = e.target.closest("[data-tab]");
    if (tab) {
      qsa(".tabs button", root).forEach((b) => b.classList.toggle("is-active", b === tab));
      qsa("[data-panel]", root).forEach((p) => {
        p.hidden = p.dataset.panel !== tab.dataset.tab;
      });
    }
  });
}

function shippingHint(totals) {
  if (totals.remaining === 0) return "You unlocked FREE SHIPPING.";
  return `Add ${formatRupiah(totals.remaining)} more to get FREE SHIPPING.`;
}

function initCartPage() {
  const root = qs("#cart-root");
  if (!root) return;
  function draw() {
    const t = cartTotals();
    if (!t.lines.length) {
      root.innerHTML = `<div class="empty-state empty-state-cart"><div class="empty-state-icon">${ICONS.cart}</div><h3>Your cart is empty</h3><p>Mulai dari katalog pilihan kami.</p><a class="btn btn-primary" href="shop.html">Continue shopping</a></div>`;
      return;
    }
    root.innerHTML = `
      <div class="cart-layout">
        <div>
          ${t.lines
            .map(
              (l) => `<div class="cart-item">
              <a href="${productHref(l.product)}"><img src="${l.product.images[0]}" alt="${l.product.name}" onerror="imgFallback(this)"></a>
              <div>
                <h3><a href="${productHref(l.product)}">${l.product.name}</a></h3>
                <p class="muted tiny">${[l.color, l.size].filter(Boolean).join(" · ")}</p>
                <p>${formatRupiah(l.product.price)}</p>
                  <div class="qty">
                    <button type="button" data-cqty-key="${encodeURIComponent(l.key)}" data-cqty-delta="-1" aria-label="Decrease">${ICONS.minus}</button>
                  <span>${l.qty}</span>
                    <button type="button" data-cqty-key="${encodeURIComponent(l.key)}" data-cqty-delta="1" aria-label="Increase">${ICONS.plus}</button>
                </div>
              </div>
              <div>
                <strong>${formatRupiah(l.lineTotal)}</strong>
                <button class="icon-btn" data-cremove="${l.key}" aria-label="Remove">${ICONS.trash}</button>
              </div>
            </div>`
            )
            .join("")}
          <p style="margin-top:1rem"><a class="btn btn-ghost" href="shop.html">Continue shopping</a></p>
        </div>
        <aside class="summary-card">
          <h2>Order Summary</h2>
          <p class="tiny muted">${shippingHint(t)}</p>
          <div class="progress"><span style="width:${Math.min(100, (t.subtotal / STORE.freeShippingMin) * 100)}%"></span></div>
          <div class="coupon-row">
            <input id="coupon-in" placeholder="Promo code" value="${t.coupon?.code || ""}">
            <button class="btn btn-ghost" type="button" id="apply-coupon">Apply</button>
          </div>
          <div class="summary-row"><span>Subtotal</span><span>${formatRupiah(t.subtotal)}</span></div>
          <div class="summary-row"><span>Shipping</span><span>${t.shipping ? formatRupiah(t.shipping) : "Free"}</span></div>
          <div class="summary-row"><span>Discount</span><span>- ${formatRupiah(t.discount)}</span></div>
          <div class="summary-row total"><span>Total</span><span>${formatRupiah(t.total)}</span></div>
          <a class="btn btn-primary btn-full" href="checkout.html">Checkout</a>
        </aside>
      </div>`;
  }
  draw();
  root.addEventListener("click", (e) => {
    const q = e.target.closest("[data-cqty-key]");
    if (q) {
      const key = decodeURIComponent(q.dataset.cqtyKey);
      const d = Number(q.dataset.cqtyDelta);
      const item = getCart().find((i) => i.key === key);
      if (item && Number.isFinite(d)) updateCartQty(key, item.qty + d);
      draw();
    }
    if (e.target.closest("[data-cremove]")) {
      removeFromCart(e.target.closest("[data-cremove]").dataset.cremove);
      draw();
    }
    if (e.target.closest('a[href="checkout.html"]')) {
      saveCheckoutReturn("cart.html");
    }
    if (e.target.id === "apply-coupon") {
      applyCoupon(qs("#coupon-in").value);
      draw();
    }
  });
}

function initCheckout() {
  const root = qs("#checkout-root");
  if (!root) return;
  const cartItems = getCart();
  const existingDraft = getCheckoutDraft();
  if (!cartItems.length && !existingDraft?.length) {
    root.innerHTML = `<div class="empty-state"><h3>Cart is empty</h3><a class="btn btn-primary" href="shop.html">Shop now</a></div>`;
    return;
  }
  if (!existingDraft?.length) saveCheckoutDraft(cartItems.map((item) => ({ ...item })));
  const checkoutItems = getCheckoutDraft() || [];
  const profile = getProfile();
  const addr = getAddresses().find((a) => a.isDefault) || getAddresses()[0];
  let step = 1;
  let deliveryId = "jne";
  let paymentId = "bank";
  const form = {
    fullName: `${profile.firstName} ${profile.lastName}`.trim(),
    email: profile.email,
    phone: profile.phone,
    address: addr?.line || "",
    city: addr?.city || "Sidoarjo",
    postal: addr?.postal || ""
  };

  function summary() {
    const t = cartTotalsFromItems(checkoutItems, deliveryId);
    return `<aside class="summary-card">
      <h2>Order Summary</h2>
      ${t.lines.map((l) => `<div class="summary-row"><span>${l.product.name} × ${l.qty}</span><span>${formatRupiah(l.lineTotal)}</span></div>`).join("")}
      <div class="summary-row"><span>Subtotal</span><span>${formatRupiah(t.subtotal)}</span></div>
      <div class="summary-row"><span>Shipping</span><span>${t.shipping ? formatRupiah(t.shipping) : "Free"}</span></div>
      <div class="summary-row"><span>Discount</span><span>- ${formatRupiah(t.discount)}</span></div>
      <div class="summary-row total"><span>Total</span><span>${formatRupiah(t.total)}</span></div>
    </aside>`;
  }

  function draw() {
    root.innerHTML = `
      <p class="steps"><span class="${step === 1 ? "is-on" : ""}">1. Shipping</span><span class="${step === 2 ? "is-on" : ""}">2. Payment</span><span class="${step === 3 ? "is-on" : ""}">3. Review</span></p>
      <div class="checkout-layout">
        <div>
          ${
            step === 1
              ? `<div class="form-grid">
            <label class="lbl">Full name<input class="field" data-f="fullName" value="${form.fullName}" required></label>
            <label class="lbl">Email<input class="field" data-f="email" type="email" value="${form.email}" required></label>
            <label class="lbl">Phone<input class="field" data-f="phone" value="${form.phone}" required></label>
            <label class="lbl">Postal code<input class="field" data-f="postal" value="${form.postal}" required></label>
            <label class="lbl full">Address<input class="field" data-f="address" value="${form.address}" required></label>
            <label class="lbl full">City<input class="field" data-f="city" value="${form.city}" required></label>
          </div>
          <h3 style="margin:1rem 0 .5rem">Delivery</h3>
          ${DELIVERY_OPTIONS.map((d) => `<label class="radio-card ${deliveryId === d.id ? "is-on" : ""}"><span><input type="radio" name="del" value="${d.id}" ${deliveryId === d.id ? "checked" : ""}> ${d.name}<br><span class="tiny muted">${d.eta}</span></span><span>${formatRupiah(d.price)}</span></label>`).join("")}
          <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:1rem">
            <button class="btn btn-primary" type="button" data-next>Continue to Payment</button>
            <button class="btn btn-ghost" type="button" data-cancel-checkout>Cancel Order</button>
          </div>`
              : ""
          }
          ${
            step === 2
              ? `${PAYMENT_OPTIONS.map((p) => `<label class="radio-card ${paymentId === p.id ? "is-on" : ""}"><span><input type="radio" name="pay" value="${p.id}" ${paymentId === p.id ? "checked" : ""}> ${p.name}<br><span class="tiny muted">${p.hint}</span></span></label>`).join("")}
          <div style="display:flex;gap:.5rem;flex-wrap:wrap"><button class="btn btn-ghost" type="button" data-back>Back</button><button class="btn btn-primary" type="button" data-next>Review order</button></div>`
              : ""
          }
          ${
            step === 3
              ? `<div class="addr-card"><div><p><strong>${form.fullName}</strong></p><p class="muted">${form.address}, ${form.city} ${form.postal}</p><p class="muted">${form.email} · ${form.phone}</p><p>Delivery: ${DELIVERY_OPTIONS.find((d) => d.id === deliveryId).name}</p><p>Payment: ${PAYMENT_OPTIONS.find((p) => p.id === paymentId).name}</p></div></div>
          <p class="tiny muted">Simulasi frontend — tidak ada pembayaran sungguhan.</p>
          <div style="display:flex;gap:.5rem;flex-wrap:wrap"><button class="btn btn-ghost" type="button" data-back>Back</button><button class="btn btn-ghost" type="button" data-cancel-checkout>Cancel Order</button><button class="btn btn-primary" type="button" data-place>Place Order</button></div>`
              : ""
          }
        </div>
        ${summary()}
      </div>`;
  }

  function readFields() {
    qsa("[data-f]").forEach((el) => (form[el.dataset.f] = el.value.trim()));
    const del = qs("[name=del]:checked");
    if (del) deliveryId = del.value;
    const pay = qs("[name=pay]:checked");
    if (pay) paymentId = pay.value;
  }

  function validShip() {
    readFields();
    if (!form.fullName || !form.address || !form.city || !form.postal) {
      showToast("Lengkapi alamat pengiriman.", "err");
      return false;
    }
    if (!validateEmail(form.email)) {
      showToast("Email tidak valid.", "err");
      return false;
    }
    if (!validatePhone(form.phone)) {
      showToast("Nomor telepon tidak valid.", "err");
      return false;
    }
    if (!/^[0-9]{5}$/.test(form.postal)) {
      showToast("Kode pos harus 5 digit.", "err");
      return false;
    }
    return true;
  }

  draw();
  root.addEventListener("click", (e) => {
    if (e.target.closest("[data-cancel-checkout]")) {
      const returnUrl = getCheckoutReturn();
      clearCheckoutDraft();
      clearCheckoutReturn();
      location.href = returnUrl;
      return;
    }
    if (e.target.closest("[data-next]")) {
      if (step === 1 && !validShip()) return;
      readFields();
      step++;
      draw();
    }
    if (e.target.closest("[data-back]")) {
      readFields();
      step--;
      draw();
    }
    if (e.target.closest("[data-place]")) {
      const order = placeOrder({
        customer: form,
        deliveryId,
        payment: PAYMENT_OPTIONS.find((p) => p.id === paymentId)
      });
      if (order) location.href = "order-success.html?id=" + encodeURIComponent(order.id);
    }
  });
  root.addEventListener("change", (e) => {
    readFields();
    if (e.target && (e.target.name === "del" || e.target.name === "pay")) draw();
  });
}

function initSuccess() {
  const id = param("id");
  const order = getOrder(id) || getOrders()[0];
  const root = qs("#success-root");
  if (!root) return;
  if (!order) {
    root.innerHTML = `<div class="empty-state"><h3>Belum ada pesanan</h3><a class="btn btn-primary" href="shop.html">Continue shopping</a></div>`;
    return;
  }
  const etaStart = new Date();
  etaStart.setDate(etaStart.getDate() + 2);
  const etaEnd = new Date();
  etaEnd.setDate(etaEnd.getDate() + 5);
  const fmt = (d) => d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  root.innerHTML = `
    <div class="success-card">
      <div class="success-icon">${ICONS.check}</div>
      <h1>Order Confirmed!</h1>
      <p class="muted">Thank you. Your order has been placed.</p>
      <p style="margin:1rem 0"><strong>${order.id}</strong></p>
      <p>${fmt(etaStart)} – ${fmt(etaEnd)}</p>
      <p class="muted">${order.customer.address}, ${order.customer.city}</p>
      <p class="muted">${order.payment.name} · ${formatRupiah(order.totals.total)}</p>
      <div style="display:flex;gap:.6rem;justify-content:center;margin-top:1.2rem;flex-wrap:wrap">
        <a class="btn btn-primary" href="orders.html">View My Orders</a>
        <a class="btn btn-ghost" href="shop.html">Continue Shopping</a>
      </div>
    </div>`;
}

function initWishlistPage() {
  const root = qs("#wish-root");
  if (!root) return;
  const ids = getWishlist();
  const list = ids.map(getProduct).filter(Boolean);
  if (!list.length) {
    root.innerHTML = `<div class="empty-state empty-state-wishlist"><div class="empty-state-icon">${ICONS.heart}</div><h3>Wishlist is empty</h3><p>Simpan item favorit dari katalog.</p><a class="btn btn-primary" href="shop.html">Explore products</a></div>`;
    return;
  }
  root.innerHTML = `<div class="products-grid">${list.map((p) => productCardHTML(p)).join("")}</div>
    <p class="wishlist-actions">${list.map((p) => `<button class="btn btn-ghost" data-add="${p.id}" type="button">Add ${p.name} to cart</button>`).join(" ")}</p>`;
}

const TYPEWRITER_HEADINGS = [
  "Kerajinan Kulit Tanggulangin",
  "Batik Jetis, Warisan Budaya",
  "Buatan Tangan, Warisan Sidoarjo"
];
let typewriterTimer = null;

function initTypewriter() {
  const headings = qsa("[data-typewriter-heading]");
  if (!headings.length || typewriterTimer !== null) return;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) {
    headings.forEach((heading, index) => {
      heading.textContent = TYPEWRITER_HEADINGS[index] || heading.textContent;
      heading.classList.toggle("is-active", index === 0);
    });
    return;
  }

  let headingIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  const showHeading = (index) => {
    headings.forEach((heading, i) => heading.classList.toggle("is-active", i === index));
  };

  const tick = () => {
    const text = TYPEWRITER_HEADINGS[headingIndex];
    const heading = headings[headingIndex];
    heading.textContent = deleting
      ? text.slice(0, characterIndex - 1)
      : text.slice(0, characterIndex + 1);
    characterIndex += deleting ? -1 : 1;

    if (!deleting && characterIndex === text.length) {
      deleting = true;
      typewriterTimer = window.setTimeout(tick, 2300);
      return;
    }
    if (deleting && characterIndex === 0) {
      headingIndex = (headingIndex + 1) % TYPEWRITER_HEADINGS.length;
      deleting = false;
      showHeading(headingIndex);
      typewriterTimer = window.setTimeout(tick, 180);
      return;
    }
    typewriterTimer = window.setTimeout(tick, deleting ? 55 : 90);
  };

  headings.forEach((heading) => { heading.textContent = ""; });
  showHeading(0);
  typewriterTimer = window.setTimeout(tick, 90);
}

function initMotion() {
  let throbberHideTimer = 0;
  const restorePageVisibility = () => {
    const isTransitioning = pageTransitionPending || document.body.classList.contains("page-leaving");
    document.body.classList.remove("page-leaving");
    if (isTransitioning) {
      document.body.classList.remove("page-ready");
      if (document.documentElement.hasAttribute("data-page-transition")) {
        clearTimeout(throbberHideTimer);
        throbberHideTimer = window.setTimeout(() => document.documentElement.removeAttribute("data-page-transition"), 160);
      }
      const throbber = document.querySelector(".page-throbber");
      if (throbber) {
        clearTimeout(throbberHideTimer);
        throbberHideTimer = window.setTimeout(() => throbber.classList.remove("is-active"), 160);
      }
    } else {
      document.body.classList.add("page-ready");
    }
  };
  restorePageVisibility();
  window.addEventListener("pageshow", restorePageVisibility);

  const revealElements = qsa(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealElements.forEach((el) => {
      el.classList.add("is-observed");
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }

  const collage = qs(".hero-collage");
  if (collage && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const updateParallax = () => collage.style.setProperty("--parallax-y", `${scrollY * 0.18}px`);
    addEventListener("scroll", updateParallax, { passive: true });
    updateParallax();

    const heroImage = collage.querySelector(".main");
    if (heroImage && matchMedia("(hover: hover) and (pointer: fine)").matches) {
      heroImage.addEventListener("pointermove", (event) => {
        const bounds = heroImage.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;
        heroImage.style.setProperty("--tilt-x", `${(0.5 - y) * 22}deg`);
        heroImage.style.setProperty("--tilt-y", `${(x - 0.5) * 26}deg`);
        collage.classList.add("is-tilting");
      });
      heroImage.addEventListener("pointerleave", () => {
        collage.classList.remove("is-tilting");
        heroImage.style.setProperty("--tilt-x", "0deg");
        heroImage.style.setProperty("--tilt-y", "0deg");
      });
    }
  }

  let isNavigating = false;
  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || isNavigating) return;
    const link = event.target.closest("a[href]");
    if (!link || link.target || link.hasAttribute("download") || link.origin !== location.origin) return;
    const destination = new URL(link.href);
    if (destination.pathname === location.pathname && destination.search === location.search) return;
    event.preventDefault();
    isNavigating = true;
    try { sessionStorage.setItem("tk:page-transition", "1"); } catch {}
    pageThrobber = ensurePageThrobber();
    requestAnimationFrame(() => pageThrobber.classList.add("is-active"));
    document.body.classList.add("page-leaving");
    setTimeout(() => { location.href = link.href; }, 320);
  });
}

function initAuth(root) {
  let mode = "login";
  const pending = getPendingAuthAction();
  const draw = () => {
    const registration = mode === "register";
    const notice = pending
      ? `<div class="auth-note" style="margin-bottom:1rem;padding:.8rem 1rem;border:1px solid rgba(239,114,122,.35);border-radius:12px;background:rgba(239,114,122,.08);color:#1f2937"><strong>Login required.</strong> You need to log in to ${pending.type === "cart" ? "add this item to your cart" : pending.type === "buyNow" ? "continue to checkout" : "save this item to your wishlist"}.` +
        `<div style="display:flex;gap:.5rem;margin-top:.75rem;flex-wrap:wrap"><button type="button" class="btn btn-ghost" data-auth-cancel>Cancel</button></div></div>`
      : "";
    root.innerHTML = `
      <div class="auth-panel">
        <div class="auth-copy">
          <p class="eyebrow">TokoKriya account</p>
          <h1>${registration ? "Create your account" : "Welcome back"}</h1>
          <p class="muted">${registration ? "Register to manage your orders, addresses, and preferences." : "Log in to access your account and saved shopping details."}</p>
        </div>
        ${notice}
        <form class="auth-form" id="auth-form" autocomplete="off">
          ${registration ? `<div class="form-grid"><label class="lbl">First name<input class="field" name="firstName" required></label><label class="lbl">Last name<input class="field" name="lastName" required></label></div>` : ""}
          <label class="lbl">Email<input class="field" name="email" type="email" autocomplete="off" required></label>
          ${registration ? `<label class="lbl">Phone<input class="field" name="phone" autocomplete="off"></label>` : ""}
          <label class="lbl">Password<input class="field" name="password" type="password" autocomplete="new-password" minlength="6" required></label>
          <button class="btn btn-primary btn-full" type="submit">${registration ? "Create account" : "Log in"}</button>
          <p class="auth-switch muted">${registration ? "Already have an account?" : "New to TokoKriya?"} <button type="button" class="link-button" data-auth-switch>${registration ? "Log in" : "Register"}</button></p>
        </form>
      </div>`;
  };
  draw();
  root.addEventListener("click", (event) => {
    if (event.target.closest("[data-auth-cancel]")) {
      const redirect = pending?.redirect || "index.html";
      clearPendingAuthAction();
      location.href = redirect;
      return;
    }
    if (!event.target.closest("[data-auth-switch]")) return;
    mode = mode === "login" ? "register" : "login";
    draw();
  });
  root.addEventListener("submit", (event) => {
    if (event.target.id !== "auth-form") return;
    event.preventDefault();
    const form = new FormData(event.target);
    const values = Object.fromEntries(form.entries());
    const result = mode === "login" ? loginUser(values.email, values.password) : registerUser(values);
    if (!result.ok) {
      showToast(result.message, "err");
      return;
    }
    const pendingAction = getPendingAuthAction();
    if (pendingAction) {
      const resume = executePendingAuthAction();
      if (resume) {
        showToast(mode === "login" ? "Logged in successfully." : "Account created successfully.");
      }
      const target = pendingAction.redirect || "index.html";
      location.href = target;
      return;
    }
    showToast(mode === "login" ? "Logged in successfully." : "Account created successfully.");
    renderHeader();
    bindHeaderButtons();
    initAccountDash();
  });
}

function initAccountDash() {
  const root = qs("#account-root");
  if (!root) return;
  if (!isAuthenticated()) {
    initAuth(root);
    return;
  }
  const p = getProfile();
  const orders = getOrders();
  root.innerHTML = `
    <div class="account-layout">
      ${accountNav("account.html")}
      <div>
        <p class="muted">${p.email}</p>
        <h1>Welcome back, ${p.firstName}.</h1>
        <div class="stat-grid" style="margin:1rem 0">
          <div class="stat"><b>${orders.length}</b><p class="muted">Orders</p></div>
          <div class="stat"><b>${getWishlist().length}</b><p class="muted">Wishlist</p></div>
          <div class="stat"><b>${unreadCount()}</b><p class="muted">Alerts</p></div>
        </div>
        <h2>Recent orders</h2>
        ${
          orders[0]
            ? orders
                .slice(0, 3)
                .map(
                  (o) => `<div class="order-card"><div><strong>${o.id}</strong><p class="muted">${o.dateLabel} · ${formatRupiah(o.totals.total)}</p></div><span class="status status-${o.status.toLowerCase()}">${o.status}</span><a class="btn btn-ghost" href="order-detail.html?id=${encodeURIComponent(o.id)}">View</a></div>`
                )
                .join("")
            : `<div class="empty-state"><p>Belum ada pesanan.</p><a class="btn btn-primary" href="shop.html">Start shopping</a></div>`
        }
      </div>
    </div>`;
}

function initOrders() {
  const root = qs("#orders-root");
  if (!root) return;
  let tab = param("status") || "All";
  function draw() {
    const all = getOrders();
    const list = tab === "All" ? all : all.filter((o) => o.status === tab);
    root.innerHTML = `
      <div class="account-layout">
        ${accountNav("orders.html")}
        <div>
          <h1>My Orders</h1>
          <div class="pills">${["All", "Processing", "Shipped", "Delivered", "Cancelled"].map((t) => `<button class="pill ${tab === t ? "is-active" : ""}" data-tab="${t}" type="button">${t}</button>`).join("")}</div>
          ${
            list.length
              ? list
                  .map(
                    (o) => `<div class="order-card">
                    <img src="${o.items[0].image}" alt="" width="70" height="70" style="width:70px;height:70px;object-fit:cover;border-radius:10px" onerror="imgFallback(this)">
                    <div><strong>${o.id}</strong><p class="muted">${o.dateLabel} · ${o.items.length} item(s) · ${formatRupiah(o.totals.total)}</p></div>
                    <span class="status status-${o.status.toLowerCase()}">${o.status}</span>
                    <a class="btn btn-ghost" href="order-detail.html?id=${encodeURIComponent(o.id)}">View Details</a>
                  </div>`
                  )
                  .join("")
              : `<div class="empty-state"><h3>No orders</h3><a class="btn btn-primary" href="shop.html">Shop now</a></div>`
          }
        </div>
      </div>`;
  }
  draw();
  root.addEventListener("click", (e) => {
    const t = e.target.closest("[data-tab]");
    if (t) {
      tab = t.dataset.tab;
      draw();
    }
  });
}

function initOrderDetail() {
  const root = qs("#order-detail-root");
  const order = getOrder(param("id"));
  if (!root) return;
  if (!order) {
    root.innerHTML = `<div class="empty-state"><h3>Order not found</h3><a class="btn btn-primary" href="orders.html">Back to orders</a></div>`;
    return;
  }
  root.innerHTML = `
    <div class="account-layout">
      ${accountNav("orders.html")}
      <div>
        <p class="breadcrumb"><a href="orders.html">Orders</a> / ${order.id}</p>
        <h1>Order Detail</h1>
        <ul class="timeline">${order.timeline.map((t) => `<li class="${t.done ? "done" : ""}">${t.label}</li>`).join("")}</ul>
        ${order.items
          .map(
            (i) => `<div class="cart-item"><img src="${i.image}" alt="${i.name}" onerror="imgFallback(this)"><div><h3>${i.name}</h3><p>${formatRupiah(i.price)} × ${i.qty}</p></div><strong>${formatRupiah(i.price * i.qty)}</strong></div>`
          )
          .join("")}
        <p style="margin:1rem 0">${order.customer.fullName}<br>${order.customer.address}, ${order.customer.city} ${order.customer.postal}<br>${order.payment.name}</p>
        <div class="summary-row total"><span>Total</span><span>${formatRupiah(order.totals.total)}</span></div>
        <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:1rem">
          <button class="btn btn-ghost" type="button" id="track">Track Order</button>
          <button class="btn btn-ghost" type="button" id="again">Buy Again</button>
          <button class="btn btn-ghost" type="button" id="print">Print Invoice</button>
          <a class="btn btn-primary" href="orders.html">Back to Orders</a>
        </div>
      </div>
    </div>`;
  qs("#track").onclick = () => showToast("Paket " + order.id + " · status " + order.status);
  qs("#print").onclick = () => window.print();
  qs("#again").onclick = () => {
    order.items.forEach((i) => addToCart(i.id, i.qty, { color: i.color, size: i.size }));
    location.href = "cart.html";
  };
}

function initProfile() {
  const root = qs("#profile-root");
  if (!root) return;
  const p = getProfile();
  root.innerHTML = `
    <div class="account-layout">
      ${accountNav("profile.html")}
      <div>
        <h1>Profile Information</h1>
        <div class="form-grid" style="margin-top:1rem">
          <label class="lbl">First name<input class="field" id="firstName" value="${p.firstName}"></label>
          <label class="lbl">Last name<input class="field" id="lastName" value="${p.lastName}"></label>
          <label class="lbl">Email<input class="field" id="email" type="email" value="${p.email}"></label>
          <label class="lbl">Phone<input class="field" id="phone" value="${p.phone}"></label>
          <label class="lbl full">Avatar<input class="field" id="avatar" type="file" accept="image/*"></label>
        </div>
        <img id="avatar-preview" alt="" style="width:80px;height:80px;border-radius:50%;object-fit:cover;margin:1rem 0;${p.avatar ? "" : "display:none"}" ${p.avatar ? `src="${p.avatar}"` : ""}>
        <button class="btn btn-primary" type="button" id="save-profile">Save Changes</button>
      </div>
    </div>`;
  qs("#avatar").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      qs("#avatar-preview").src = reader.result;
      qs("#avatar-preview").style.display = "block";
      qs("#avatar-preview").dataset.url = reader.result;
    };
    reader.readAsDataURL(file);
  });
  qs("#save-profile").onclick = () => {
    const email = qs("#email").value.trim();
    if (!validateEmail(email)) return showToast("Email tidak valid.", "err");
    saveProfile({
      firstName: qs("#firstName").value.trim(),
      lastName: qs("#lastName").value.trim(),
      email,
      phone: qs("#phone").value.trim(),
      avatar: qs("#avatar-preview").dataset.url || p.avatar
    });
    showToast("Profile saved");
  };
}

function initAddresses() {
  const root = qs("#addr-root");
  if (!root) return;
  function draw() {
    const list = getAddresses();
    root.innerHTML = `
      <div class="account-layout">
        ${accountNav("addresses.html")}
        <div>
          <div class="section-head"><h1>My Addresses</h1><button class="btn btn-primary" type="button" id="add-addr">Add address</button></div>
          ${list
            .map(
              (a) => `<div class="addr-card">
              <div><strong>${a.label}</strong> ${a.isDefault ? '<span class="status status-delivered">Default</span>' : ""}
              <p>${a.name}<br>${a.line}, ${a.city} ${a.postal}<br>${a.phone}</p></div>
              <div>
                <button class="btn btn-ghost" data-edit="${a.id}" type="button">Edit</button>
                <button class="btn btn-ghost" data-del="${a.id}" type="button">Delete</button>
                ${a.isDefault ? "" : `<button class="btn btn-ghost" data-def="${a.id}" type="button">Set default</button>`}
              </div>
            </div>`
            )
            .join("")}
        </div>
      </div>`;
  }
  function formModal(existing) {
    openModal(`
      <h2 id="m-title">${existing ? "Edit" : "Add"} address</h2>
      <div class="form-grid" style="margin-top:1rem">
        <label class="lbl">Label<input class="field" id="m-label" value="${existing?.label || ""}"></label>
        <label class="lbl">Name<input class="field" id="m-name" value="${existing?.name || ""}"></label>
        <label class="lbl full">Address<input class="field" id="m-line" value="${existing?.line || ""}"></label>
        <label class="lbl">City<input class="field" id="m-city" value="${existing?.city || ""}"></label>
        <label class="lbl">Postal<input class="field" id="m-postal" value="${existing?.postal || ""}"></label>
        <label class="lbl full">Phone<input class="field" id="m-phone" value="${existing?.phone || ""}"></label>
      </div>
      <div style="display:flex;gap:.5rem;margin-top:1rem">
        <button class="btn btn-ghost" type="button" id="m-cancel">Cancel</button>
        <button class="btn btn-primary" type="button" id="m-save">Save</button>
      </div>`);
    qs("#m-cancel").onclick = closeModal;
    qs("#m-save").onclick = () => {
      const next = {
        id: existing?.id || uid("addr"),
        label: qs("#m-label").value.trim() || "Address",
        name: qs("#m-name").value.trim(),
        line: qs("#m-line").value.trim(),
        city: qs("#m-city").value.trim(),
        postal: qs("#m-postal").value.trim(),
        phone: qs("#m-phone").value.trim(),
        isDefault: existing?.isDefault || getAddresses().length === 0
      };
      if (!next.name || !next.line || !next.city) return showToast("Lengkapi alamat.", "err");
      let list = getAddresses();
      if (existing) list = list.map((a) => (a.id === existing.id ? next : a));
      else list.push(next);
      saveAddresses(list);
      closeModal();
      showToast("Address saved");
      draw();
    };
  }
  draw();
  root.addEventListener("click", (e) => {
    if (e.target.id === "add-addr") formModal(null);
    const ed = e.target.closest("[data-edit]");
    if (ed) formModal(getAddresses().find((a) => a.id === ed.dataset.edit));
    const del = e.target.closest("[data-del]");
    if (del) {
      saveAddresses(getAddresses().filter((a) => a.id !== del.dataset.del));
      showToast("Address removed");
      draw();
    }
    const def = e.target.closest("[data-def]");
    if (def) {
      saveAddresses(getAddresses().map((a) => ({ ...a, isDefault: a.id === def.dataset.def })));
      showToast("Default address updated");
      draw();
    }
  });
}

function initPaymentsPage() {
  const root = qs("#pay-root");
  if (!root) return;
  function draw() {
    const list = getPayments();
    root.innerHTML = `
      <div class="account-layout">
        ${accountNav("payment-methods.html")}
        <div>
          <div class="section-head"><h1>Payment Methods</h1><button class="btn btn-primary" id="add-pay" type="button">Add method</button></div>
          ${list
            .map(
              (p) => `<div class="pay-card"><div><strong>${p.type}</strong> ${p.isDefault ? '<span class="status status-delivered">Default</span>' : ""}<p class="muted">${p.brand} · •••• ${p.last4} ${p.expiry ? "· " + p.expiry : ""}</p></div>
              <div>
                <button class="btn btn-ghost" data-edit="${p.id}" type="button">Edit</button>
                <button class="btn btn-ghost" data-del="${p.id}" type="button">Remove</button>
                ${p.isDefault ? "" : `<button class="btn btn-ghost" data-def="${p.id}" type="button">Default</button>`}
              </div></div>`
            )
            .join("")}
        </div>
      </div>`;
  }
  function formModal(existing) {
    openModal(`
      <h2 id="m-title">${existing ? "Edit" : "Add"} payment</h2>
      <p class="tiny muted">Data demo saja, jangan isi kartu asli.</p>
      <div class="form-grid" style="margin-top:1rem">
        <label class="lbl">Type<input class="field" id="m-type" value="${existing?.type || "Credit Card"}"></label>
        <label class="lbl">Brand<input class="field" id="m-brand" value="${existing?.brand || "Visa"}"></label>
        <label class="lbl">Last 4<input class="field" id="m-last4" maxlength="4" value="${existing?.last4 || ""}"></label>
        <label class="lbl">Expiry<input class="field" id="m-exp" placeholder="MM/YY" value="${existing?.expiry || ""}"></label>
      </div>
      <div style="display:flex;gap:.5rem;margin-top:1rem">
        <button class="btn btn-ghost" type="button" id="m-cancel">Cancel</button>
        <button class="btn btn-primary" type="button" id="m-save">Save</button>
      </div>`);
    qs("#m-cancel").onclick = closeModal;
    qs("#m-save").onclick = () => {
      const next = {
        id: existing?.id || uid("pay"),
        type: qs("#m-type").value.trim(),
        brand: qs("#m-brand").value.trim(),
        last4: qs("#m-last4").value.trim() || "0000",
        expiry: qs("#m-exp").value.trim(),
        isDefault: existing?.isDefault || getPayments().length === 0
      };
      let list = getPayments();
      if (existing) list = list.map((x) => (x.id === existing.id ? next : x));
      else list.push(next);
      savePayments(list);
      closeModal();
      showToast("Payment method saved");
      draw();
    };
  }
  draw();
  root.addEventListener("click", (e) => {
    if (e.target.id === "add-pay") formModal(null);
    const ed = e.target.closest("[data-edit]");
    if (ed) formModal(getPayments().find((p) => p.id === ed.dataset.edit));
    const del = e.target.closest("[data-del]");
    if (del) {
      savePayments(getPayments().filter((p) => p.id !== del.dataset.del));
      draw();
    }
    const def = e.target.closest("[data-def]");
    if (def) {
      savePayments(getPayments().map((p) => ({ ...p, isDefault: p.id === def.dataset.def })));
      draw();
    }
  });
}

function initNotes() {
  const root = qs("#notes-root");
  if (!root) return;
  let filter = "all";
  function draw() {
    let list = getNotifications();
    if (filter === "unread") list = list.filter((n) => !n.read);
    if (filter === "read") list = list.filter((n) => n.read);
    root.innerHTML = `
      <div class="account-layout">
        ${accountNav("notifications.html")}
        <div>
          <div class="section-head"><h1>Notifications</h1><button class="btn btn-ghost" type="button" id="read-all">Mark all read</button></div>
          <div class="pills">
            <button class="pill ${filter === "all" ? "is-active" : ""}" data-f="all" type="button">All</button>
            <button class="pill ${filter === "unread" ? "is-active" : ""}" data-f="unread" type="button">Unread</button>
            <button class="pill ${filter === "read" ? "is-active" : ""}" data-f="read" type="button">Read</button>
          </div>
          ${
            list.length
              ? list
                  .map(
                    (n) => `<div class="note-card">
                    <div><strong>${n.title}</strong><p class="muted">${n.body}</p><p class="tiny muted">${n.date}</p></div>
                    <button class="btn btn-ghost" data-toggle="${n.id}" type="button">${n.read ? "Mark unread" : "Mark read"}</button>
                  </div>`
                  )
                  .join("")
              : `<div class="empty-state"><h3>No notifications</h3><a class="btn btn-primary" href="shop.html">Discover products</a></div>`
          }
        </div>
      </div>`;
  }
  draw();
  root.addEventListener("click", (e) => {
    if (e.target.id === "read-all") {
      saveNotifications(getNotifications().map((n) => ({ ...n, read: true })));
      draw();
      renderHeader();
      bindHeaderButtons();
    }
    const f = e.target.closest("[data-f]");
    if (f) {
      filter = f.dataset.f;
      draw();
    }
    const t = e.target.closest("[data-toggle]");
    if (t) {
      saveNotifications(getNotifications().map((n) => (n.id === t.dataset.toggle ? { ...n, read: !n.read } : n)));
      draw();
      renderHeader();
      bindHeaderButtons();
    }
  });
}

function bindHeaderButtons() {
  updateCartBadge();
  updateWishlistUI();
}

function initSettings() {
  const root = qs("#settings-root");
  if (!root) return;
  const s = getSettings();
  function toggleRow(key, label) {
    return `<div class="order-card"><span>${label}</span><button class="switch ${s[key] ? "is-on" : ""}" data-sw="${key}" type="button" role="switch" aria-checked="${!!s[key]}"><i></i></button></div>`;
  }
  root.innerHTML = `
    <div class="account-layout">
      ${accountNav("settings.html")}
      <div>
        <h1>Settings</h1>
        <h2>Preferences</h2>
        ${toggleRow("emailNotif", "Email notifications")}
        ${toggleRow("marketing", "Marketing emails")}
        ${toggleRow("orderUpdates", "Order updates")}
        ${toggleRow("privacyShare", "Share anonymized analytics")}
        <label class="lbl" style="max-width:280px;margin:1rem 0">Language
          <select class="field" id="lang">
            <option value="id" ${s.language === "id" ? "selected" : ""}>Bahasa Indonesia</option>
            <option value="en" ${s.language === "en" ? "selected" : ""}>English</option>
          </select>
        </label>
        <h2>Security</h2>
        <p class="muted">Demo store — tidak ada kata sandi server.</p>
        <button class="btn btn-ghost" type="button" id="wipe">Clear local demo data</button>
      </div>
    </div>`;
  root.addEventListener("click", (e) => {
    const sw = e.target.closest("[data-sw]");
    if (sw) {
      const key = sw.dataset.sw;
      s[key] = !s[key];
      saveSettings({ [key]: s[key] });
      sw.classList.toggle("is-on", s[key]);
      sw.setAttribute("aria-checked", String(!!s[key]));
      showToast("Preferences saved");
    }
    if (e.target.id === "wipe") {
      if (confirm("Hapus data LocalStorage TokoKriya di browser ini?")) {
        Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
        showToast("Data cleared");
        location.href = "index.html";
      }
    }
  });
  qs("#lang").onchange = (e) => {
    saveSettings({ language: e.target.value });
    showToast("Language saved");
  };
}

function initBlog() {
  const grid = qs("#blog-grid");
  if (grid) {
    grid.innerHTML = BLOG_POSTS.map(
      (b) => `<article class="blog-card">
        <a href="blog-detail.html?id=${b.id}"><img src="${b.image}" alt="${b.title}" onerror="imgFallback(this)"></a>
        <div><p class="tiny muted">${b.category} · ${b.date}</p><h3><a href="blog-detail.html?id=${b.id}">${b.title}</a></h3><p class="muted">${b.excerpt}</p><a href="blog-detail.html?id=${b.id}">Read Article</a></div>
      </article>`
    ).join("");
  }
  const article = qs("#article-root");
  if (article) {
    const post = BLOG_POSTS.find((b) => b.id === param("id")) || BLOG_POSTS[0];
    article.innerHTML = `
      <p class="breadcrumb"><a href="blog.html">Journal</a> / ${post.category}</p>
      <h1>${post.title}</h1>
      <p class="muted">${post.author} · ${post.date}</p>
      <img src="${post.image}" alt="" style="width:100%;height:360px;object-fit:cover;border-radius:18px;margin:1rem 0" onerror="imgFallback(this)">
      ${post.content.map((p) => `<p>${p}</p>`).join("")}
      <h2 style="margin-top:2rem">Related</h2>
      <p>${BLOG_POSTS.filter((b) => b.id !== post.id)
        .map((b) => `<a href="blog-detail.html?id=${b.id}">${b.title}</a>`)
        .join(" · ")}</p>
      <p style="margin-top:1rem"><a class="btn btn-ghost" href="blog.html">Back to journal</a></p>`;
  }
}

function initFAQ() {
  qsa(".faq-item button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const open = item.classList.contains("is-open");
      qsa(".faq-item").forEach((i) => i.classList.remove("is-open"));
      if (!open) item.classList.add("is-open");
      btn.setAttribute("aria-expanded", String(!open));
    });
  });
}

function initContact() {
  qs("#contact-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    if (![...fd.values()].every((v) => String(v).trim())) return showToast("Lengkapi formulir.", "err");
    if (!validateEmail(fd.get("email"))) return showToast("Email tidak valid.", "err");
    e.target.reset();
    qs("#contact-ok").hidden = false;
    showToast("Message sent");
  });
}

function initInertialWheelScroll() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches) return;

  let velocity = 0;
  let frame = 0;
  let previousTime = 0;
  const friction = 0.90;
  window.addEventListener("tk:stop-scroll-momentum", () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    velocity = 0;
    previousTime = 0;
  });

  const canScrollInside = (target, delta) => {
    for (const element of target.composedPath()) {
      if (!(element instanceof HTMLElement) || element === document.documentElement || element === document.body) continue;
      const style = getComputedStyle(element);
      if (!/(auto|scroll|overlay)/.test(style.overflowY)) continue;
      const canScrollUp = element.scrollTop > 0;
      const canScrollDown = element.scrollTop + element.clientHeight < element.scrollHeight - 1;
      if ((delta < 0 && canScrollUp) || (delta > 0 && canScrollDown)) return true;
    }
    return false;
  };

  const animate = (time) => {
    if (!previousTime) previousTime = time;
    const elapsed = Math.min(time - previousTime, 32);
    previousTime = time;
    const step = velocity * (elapsed / 16.67);
    window.scrollTo({ top: window.scrollY + step, behavior: "instant" });
    velocity *= Math.pow(friction, elapsed / 16.67);

    if (Math.abs(velocity) > 0.001) {
      frame = requestAnimationFrame(animate);
    } else {
      velocity = 0;
      frame = 0;
      previousTime = 0;
    }
  };

  window.addEventListener("wheel", (event) => {
    if (reducedMotion.matches || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    const scale = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 : event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? window.innerHeight : 1;
    const delta = event.deltaY * scale;
    if (!delta || canScrollInside(event, delta)) return;

    event.preventDefault();
    velocity += delta * 0.10;
    velocity = Math.max(-30, Math.min(30, velocity));
    if (!frame) frame = requestAnimationFrame(animate);
  }, { passive: false });
}

document.addEventListener("click", (e) => {
  if (e.target.closest("[data-logout]")) {
    e.preventDefault();
    logoutDemo();
  }
});

const PROTECTED_PAGES = new Set(["checkout", "success", "account", "orders", "order", "profile", "addresses", "payments", "notes", "settings"]);

function enforceAuthRoute() {
  const page = pageName();
  if (PROTECTED_PAGES.has(page) && page !== "account" && !isAuthenticated()) {
    location.replace("account.html");
    return false;
  }
  return true;
}

window.addEventListener("pageshow", enforceAuthRoute);

document.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  initInertialWheelScroll();
  renderHeader();
  renderFooter();
  bindGlobal();
  const page = pageName();
  if (!enforceAuthRoute()) return;
  if (page === "home") initHome();
  if (page === "shop") initShop();
  if (page === "search") initSearch();
  if (page === "best" || page === "new") initCatalogFlags();
  if (page === "pdp") initPDP();
  if (page === "cart") initCartPage();
  if (page === "checkout") initCheckout();
  if (page === "success") initSuccess();
  if (page === "wish") initWishlistPage();
  if (page === "account") initAccountDash();
  if (page === "orders") initOrders();
  if (page === "order") initOrderDetail();
  if (page === "profile") initProfile();
  if (page === "addresses") initAddresses();
  if (page === "payments") initPaymentsPage();
  if (page === "notes") initNotes();
  if (page === "settings") initSettings();
  if (page === "blog" || page === "article") initBlog();
  if (page === "faq") initFAQ();
  if (page === "contact") initContact();
  initTypewriter();
  initMotion();
});

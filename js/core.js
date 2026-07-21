function money(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
  }).format(value);
}

// Lit une valeur dans le localStorage et retourne un fallback si besoin.
function readStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

// Ecrit une valeur dans le localStorage.
function writeStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function generateRecordId(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}

function prepareProductsForBackend() {
  products.forEach((product, index) => {
    const stockUnit = product.unitMode === "weight" ? "kg" : "unit";
    const normalizedTags = Array.isArray(product.tags) ? product.tags : [];

    Object.assign(product, {
      sku: product.sku ?? `CAPRI-${String(index + 1).padStart(4, "0")}`,
      tags: normalizedTags,
      stockUnit: product.stockUnit ?? stockUnit,
      stockQuantity: product.stockQuantity ?? null,
      stockReserved: Number(product.stockReserved ?? 0),
      stockStatus: product.stockStatus ?? "available",
      featuredRank: Number(product.featuredRank ?? index + 1),
      productStatus: product.productStatus ?? "active",
      reviewEnabled: product.reviewEnabled ?? true,
      updatedAt: product.updatedAt ?? new Date().toISOString()
    });
  });
}

function productCatalogDefaults() {
  return products.reduce((collection, product) => {
    collection[product.id] = {
      id: product.id,
      sku: product.sku,
      slug: product.slug ?? product.id,
      name: product.name,
      category: product.category,
      unitMode: product.unitMode,
      unitLabel: product.unitLabel,
      priceValue: product.priceValue,
      priceLabel: product.priceLabel,
      image: product.image,
      tags: [...product.tags],
      productStatus: product.productStatus,
      reviewEnabled: product.reviewEnabled,
      featuredRank: product.featuredRank,
      updatedAt: product.updatedAt
    };
    return collection;
  }, {});
}

function getProductCatalog() {
  const stored = readStore(siteInfo.keys.productCatalog, null);
  return stored && typeof stored === "object" ? stored : productCatalogDefaults();
}

function saveProductCatalog(catalog) {
  writeStore(siteInfo.keys.productCatalog, catalog);
}

function rawClientSession() {
  return readStore(siteInfo.keys.client, null);
}

function normalizeClientRecord(client) {
  if (!client) {
    return null;
  }

  return {
    id: client.id ?? client.clientId ?? generateRecordId("client"),
    name: client.name ?? client.nom ?? "",
    email: client.email ?? "",
    phone: client.phone ?? client.telephone ?? "",
    address: client.address ?? client.adresse ?? "",
    city: client.city ?? client.ville ?? "",
    postalCode: client.postalCode ?? client.codePostal ?? "",
    role: client.role ?? "customer",
    status: client.status ?? "active",
    createdAt: client.createdAt ?? client.dateInscription ?? new Date().toISOString(),
    updatedAt: client.updatedAt ?? client.createdAt ?? client.dateInscription ?? new Date().toISOString()
  };
}

function getClients() {
  return readStore(siteInfo.keys.clients, []).map((client) => normalizeClientRecord(client)).filter(Boolean);
}

function saveClients(clients) {
  writeStore(siteInfo.keys.clients, clients);
}

function upsertClientRecord(clientInput) {
  const client = normalizeClientRecord(clientInput);
  const clients = getClients();
  const emailKey = normalizeEmail(client.email);
  const index = clients.findIndex((entry) => normalizeEmail(entry.email) === emailKey && emailKey);
  const now = new Date().toISOString();

  if (index >= 0) {
    const merged = {
      ...clients[index],
      ...client,
      id: clients[index].id,
      updatedAt: now
    };
    clients[index] = merged;
    saveClients(clients);
    return merged;
  }

  const created = {
    ...client,
    id: client.id || generateRecordId("client"),
    createdAt: client.createdAt || now,
    updatedAt: now
  };
  clients.push(created);
  saveClients(clients);
  return created;
}

function inventoryDefaults() {
  return products.reduce((collection, product) => {
    collection[product.id] = {
      productId: product.id,
      sku: product.sku,
      stockUnit: product.stockUnit,
      stockQuantity: product.stockQuantity,
      stockReserved: product.stockReserved,
      stockStatus: product.stockStatus,
      updatedAt: product.updatedAt
    };
    return collection;
  }, {});
}

function getInventoryMap() {
  const stored = readStore(siteInfo.keys.inventory, null);
  return stored && typeof stored === "object" ? stored : inventoryDefaults();
}

function saveInventoryMap(inventory) {
  writeStore(siteInfo.keys.inventory, inventory);
}

function stockStatusFromInventory(record, fallbackStatus = "available") {
  if (!record) {
    return fallbackStatus;
  }

  const rawQuantity = record.stockQuantity;
  if (rawQuantity === null || rawQuantity === undefined || rawQuantity === "") {
    return record.stockStatus || fallbackStatus;
  }

  const quantity = Number(rawQuantity);
  if (!Number.isFinite(quantity)) {
    return record.stockStatus || fallbackStatus;
  }

  if (quantity <= 0) {
    return "unavailable";
  }

  const lowThreshold = record.stockUnit === "kg" ? 1 : 5;
  return quantity <= lowThreshold ? "limited" : "available";
}

function reserveInventoryForOrder(order) {
  const inventory = getInventoryMap();
  let hasChanged = false;

  order.items.forEach((item) => {
    const record = inventory[item.id];
    if (!record) {
      return;
    }

    const rawQuantity = record.stockQuantity;
    if (rawQuantity === null || rawQuantity === undefined || rawQuantity === "") {
      return;
    }

    const currentQuantity = Number(rawQuantity);
    if (!Number.isFinite(currentQuantity)) {
      return;
    }

    const reservedAmount = item.unitMode === "weight"
      ? Number(item.weight || 0)
      : Number(item.quantity || 0);

    record.stockQuantity = Math.max(0, currentQuantity - reservedAmount);
    record.stockReserved = Number(record.stockReserved || 0) + reservedAmount;
    record.stockStatus = stockStatusFromInventory(record, record.stockStatus);
    record.updatedAt = new Date().toISOString();
    hasChanged = true;
  });

  if (hasChanged) {
    saveInventoryMap(inventory);
  }
}

function favoriteOwnerKey() {
  const client = normalizeClientRecord(rawClientSession());
  return client?.id ? `client:${client.id}` : "guest";
}

function getFavoritesIndex() {
  const existing = readStore(siteInfo.keys.favoritesIndex, null);
  if (existing && typeof existing === "object") {
    return existing;
  }

  const legacyFavorites = readStore(siteInfo.keys.favorites, []);
  const migrated = {
    guest: Array.isArray(legacyFavorites) ? [...new Set(legacyFavorites)] : []
  };

  writeStore(siteInfo.keys.favoritesIndex, migrated);
  return migrated;
}

function saveFavoritesIndex(index) {
  writeStore(siteInfo.keys.favoritesIndex, index);
}

function getScopedFavorites() {
  const index = getFavoritesIndex();
  return index[favoriteOwnerKey()] || [];
}

function saveScopedFavorites(favorites) {
  const index = getFavoritesIndex();
  index[favoriteOwnerKey()] = [...new Set(favorites)];
  saveFavoritesIndex(index);
  writeStore(siteInfo.keys.favorites, index[favoriteOwnerKey()]);
}

function backendEnabled() {
  return Boolean(siteInfo.backend?.enabled && siteInfo.backend?.baseUrl);
}

function apiBaseUrl() {
  return String(siteInfo.backend?.baseUrl || "").replace(/\/+$/, "");
}

function isUsableApiImage(url) {
  return Boolean(url) && !/example\.com/i.test(String(url));
}

function normalizeProductKey(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function backendCategoryLabel(category) {
  const labels = {
    fruits: "Fruits",
    legumes: "Légumes",
    epices: "Épices",
    epicerie: "Épicerie",
    poissonnerie: "Poissonnerie",
    boissons: "Boissons",
    traiteur: "Traiteur"
  };

  return labels[String(category || "").toLowerCase()] || category || "Produits";
}

function buildApiAvailability(apiProduct, localProduct) {
  const stockQuantity = Number(apiProduct.stock_qty ?? localProduct?.stockQuantity ?? 0);

  if (apiProduct.in_stock === false || stockQuantity <= 0) {
    return "Indisponible pour le moment.";
  }

  if (Number.isFinite(stockQuantity) && stockQuantity > 0 && stockQuantity <= 5) {
    return `Stock limité : ${stockQuantity} ${apiProduct.unit || localProduct?.unitLabel || "article(s)"} disponible(s).`;
  }

  if (Number.isFinite(stockQuantity) && stockQuantity > 0) {
    return `Disponible actuellement : ${stockQuantity} ${apiProduct.unit || localProduct?.unitLabel || "article(s)"} en stock.`;
  }

  return localProduct?.availability || "Disponible actuellement.";
}

function buildApiOrderNote(unitMode, unitLabel) {
  if (unitMode === "weight") {
    return "Produit vendu au kilo. Indiquez le poids souhaite avant l'ajout au panier.";
  }

  return "Produit vendu a l'unite. Choisissez le nombre souhaite avant l'ajout au panier.";
}

function localCatalogMatch(apiProduct) {
  const apiKeys = [
    normalizeProductKey(apiProduct.slug),
    normalizeProductKey(apiProduct.name)
  ].filter(Boolean);

  return products.find((product) => {
    const productKeys = [normalizeProductKey(product.id), normalizeProductKey(product.name)];
    return apiKeys.some((key) => productKeys.some((productKey) => (
      productKey === key
      || productKey.includes(key)
      || key.includes(productKey)
    )));
  }) || null;
}

function mapApiProductToFront(apiProduct) {
  const localProduct = localCatalogMatch(apiProduct);
  const unitMode = String(apiProduct.unit || "").toLowerCase() === "kg" ? "weight" : "count";
  const stockQuantity = apiProduct.stock_qty === null || apiProduct.stock_qty === undefined
    ? localProduct?.stockQuantity ?? null
    : Number(apiProduct.stock_qty);

  const stockStatus = apiProduct.in_stock === false || Number(stockQuantity || 0) <= 0
    ? "unavailable"
    : Number(stockQuantity || 0) <= (unitMode === "weight" ? 1 : 5)
      ? "limited"
      : "available";

  return {
    ...(localProduct || {}),
    id: localProduct?.id || apiProduct.slug || normalizeProductKey(apiProduct.name),
    name: apiProduct.name || localProduct?.name || "Produit",
    category: backendCategoryLabel(apiProduct.category || localProduct?.category),
    priceValue: Number(apiProduct.price_eur ?? localProduct?.priceValue ?? 0),
    unitMode,
    unitLabel: apiProduct.unit || localProduct?.unitLabel || "pièce",
    image: isUsableApiImage(apiProduct.image_url) ? apiProduct.image_url : (localProduct?.image || ""),
    description: apiProduct.description || localProduct?.description || "",
    storage: localProduct?.storage || "Informations de conservation a completer.",
    availability: buildApiAvailability(apiProduct, localProduct),
    orderNote: localProduct?.orderNote || buildApiOrderNote(unitMode, apiProduct.unit || localProduct?.unitLabel || "pièce"),
    tip: localProduct?.tip || "Informations complementaires a completer.",
    slug: apiProduct.slug || localProduct?.id || normalizeProductKey(apiProduct.name),
    stockQuantity,
    stockStatus,
    backendId: apiProduct.id,
    backendSlug: apiProduct.slug || "",
    source: "api"
  };
}

function refreshPreparedCatalogState() {
  prepareProductsForBackend();
  saveProductCatalog({ ...getProductCatalog(), ...productCatalogDefaults() });
  saveInventoryMap({ ...getInventoryMap(), ...inventoryDefaults() });
}

async function apiRequest(path, options = {}) {
  if (!backendEnabled()) {
    return null;
  }

  const requestHeaders = {
    Accept: "application/json",
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(options.headers || {})
  };

  const response = await fetch(`${apiBaseUrl()}${path}`, {
    method: options.method || "GET",
    headers: requestHeaders,
    body: options.body,
    mode: "cors"
  });

  if (!response.ok) {
    throw new Error(`API ${response.status} sur ${path}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function mergeCatalogWithApi(apiProducts) {
  const mappedProducts = apiProducts.map((apiProduct) => mapApiProductToFront(apiProduct));
  const apiIds = new Set(mappedProducts.map((product) => product.id));
  const fallbackProducts = products
    .filter((product) => !apiIds.has(product.id))
    .map((product) => ({ ...product, source: product.source || "local" }));

  products.splice(0, products.length, ...mappedProducts, ...fallbackProducts);
  refreshPreparedCatalogState();
}

async function hydrateCatalogFromApi() {
  if (!backendEnabled()) {
    return;
  }

  try {
    const apiProducts = await apiRequest("/products/");

    if (Array.isArray(apiProducts) && apiProducts.length) {
      mergeCatalogWithApi(apiProducts);
    }
  } catch (error) {
    console.warn("Capri Exo API produits indisponible :", error);
  }
}

function orderApiPayload(order) {
  return {
    customer_name: order.client?.name || "",
    customer_email: order.client?.email || "",
    customer_phone: order.client?.phone || "",
    customer_address: [order.client?.address || "", order.client?.postalCode || "", order.client?.city || ""].filter(Boolean).join(", "),
    frontend_order_number: order.number,
    frontend_client_id: order.clientId || "",
    delivery_mode: order.deliveryMode,
    pickup_market: order.pickupMarket,
    pickup_slot: order.timeSlot,
    payment_mode: order.paymentMode,
    payment_status: order.paymentStatus,
    items: order.items.map((item) => ({
      id: item.id,
      sku: item.sku,
      name: item.name,
      quantity: item.quantity,
      weight: item.weight,
      unit_mode: item.unitMode,
      stock_unit: item.stockUnit,
      amount: item.amount
    })),
    total_estimated: Number(order.total || 0).toFixed(2),
    notes: [
      order.note || "",
      `Source: ${order.source || "website"}`,
      `Retrait: ${order.pickupMarket || ""}`,
      `Confirmation: ${order.confirmationStatus || ""}`
    ].filter(Boolean).join("\n")
  };
}

async function syncOrderToApi(order) {
  try {
    return await apiRequest("/order-requests/", {
      method: "POST",
      body: JSON.stringify(orderApiPayload(order))
    });
  } catch (error) {
    console.warn("Capri Exo API commande indisponible :", error);
    return null;
  }
}

async function syncContactMessageToApi(message) {
  try {
    return await apiRequest("/contact-messages/", {
      method: "POST",
      body: JSON.stringify({
        name: message.name,
        email: message.email,
        phone: message.phone || "",
        market_code: message.marketId || "",
        subject: `Demande depuis ${findMarket(message.marketId).name}`,
        message: message.text,
        status: message.status || "received"
      })
    });
  } catch (error) {
    console.warn("Capri Exo API contact indisponible :", error);
    return null;
  }
}

async function syncReviewToApi(review) {
  try {
    return await apiRequest("/reviews/", {
      method: "POST",
      body: JSON.stringify({
        author_name: review.name,
        author_email: review.email,
        market_code: review.marketId || "",
        rating: review.rating,
        comment: review.text
      })
    });
  } catch (error) {
    console.warn("Capri Exo API avis indisponible :", error);
    return null;
  }
}

prepareProductsForBackend();
saveProductCatalog({ ...productCatalogDefaults(), ...getProductCatalog() });
saveInventoryMap({ ...inventoryDefaults(), ...getInventoryMap() });

// Nettoie un texte avant de l'inserer dans du HTML genere en JavaScript.
function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function findMarket(marketId) {
  return markets.find((market) => market.id === marketId) || markets[0];
}

function marketNamesSummary() {
  return markets.map((market) => market.city).join(" et ");
}

function marketPickupSummary() {
  return `Retrait possible sur nos marchés de ${marketNamesSummary()}.`;
}

function pickupMarketLabel(marketId) {
  return findMarket(marketId).name;
}

function marketWhatsAppUrl(market) {
  const cleanNumber = String(siteInfo.whatsappNumber || "").replace(/\D/g, "");
  const message = encodeURIComponent(`Bonjour ${siteInfo.brand}, je souhaite un renseignement sur votre présence au ${market.name}.`);
  return cleanNumber ? `https://wa.me/${cleanNumber}?text=${message}` : "#";
}

function marketCardMarkup(market, options = {}) {
  const showContactButton = options.showContactButton !== false;
  const marketVisual = market.image
    ? `
      <img src="${escapeHtml(market.image)}" alt="${escapeHtml(market.imageTitle || market.name)}">
    `
    : `
      <div class="photo-placeholder">
        <span class="photo-placeholder-kicker">${escapeHtml(market.city)}</span>
        <strong>${escapeHtml(market.imageTitle)}</strong>
      </div>
    `;

  return `
    <article class="market-location-card">
      <div class="photo-frame photo-frame-medium">
        ${marketVisual}
      </div>
      <div class="market-location-content">
        <h3>${escapeHtml(market.name)}</h3>
        <p class="market-location-summary">${escapeHtml(market.summary)}</p>
        <ul class="market-location-meta">
          <li><strong>Ville :</strong> ${escapeHtml(market.city)}</li>
          <li><strong>Emplacement :</strong> ${escapeHtml(market.stand)}</li>
          <li><strong>Horaires :</strong> ${escapeHtml(market.schedule)}</li>
        </ul>
        <p class="market-location-note">${escapeHtml(market.note)}</p>
        ${showContactButton ? `<a class="button button-secondary" href="${marketWhatsAppUrl(market)}" target="_blank" rel="noopener noreferrer">Contacter pour ${escapeHtml(market.city)}</a>` : ""}
      </div>
    </article>
  `;
}

function renderMarketGrid(targetId) {
  const target = document.getElementById(targetId);
  if (!target) {
    return;
  }

  const showContactButton = !["marketLocationsGrid", "aboutMarketsGrid"].includes(targetId);
  target.innerHTML = markets.map((market) => marketCardMarkup(market, { showContactButton })).join("");
}

function renderFooterMarkets() {
  document.querySelectorAll(".footer-brand").forEach((block) => {
    let footerMarkets = block.querySelector(".footer-markets");
    if (!footerMarkets) {
      footerMarkets = document.createElement("p");
      footerMarkets.className = "footer-markets";
      block.appendChild(footerMarkets);
    }

    footerMarkets.textContent = `Présent sur les marchés de ${marketNamesSummary()}.`;
  });
}

function setupBackToTopButton() {
  const button = document.getElementById("backToTopProducts");

  if (!button) {
    return;
  }

  const syncVisibility = () => {
    button.classList.toggle("is-visible", window.scrollY > 380);
  };

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  window.addEventListener("scroll", syncVisibility, { passive: true });
  syncVisibility();
}

function closeResponsiveNav() {
  const nav = document.querySelector(".site-nav");
  const toggle = document.querySelector(".nav-toggle");

  if (!nav || !toggle) {
    return;
  }

  nav.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Ouvrir le menu");
  document.body.classList.remove("nav-open");
}

function setupResponsiveNav() {
  const nav = document.querySelector(".site-nav");
  const navLinks = nav ? nav.querySelector(".nav-links") : null;

  if (!nav || !navLinks) {
    return;
  }

  nav.classList.add("has-toggle");

  if (!navLinks.id) {
    navLinks.id = "site-nav-links";
  }

  let toggle = nav.querySelector(".nav-toggle");

  if (!toggle) {
    toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "nav-toggle";
    toggle.setAttribute("aria-label", "Ouvrir le menu");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", navLinks.id);
    toggle.innerHTML = `
      <span class="nav-toggle-bars" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </span>
    `;

    nav.appendChild(toggle);
  }

  const syncNavState = () => {
    const mobileMode = window.innerWidth <= 920;

    if (!mobileMode) {
      closeResponsiveNav();
      toggle.setAttribute("aria-hidden", "true");
      return;
    }

    toggle.setAttribute("aria-hidden", "false");
  };

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    document.body.classList.toggle("nav-open", open);
  });

  document.addEventListener("click", (event) => {
    if (window.innerWidth > 920) {
      return;
    }

    if (!nav.contains(event.target)) {
      closeResponsiveNav();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeResponsiveNav();
    }
  });

  window.addEventListener("resize", syncNavState);
  syncNavState();
}

function syncCurrentNavigation() {
  const currentFile = window.location.pathname.split("/").pop() || "index.html";
  const currentPage = currentFile === "produit.html" ? "produits.html" : currentFile;

  document.querySelectorAll('.site-nav .nav-links a[aria-current="page"], .footer-links a[aria-current="page"], .nav-login-link[aria-current="page"]').forEach((link) => {
    link.removeAttribute("aria-current");
  });

  document.querySelectorAll(`.site-nav .nav-links a[href="${currentPage}"], .footer-links a[href="${currentPage}"]`).forEach((link) => {
    link.setAttribute("aria-current", "page");
  });

  const loginLink = document.querySelector('.nav-login-link[href="connexion.html"]');
  if (currentPage === "connexion.html" && loginLink) {
    loginLink.setAttribute("aria-current", "page");
  }
}

function setupRevealAnimations() {
  const selectors = [
    ".page-banner",
    ".content-card",
    ".feature-card",
    ".photo-frame",
    ".market-location-card",
    ".review-card",
    ".summary-card",
    ".product-card",
    ".cart-item",
    ".product-detail"
  ];

  const nodes = Array.from(document.querySelectorAll(selectors.join(",")))
    .filter((node) => !node.dataset.revealBound)
    .filter((node) => {
      if (node.classList.contains("photo-frame") && node.closest(".market-location-card, .hero-photo-panel")) {
        return false;
      }

      return true;
    });

  if (!nodes.length) {
    return;
  }

  nodes.forEach((node, index) => {
    node.classList.add("reveal-on-scroll");
    node.dataset.revealBound = "true";

    if (
      node.matches(".content-card, .feature-card, .photo-frame, .market-location-card, .review-card, .product-card, .cart-item")
    ) {
      node.classList.add("reveal-card");
    }

    node.style.setProperty("--reveal-delay", `${Math.min(index * 45, 280)}ms`);
  });

  if (!("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -6% 0px"
    });
  }

  requestAnimationFrame(() => {
    nodes.forEach((node) => {
      node.classList.add("reveal-ready");

      if (node.getBoundingClientRect().top < window.innerHeight * 0.92) {
        node.classList.add("is-visible");
        return;
      }

      revealObserver.observe(node);
    });
  });
}

function getFavorites() {
  return getScopedFavorites();
}

// Relit le panier et normalise d'anciennes structures si elles existent encore.
function getCart() {
  return readStore(siteInfo.keys.cart, []).map((line) => ({
    id: line.id,
    quantity: Number(line.quantity ?? line.quantite ?? 1),
    weight: Number(line.weight ?? line.kilos ?? 0)
  }));
}

// Relit les informations du client, meme si elles viennent d'une ancienne version.
function getClient() {
  return normalizeClientRecord(rawClientSession());
}

function getReviews() {
  return readStore(siteInfo.keys.reviews, []).map((review) => ({
    id: review.id ?? generateRecordId("review"),
    name: review.name ?? review.nom ?? "Client",
    email: review.email ?? "",
    marketId: review.marketId ?? review.market ?? "cergy",
    rating: Number(review.rating ?? review.note ?? 5),
    text: review.text ?? review.texte ?? "",
    status: review.status ?? "published",
    verifiedOrder: Boolean(review.verifiedOrder ?? false),
    createdAt: review.createdAt ?? review.date ?? "",
    updatedAt: review.updatedAt ?? review.createdAt ?? review.date ?? ""
  }));
}

function getMessages() {
  return readStore(siteInfo.keys.messages, []).map((message) => ({
    id: message.id ?? generateRecordId("message"),
    name: message.name ?? message.nom ?? "",
    email: message.email ?? "",
    marketId: message.marketId ?? message.market ?? "cergy",
    text: message.text ?? message.texte ?? "",
    status: message.status ?? "received",
    createdAt: message.createdAt ?? message.date ?? "",
    updatedAt: message.updatedAt ?? message.createdAt ?? message.date ?? ""
  }));
}

function getOrders() {
  return readStore(siteInfo.keys.orders, []).map((order) => ({
    id: order.id ?? generateRecordId("order"),
    number: order.number ?? "",
    clientId: order.clientId ?? order.client?.id ?? null,
    client: order.client ?? null,
    items: Array.isArray(order.items) ? order.items.map((item) => ({
      id: item.id ?? "",
      sku: item.sku ?? "",
      name: item.name ?? item.id ?? "",
      quantity: Number(item.quantity ?? 1),
      weight: Number(item.weight ?? 0),
      unitMode: item.unitMode ?? "count",
      amount: Number(item.amount ?? 0),
      stockUnit: item.stockUnit ?? "unit"
    })) : [],
    total: Number(order.total ?? 0),
    totalItems: Number(order.totalItems ?? 0),
    deliveryMode: order.deliveryMode ?? "pickup",
    pickupMarket: order.pickupMarket ?? "cergy",
    timeSlot: order.timeSlot ?? "",
    paymentMode: order.paymentMode ?? "shop",
    paymentStatus: order.paymentStatus ?? "pending",
    fulfillmentStatus: order.fulfillmentStatus ?? "new",
    confirmationStatus: order.confirmationStatus ?? "manual-only",
    confirmationEmail: order.confirmationEmail ?? order.client?.email ?? "",
    source: order.source ?? "website",
    note: order.note ?? "",
    createdAt: order.createdAt ?? "",
    updatedAt: order.updatedAt ?? order.createdAt ?? ""
  }));
}

function defaultOrderDraft() {
  return {
    deliveryMode: "pickup",
    pickupMarket: "cergy",
    timeSlot: "",
    paymentMode: "shop",
    note: ""
  };
}

function getOrderDraft() {
  const draft = readStore(siteInfo.keys.orderDraft, defaultOrderDraft());
  return {
    deliveryMode: draft.deliveryMode ?? "pickup",
    pickupMarket: draft.pickupMarket ?? "cergy",
    timeSlot: draft.timeSlot ?? "",
    paymentMode: draft.paymentMode ?? "shop",
    note: draft.note ?? ""
  };
}

function saveOrderDraft(patch) {
  writeStore(siteInfo.keys.orderDraft, { ...getOrderDraft(), ...patch });
}

function resetOrderDraft() {
  writeStore(siteInfo.keys.orderDraft, defaultOrderDraft());
}

// Retrouve rapidement un produit a partir de son identifiant.
function findProduct(productId) {
  return products.find((product) => product.id === productId) || null;
}

function isWeightProduct(product) {
  return product.unitMode === "weight";
}

function unitDisplay(product) {
  return isWeightProduct(product) ? `/${product.unitLabel}` : `par ${product.unitLabel}`;
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(value));
}

function productAvailabilityMeta(product) {
  const status = productStockStatus(product);

  if (status === "unavailable") {
    return {
      label: "Indisponible",
      className: "is-unavailable",
      canOrder: false
    };
  }

  if (status === "limited") {
    return {
      label: "Arrivage limité",
      className: "is-limited",
      canOrder: true
    };
  }

  return {
    label: "Disponible",
    className: "is-available",
    canOrder: true
  };
}

function productStockStatus(product) {
  const inventory = getInventoryMap();
  return stockStatusFromInventory(inventory[product.id], product.stockStatus || "available");
}

function productCatalogOrder(product) {
  return products.findIndex((item) => item.id === product.id);
}

function availabilityBadgeMarkup(product) {
  const meta = productAvailabilityMeta(product);
  return `<span class="availability-badge ${meta.className}">${meta.label}</span>`;
}

function productTagClass(tag) {
  return `tag-${tag.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")}`;
}

function productTagMarkup(tag) {
  return `<span class="product-tag ${productTagClass(tag)}">${escapeHtml(tag)}</span>`;
}

function allProductTags() {
  return [...new Set(products.flatMap((product) => product.tags || []))];
}

function cartItemCount(cart) {
  return cart.reduce((sum, line) => {
    const product = findProduct(line.id);
    return sum + (product && isWeightProduct(product) ? 1 : Number(line.quantity || 1));
  }, 0);
}

function cartTotal(cart) {
  return cart.reduce((sum, line) => {
    const product = findProduct(line.id);
    return product ? sum + calculateAmount(product, line.quantity, line.weight) : sum;
  }, 0);
}

function productAbbr(product) {
  return product.name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

// Construit la zone visuelle du produit.
// Si une image existe, elle est affichee dans la carte ou la fiche detaillee.
function mediaMarkup(product, detail = false) {
  const className = detail ? "detail-media" : "product-media";
  const contentClass = detail ? "detail-media-content" : "product-media-content";
  const titleClass = detail ? "detail-media-title" : "product-media-title";
  const hasImageClass = product.image ? " has-image" : "";
  const imageMarkup = product.image
    ? `<img class="product-media-image${detail ? " detail-media-image" : ""}" src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}">`
    : "";

  return `
    <div class="${className}${hasImageClass}" data-abbr="${escapeHtml(productAbbr(product))}">
      ${imageMarkup}
      <div class="${contentClass}">
        <span class="media-category">${escapeHtml(product.category)}</span>
      </div>
    </div>
  `;
}

function cartQuantityDefault(product) {
  return isWeightProduct(product) ? 0.5 : 1;
}

// Calcule le montant estime d'un produit selon son mode de vente.
function calculateAmount(product, quantity, weight) {
  const base = isWeightProduct(product)
    ? Math.max(0.1, Number(weight || 0))
    : Math.max(1, Number(quantity || 1));

  return product.priceValue * base;
}

function formatPreview(product, quantity, weight) {
  if (isWeightProduct(product)) {
    const safeWeight = Math.max(0.1, Number(weight || 0.5));
    const grams = Math.round(safeWeight * 1000);
    return `${grams} g : ${money(calculateAmount(product, quantity, safeWeight))}`;
  }

  const safeQuantity = Math.max(1, Number(quantity || 1));
  return `${safeQuantity} article(s) : ${money(calculateAmount(product, safeQuantity, 0))}`;
}

function favoriteActive(productId) {
  return getFavorites().includes(productId);
}

// Ajoute ou retire un produit des favoris puis relance l'affichage utile.
function toggleFavorite(productId) {
  const favorites = getFavorites();
  const nextFavorites = favorites.includes(productId)
    ? favorites.filter((id) => id !== productId)
    : [...favorites, productId];

  saveScopedFavorites(nextFavorites);
  renderCurrentPage();
}

function updateCartBadge() {
  const totalItems = cartItemCount(getCart());
  document.querySelectorAll(".badge-panier").forEach((badge) => {
    badge.textContent = totalItems;
  });
}

// Ajoute un produit au panier depuis une carte ou depuis une fiche detaillee.
function addToCart(productId, sourceElement = document) {
  const product = findProduct(productId);

  if (!product) {
    return;
  }

  if (!productAvailabilityMeta(product).canOrder) {
    showToast(`${product.name} est actuellement indisponible.`);
    return;
  }

  const scope = sourceElement.closest(".product-card, .product-detail") || document;
  const quantityInput = scope.querySelector("[data-product-quantity]");
  const weightInput = scope.querySelector("[data-product-weight]");
  const cart = getCart();
  const existingLine = cart.find((line) => line.id === productId);
  const quantity = isWeightProduct(product) ? 1 : Math.max(1, Number(quantityInput ? quantityInput.value : 1));
  const weight = isWeightProduct(product) ? Math.max(0.1, Number(weightInput ? weightInput.value : 0.5)) : 0;

  if (existingLine) {
    if (isWeightProduct(product)) {
      existingLine.weight += weight;
      existingLine.quantity = 1;
    } else {
      existingLine.quantity += quantity;
    }
  } else {
    cart.push({ id: productId, quantity, weight });
  }

  writeStore(siteInfo.keys.cart, cart);
  updateCartBadge();
  renderCartPage();
  showToast(`${product.name} a été ajouté au panier.`);
}

function updateCartLine(productId, field, value) {
  const cart = getCart();
  const line = cart.find((entry) => entry.id === productId);

  if (!line) {
    return;
  }

  if (field === "quantity") {
    line.quantity = Math.max(1, Number(value || 1));
  }

  if (field === "weight") {
    line.weight = Math.max(0.1, Number(value || 0.5));
  }

  writeStore(siteInfo.keys.cart, cart);
  updateCartBadge();
  renderCartPage();
}

function removeFromCart(productId) {
  const nextCart = getCart().filter((entry) => entry.id !== productId);
  writeStore(siteInfo.keys.cart, nextCart);
  updateCartBadge();
  renderCartPage();
}

function clearCartWithMessage(message) {
  writeStore(siteInfo.keys.cart, []);
  updateCartBadge();
  renderCartPage();
  setMessage("messageCommande", message);
}

function setMessage(elementId, message) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = message;
  }
}

function ensureToast() {
  let toast = document.getElementById("siteToast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "siteToast";
    toast.className = "site-toast";
    document.body.appendChild(toast);
  }

  return toast;
}

function showToast(message) {
  const toast = ensureToast();
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1800);
}

function deliveryModeLabel(value) {
  if (value === "delivery") {
    return "Livraison";
  }

  return "Retrait sur le marché";
}

function paymentModeLabel(value) {
  if (value === "online") {
    return "Paiement en ligne";
  }

  if (value === "delivery") {
    return "Paiement à la livraison";
  }

  return "Paiement au stand";
}

function orderItemsSummary(cart) {
  return cart
    .map((line) => {
      const product = findProduct(line.id);

      if (!product) {
        return "";
      }

      return isWeightProduct(product)
        ? `- ${product.name} : ${Math.round(Number(line.weight || 0.5) * 1000)} g (${money(calculateAmount(product, line.quantity, line.weight))})`
        : `- ${product.name} : ${Math.max(1, Number(line.quantity || 1))} article(s) (${money(calculateAmount(product, line.quantity, line.weight))})`;
    })
    .filter(Boolean)
    .join("\n");
}

function detailItemMarkup(label, value) {
  if (value === undefined || value === null || String(value).trim() === "") {
    return "";
  }

  return `
    <article>
      <strong>${escapeHtml(label)}</strong>
      <span>${escapeHtml(value)}</span>
    </article>
  `;
}

function buildWhatsAppMessage(cart, client = null, draft = getOrderDraft()) {
  const lines = [
    `Bonjour ${siteInfo.brand},`,
    "",
    "Je souhaite passer une commande :",
    orderItemsSummary(cart),
    "",
    `Total estimé : ${money(cartTotal(cart))}`,
    `Mode de réception : ${deliveryModeLabel(draft.deliveryMode)}`,
    `Marché de retrait : ${pickupMarketLabel(draft.pickupMarket)}`,
    `Mode de paiement : ${paymentModeLabel(draft.paymentMode)}`
  ];

  if (draft.timeSlot) {
    lines.push(`Créneau souhaité : ${draft.timeSlot}`);
  }

  if (draft.note) {
    lines.push(`Note : ${draft.note}`);
  }

  if (client && client.name) {
    lines.push("", `Client : ${client.name}`);
  }

  return lines.join("\n");
}

function buildWhatsAppUrl(cart, client = null, draft = getOrderDraft()) {
  const cleanNumber = String(siteInfo.whatsappNumber || "").replace(/\D/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(buildWhatsAppMessage(cart, client, draft))}`;
}

function refreshCartWhatsAppLink() {
  const link = document.querySelector("[data-cart-whatsapp]");

  if (!link) {
    return;
  }

  link.href = buildWhatsAppUrl(getCart(), getClient(), getOrderDraft());
}

function createOrder(client) {
  const cart = getCart();
  const draft = getOrderDraft();
  const orders = getOrders();
  const orderNumber = `CE-${String(orders.length + 1).padStart(4, "0")}`;
  const now = new Date().toISOString();

  const order = {
    id: generateRecordId("order"),
    number: orderNumber,
    clientId: client?.id ?? null,
    client,
    items: cart.map((line) => {
      const product = findProduct(line.id);
      return {
        id: line.id,
        sku: product ? product.sku : "",
        name: product ? product.name : line.id,
        quantity: Number(line.quantity || 1),
        weight: Number(line.weight || 0),
        unitMode: product ? product.unitMode : "count",
        amount: product ? calculateAmount(product, line.quantity, line.weight) : 0,
        stockUnit: product ? product.stockUnit : "unit"
      };
    }),
    total: cartTotal(cart),
    totalItems: cartItemCount(cart),
    deliveryMode: draft.deliveryMode,
    pickupMarket: draft.pickupMarket,
    timeSlot: draft.timeSlot,
    paymentMode: draft.paymentMode,
    paymentStatus: "pending",
    fulfillmentStatus: "confirmed",
    confirmationStatus: client?.email ? "ready-to-send" : "manual-only",
    confirmationEmail: client?.email || "",
    source: "website",
    note: draft.note,
    createdAt: now,
    updatedAt: now
  };

  writeStore(siteInfo.keys.orders, [...orders, order]);
  reserveInventoryForOrder(order);
  resetOrderDraft();
  return order;
}


function renderCatalogPage() {
  renderCategoryFilters();
  renderTagFilters();

  const productList = document.getElementById("listeProduits");
  const count = document.getElementById("messageRecherche");
  const favoriteButtons = document.querySelectorAll("[data-filter]");
  const sortSelect = document.getElementById("sortProducts");
  const availabilitySelect = document.getElementById("availabilityFilter");
  const unitModeSelect = document.getElementById("unitModeFilter");
  const tagButtons = document.querySelectorAll("[data-tag-filter]");

  if (!productList) {
    return;
  }

  const list = sortProductsList(filteredProducts());
  productList.innerHTML = list.length
    ? list.map(productCardMarkup).join("")
    : `
      <div class="empty-state catalog-empty">
        <h2>Aucun produit trouvé</h2>
        <p>Essayez une autre recherche, un autre filtre ou revenez à tout le catalogue.</p>
      </div>
    `;

  if (count) {
    count.textContent = `${list.length} produit(s) affiché(s)`;
  }

  if (sortSelect) {
    sortSelect.value = currentSortOption;
  }

  if (availabilitySelect) {
    availabilitySelect.value = currentAvailabilityFilter;
  }

  if (unitModeSelect) {
    unitModeSelect.value = currentUnitModeFilter;
  }

  favoriteButtons.forEach((button) => {
    const active = button.dataset.filter === "favorites" ? currentFavoritesOnly : !currentFavoritesOnly;
    button.classList.toggle("is-active", active);
  });

  tagButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tagFilter === currentTagFilter);
  });
}

function renderHomeSelection() {
  const target = document.getElementById("homeSelection");
  if (!target) {
    return;
  }

  target.innerHTML = products.slice(0, 3).map(productCardMarkup).join("");
}

function renderLatestHighlights() {
  const target = document.getElementById("latestHighlights");
  if (!target) {
    return;
  }

  const latestProducts = [...products]
    .sort((a, b) => productCatalogOrder(b) - productCatalogOrder(a))
    .slice(0, 3);

  target.innerHTML = latestProducts.map(productCardMarkup).join("");
}

function relatedProductsFor(product) {
  return products
    .filter((item) => item.id !== product.id)
    .sort((a, b) => {
      const score = (candidate) => {
        let total = 0;
        if (candidate.category === product.category) {
          total += 4;
        }
        if (candidate.unitMode === product.unitMode) {
          total += 2;
        }
        if (productStockStatus(candidate) === productStockStatus(product)) {
          total += 1;
        }
        total -= Math.abs(candidate.priceValue - product.priceValue) / 10;
        return total;
      };

      return score(b) - score(a);
    })
    .slice(0, 4);
}

// Construit la fiche detaillee d'un produit a partir de l'id present dans l'URL.
function renderProductDetail() {
  const target = document.getElementById("ficheProduit");
  const relatedTarget = document.getElementById("relatedProducts");

  if (!target) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const product = findProduct(params.get("id"));

  if (!product) {
    target.innerHTML = `
      <div class="empty-state">
        <h1>Produit introuvable</h1>
        <p>La fiche demandée n'existe pas ou n'est plus disponible.</p>
        <a class="button button-primary" href="produits.html">Retour aux produits</a>
      </div>
    `;

    if (relatedTarget) {
      relatedTarget.innerHTML = "";
    }
    return;
  }

  document.title = `Capri Exo - ${product.name}`;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", `${product.name} chez Capri Exo : description, disponibilité, conservation, format recommandé et commande.`);
  }
  const availability = productAvailabilityMeta(product);
  const visibleTags = (product.tags || []).slice(0, 4);
  target.innerHTML = `
    <article class="product-detail">
      ${mediaMarkup(product, true)}

      <div class="product-info">
        <div class="product-copy-head">
          <p class="eyebrow">${escapeHtml(product.category)}</p>
          <h1>${escapeHtml(product.name)}</h1>
          <p class="product-subtitle">${money(product.priceValue)} ${escapeHtml(unitDisplay(product))}</p>
        </div>

        <div class="detail-meta-stack">
          <div class="product-tag-row detail-tag-row">
            ${visibleTags.map(productTagMarkup).join("")}
          </div>
          <div class="detail-status-row">
            ${availabilityBadgeMarkup(product)}
            <span class="detail-availability-text">${escapeHtml(product.availability)}</span>
          </div>
        </div>

        <p class="product-description product-description-lead">${escapeHtml(product.description)}</p>

        <div class="detail-grid">
          ${detailItemMarkup("Conservation", product.storage)}
          ${detailItemMarkup("Disponibilité", product.availability)}
          ${detailItemMarkup("Commande", product.orderNote)}
          ${detailItemMarkup("Conseil", product.tip)}
          ${detailItemMarkup("Origine", product.origin)}
          ${detailItemMarkup("Niveau de piquant", product.spiceLevel)}
          ${detailItemMarkup("Produit conseillé avec", product.pairing)}
          ${detailItemMarkup("Format recommandé", product.recommendedFormat)}
          ${detailItemMarkup("Saison", product.seasonLabel)}
          ${detailItemMarkup("Retrait possible", marketPickupSummary())}
        </div>

        <div class="detail-purchase-panel">
          <p class="detail-purchase-title">Préparer ma commande</p>
          ${productControlMarkup(product)}

          <div class="detail-actions">
            <button class="button button-primary" type="button" data-add-cart="${product.id}" ${availability.canOrder ? "" : "disabled"}>
              ${availability.canOrder ? "Ajouter au panier" : "Indisponible"}
            </button>
            <button class="button button-secondary" type="button" data-favorite="${product.id}">
              ${favoriteActive(product.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
            </button>
            <a class="button button-whatsapp" href="#" target="_blank" rel="noopener noreferrer" data-product-whatsapp="${product.id}">
              Commander sur WhatsApp
            </a>
          </div>
        </div>
      </div>
    </article>
  `;

  if (relatedTarget) {
    const related = relatedProductsFor(product);

    relatedTarget.innerHTML = related.map(productCardMarkup).join("");
  }

  refreshProductWhatsAppLink(product.id);
}


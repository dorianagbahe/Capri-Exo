function selectedCategoryList() {
  return [...new Set(products.map((product) => product.category))].sort((a, b) => a.localeCompare(b));
}

// Affiche les boutons de categories visibles sur la page catalogue.
function renderCategoryFilters() {
  const container = document.getElementById("categoryFilters");
  if (!container) {
    return;
  }

  const categoryButtons = [
    `<button class="filter-button ${currentCategoryFilter === "all" ? "is-active" : ""}" type="button" data-category-filter="all">Toutes les catégories</button>`,
    ...selectedCategoryList().map((category) => `
      <button class="filter-button ${currentCategoryFilter === category ? "is-active" : ""}" type="button" data-category-filter="${escapeHtml(category)}">
        ${escapeHtml(category)}
      </button>
    `)
  ];

  container.innerHTML = categoryButtons.join("");
}

function renderTagFilters() {
  const container = document.getElementById("tagFilters");
  if (!container) {
    return;
  }

  const tagButtons = [
    `<button class="filter-button ${currentTagFilter === "all" ? "is-active" : ""}" type="button" data-tag-filter="all">Tous les badges</button>`,
    ...allProductTags().map((tag) => `
      <button class="filter-button ${currentTagFilter === tag ? "is-active" : ""}" type="button" data-tag-filter="${escapeHtml(tag)}">
        ${escapeHtml(tag)}
      </button>
    `)
  ];

  container.innerHTML = tagButtons.join("");
}

function refreshWeightShortcutSelection(productId, value) {
  const numericValue = Number(value || 0);
  document.querySelectorAll(`[data-weight-shortcut="${productId}"]`).forEach((button) => {
    const buttonValue = Number(button.dataset.weightValue || 0);
    button.classList.toggle("is-active", Math.abs(buttonValue - numericValue) < 0.001);
  });
}

function sortProductsList(list) {
  const sorted = [...list];

  if (currentSortOption === "name-asc") {
    sorted.sort((a, b) => a.name.localeCompare(b.name, "fr"));
    return sorted;
  }

  if (currentSortOption === "price-asc") {
    sorted.sort((a, b) => a.priceValue - b.priceValue);
    return sorted;
  }

  if (currentSortOption === "price-desc") {
    sorted.sort((a, b) => b.priceValue - a.priceValue);
    return sorted;
  }

  if (currentSortOption === "available-first") {
    const priority = { available: 0, limited: 1, unavailable: 2 };
    sorted.sort((a, b) => {
      const diff = priority[productStockStatus(a)] - priority[productStockStatus(b)];
      return diff !== 0 ? diff : productCatalogOrder(a) - productCatalogOrder(b);
    });
    return sorted;
  }

  sorted.sort((a, b) => productCatalogOrder(a) - productCatalogOrder(b));
  return sorted;
}

function weightShortcutMarkup(productId) {
  return `
    <div class="weight-shortcuts" aria-label="Raccourcis de poids">
      <button class="weight-chip" type="button" data-weight-shortcut="${productId}" data-weight-value="0.25">250 g</button>
      <button class="weight-chip is-active" type="button" data-weight-shortcut="${productId}" data-weight-value="0.5">500 g</button>
      <button class="weight-chip" type="button" data-weight-shortcut="${productId}" data-weight-value="1">1 kg</button>
      <button class="weight-chip" type="button" data-weight-shortcut="${productId}" data-weight-value="2">2 kg</button>
    </div>
  `;
}

function productControlMarkup(product) {
  // On teste si le produit est vendu au poids.
  if (isWeightProduct(product)) {
    // Si oui, on renvoie un bloc HTML avec un champ de saisie en kilogrammes.
    return `
      <div class="quantity-control">
        <label>
          Poids souhaité (kg)
          <input type="number" min="0.1" step="0.1" value="0.5" data-product-weight="${product.id}">
        </label>
        ${weightShortcutMarkup(product.id)}
        <div class="price-preview" data-price-preview="${product.id}">${formatPreview(product, 1, 0.5)}</div>
      </div>
    `;
  }

  // Sinon, le produit est vendu à l'unité et on affiche un champ de quantité.
  return `
    <div class="quantity-control">
      <label>
        Quantité
        <input type="number" min="1" step="1" value="1" data-product-quantity="${product.id}">
      </label>
      <div class="price-preview" data-price-preview="${product.id}">${formatPreview(product, 1, 0)}</div>
    </div>
  `;
}

// Genere le HTML d'une carte produit pour la page catalogue ou la page d'accueil.
function productCardMarkup(product) {
  const favorite = favoriteActive(product.id);
  const availability = productAvailabilityMeta(product);
  const visibleTags = (product.tags || []).slice(0, 2);
  const tagsMarkup = visibleTags.length
    ? `
          <div class="product-tag-row">
            ${visibleTags.map(productTagMarkup).join("")}
          </div>
        `
    : "";

  return `
    <article class="product-card">
      <a class="product-link" href="${productUrl(product)}">
        ${mediaMarkup(product)}
      </a>

      <div class="product-card-body">
        <div class="product-meta">
          <div class="price-block">
            <span class="price-tag">${money(product.priceValue)}</span>
            <span class="unit-tag">${escapeHtml(unitDisplay(product))}</span>
          </div>
          ${availabilityBadgeMarkup(product)}
        </div>

        <div>
          <h3>${escapeHtml(product.name)}</h3>
          ${tagsMarkup}
        </div>

        ${productControlMarkup(product)}

        <div class="card-actions">
          <button class="add-button" type="button" data-add-cart="${product.id}" ${availability.canOrder ? "" : "disabled"}>
            ${availability.canOrder ? "Ajouter" : "Indisponible"}
          </button>
          <button class="icon-button ${favorite ? "is-favorite" : ""}" type="button" data-favorite="${product.id}" aria-label="Favori">
            ${favorite ? "&#9829;" : "&#9825;"}
          </button>
        </div>
      </div>
    </article>
  `;
}

function activeSearchText() {
  const input = document.getElementById("searchInput");
  return input ? input.value.trim().toLowerCase() : "";
}

// Filtre les produits selon la recherche, la categorie et le mode favoris.
function filteredProducts() {
  const search = activeSearchText();
  const favorites = getFavorites();

  return products.filter((product) => {
    const matchesSearch = !search
      || product.name.toLowerCase().includes(search)
      || product.category.toLowerCase().includes(search);
    const matchesCategory = currentCategoryFilter === "all" || product.category === currentCategoryFilter;
    const matchesFavorites = !currentFavoritesOnly || favorites.includes(product.id);
    const matchesAvailability = currentAvailabilityFilter === "all" || productStockStatus(product) === currentAvailabilityFilter;
    const matchesUnitMode = currentUnitModeFilter === "all" || product.unitMode === currentUnitModeFilter;
    const matchesTag = currentTagFilter === "all" || (product.tags || []).includes(currentTagFilter);

    return matchesSearch && matchesCategory && matchesFavorites && matchesAvailability && matchesUnitMode && matchesTag;
  });
}

// Met a jour toute la grille de produits visible dans le catalogue.

function updateCatalogSearchFromUrl() {
  const input = document.getElementById("searchInput");
  if (!input) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  input.value = params.get("recherche") || "";
}

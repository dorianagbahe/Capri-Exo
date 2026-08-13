function refreshRatingPicker(value = Number(document.getElementById("avisNote")?.value || 5)) {
  document.querySelectorAll("[data-rating-value]").forEach((button) => {
    const isActive = Number(button.dataset.ratingValue) <= Number(value);
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-checked", String(isActive));
  });
}

function refreshProductPreview(productId) {
  const product = findProduct(productId);
  const preview = document.querySelector(`[data-price-preview="${productId}"]`);

  if (!product || !preview) {
    return;
  }

  const scope = preview.closest(".product-card, .product-detail") || document;
  const quantityInput = scope.querySelector(`[data-product-quantity="${productId}"]`);
  const weightInput = scope.querySelector(`[data-product-weight="${productId}"]`);
  const quantity = quantityInput ? quantityInput.value : 1;
  const weight = weightInput ? weightInput.value : cartQuantityDefault(product);

  preview.textContent = formatPreview(product, quantity, weight);
}

function refreshProductWhatsAppLink(productId) {
  const product = findProduct(productId);
  const link = document.querySelector(`[data-product-whatsapp="${productId}"]`);

  if (!product || !link) {
    return;
  }

  const detail = link.closest(".product-detail") || document;
  const quantityInput = detail.querySelector(`[data-product-quantity="${productId}"]`);
  const weightInput = detail.querySelector(`[data-product-weight="${productId}"]`);
  const quantity = quantityInput ? Math.max(1, Number(quantityInput.value || 1)) : 1;
  const weight = weightInput ? Math.max(0.1, Number(weightInput.value || cartQuantityDefault(product))) : cartQuantityDefault(product);

  link.href = buildWhatsAppUrl(
    [{ id: productId, quantity, weight: isWeightProduct(product) ? weight : 0 }],
    getClient(),
    getOrderDraft()
  );
}

// Lance la petite transition de sortie avant de changer de page.
function navigateWithTransition(url) {
  if (pageTransitionRunning) {
    return;
  }

  pageTransitionRunning = true;
  document.body.classList.add("page-leaving");

  window.setTimeout(() => {
    window.location.href = url;
  }, 280);
}

function isInternalLink(link) {
  if (!link) {
    return false;
  }

  const href = link.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return false;
  }

  const destination = new URL(href, window.location.href);
  const samePage = destination.pathname === window.location.pathname
    && destination.search === window.location.search;

  if (samePage && destination.hash) {
    return false;
  }

  if (window.location.protocol === "file:") {
    return destination.protocol === "file:";
  }

  return destination.origin === window.location.origin;
}

// Rafraichit uniquement les blocs utiles selon la page ouverte.
function renderCurrentPage() {
  renderHomeSelection();
  renderLatestHighlights();
  renderMarketGrid("marketLocationsGrid");
  renderMarketGrid("aboutMarketsGrid");
  renderMarketGrid("contactMarketCards");
  renderCatalogPage();
  renderProductDetail();
  renderCartPage();
  renderReviews();
  updateCartBadge();
  refreshRatingPicker();
  renderFooterMarkets();
  setupRevealAnimations();
}

// Branche tous les clics, formulaires et champs dynamiques du site.
function initGlobalActions() {
  document.addEventListener("click", (event) => {
    const favoriteButton = event.target.closest("[data-favorite]");
    const addButton = event.target.closest("[data-add-cart]");
    const removeButton = event.target.closest("[data-remove-cart]");
    const finalizeButton = event.target.closest("[data-finalize-order]");
    const clearCartButton = event.target.closest("[data-clear-cart]");
    const closeModalButton = event.target.closest("[data-fermer-client]");
    const categoryButton = event.target.closest("[data-category-filter]");
    const filterButton = event.target.closest("[data-filter]");
    const tagButton = event.target.closest("[data-tag-filter]");
    const weightShortcutButton = event.target.closest("[data-weight-shortcut]");
    const ratingButton = event.target.closest("[data-rating-value]");
    const link = event.target.closest("a[href]");

    if (
      link
      && !event.defaultPrevented
      && event.button === 0
      && !event.metaKey
      && !event.ctrlKey
      && !event.shiftKey
      && !event.altKey
      && link.target !== "_blank"
      && !link.hasAttribute("download")
      && isInternalLink(link)
    ) {
      closeResponsiveNav();
      event.preventDefault();
      navigateWithTransition(new URL(link.getAttribute("href"), window.location.href).href);
      return;
    }

    if (favoriteButton) {
      toggleFavorite(favoriteButton.dataset.favorite);
      return;
    }

    if (addButton) {
      addToCart(addButton.dataset.addCart, addButton);
      addButton.textContent = "Ajouté";
      window.setTimeout(() => {
        addButton.textContent = "Ajouter";
      }, 900);
      return;
    }

    if (removeButton) {
      removeFromCart(removeButton.dataset.removeCart);
      return;
    }

    if (finalizeButton) {
      finalizeOrder();
      return;
    }

    if (clearCartButton) {
      clearCartWithMessage("Le panier a été vidé.");
      renderOrderConfirmation();
      showToast("Panier vidé.");
      return;
    }

    if (closeModalButton) {
      closeClientModal();
      return;
    }

    if (categoryButton) {
      currentCategoryFilter = categoryButton.dataset.categoryFilter;
      renderCatalogPage();
      return;
    }

    if (filterButton) {
      currentFavoritesOnly = filterButton.dataset.filter === "favorites";
      renderCatalogPage();
      return;
    }

    if (tagButton) {
      currentTagFilter = tagButton.dataset.tagFilter || "all";
      renderCatalogPage();
      return;
    }

    if (weightShortcutButton) {
      const productId = weightShortcutButton.dataset.weightShortcut;
      const weightValue = Number(weightShortcutButton.dataset.weightValue || 0.5);
      const scope = weightShortcutButton.closest(".product-card, .product-detail") || document;
      const weightInput = scope.querySelector(`[data-product-weight="${productId}"]`);

      if (weightInput) {
        weightInput.value = String(weightValue);
        refreshWeightShortcutSelection(productId, weightValue);
        refreshProductPreview(productId);
        refreshProductWhatsAppLink(productId);
      }
      return;
    }

    if (ratingButton) {
      const value = Number(ratingButton.dataset.ratingValue || 5);
      const ratingInput = document.getElementById("avisNote");
      if (ratingInput) {
        ratingInput.value = String(value);
      }
      refreshRatingPicker(value);
    }
  });

  document.addEventListener("submit", (event) => {
    if (event.target.id === "formRecherche") {
      event.preventDefault();
      renderCatalogPage();
    }

    if (event.target.id === "formClient") {
      registerClient(event);
    }

    if (event.target.id === "formContact") {
      saveContactMessage(event);
    }

    if (event.target.id === "formAvis") {
      saveReview(event);
    }
  });

  document.addEventListener("input", (event) => {
    const quantityField = event.target.closest("[data-product-quantity]");
    const weightField = event.target.closest("[data-product-weight]");
    const cartQuantityField = event.target.closest("[data-cart-quantity]");
    const cartWeightField = event.target.closest("[data-cart-weight]");
    const searchInput = event.target.closest("#searchInput");
    const orderDraftField = event.target.closest("[data-order-draft]");
    const sortSelect = event.target.closest("#sortProducts");
    const availabilitySelect = event.target.closest("#availabilityFilter");
    const unitModeSelect = event.target.closest("#unitModeFilter");

    if (quantityField) {
      refreshProductPreview(quantityField.dataset.productQuantity);
      refreshProductWhatsAppLink(quantityField.dataset.productQuantity);
    }

    if (weightField) {
      refreshProductPreview(weightField.dataset.productWeight);
      refreshProductWhatsAppLink(weightField.dataset.productWeight);
      refreshWeightShortcutSelection(weightField.dataset.productWeight, weightField.value);
    }

    if (cartQuantityField) {
      updateCartLine(cartQuantityField.dataset.cartQuantity, "quantity", cartQuantityField.value);
    }

    if (cartWeightField) {
      updateCartLine(cartWeightField.dataset.cartWeight, "weight", cartWeightField.value);
    }

    if (searchInput) {
      renderCatalogPage({ preserveScroll: true, refreshFilters: false });
    }

    if (orderDraftField) {
      saveOrderDraft({ [orderDraftField.dataset.orderDraft]: orderDraftField.value });
      refreshCartWhatsAppLink();
    }

    if (sortSelect) {
      currentSortOption = sortSelect.value;
      renderCatalogPage();
    }

    if (availabilitySelect) {
      currentAvailabilityFilter = availabilitySelect.value;
      renderCatalogPage();
    }

    if (unitModeSelect) {
      currentUnitModeFilter = unitModeSelect.value;
      renderCatalogPage();
    }
  });

  document.addEventListener("change", (event) => {
    const orderDraftField = event.target.closest("[data-order-draft]");
    const sortSelect = event.target.closest("#sortProducts");
    const availabilitySelect = event.target.closest("#availabilityFilter");
    const unitModeSelect = event.target.closest("#unitModeFilter");

    if (orderDraftField) {
      saveOrderDraft({ [orderDraftField.dataset.orderDraft]: orderDraftField.value });
      refreshCartWhatsAppLink();
    }

    if (sortSelect) {
      currentSortOption = sortSelect.value;
      renderCatalogPage();
    }

    if (availabilitySelect) {
      currentAvailabilityFilter = availabilitySelect.value;
      renderCatalogPage();
    }

    if (unitModeSelect) {
      currentUnitModeFilter = unitModeSelect.value;
      renderCatalogPage();
    }
  });

  window.addEventListener("pageshow", () => {
    pageTransitionRunning = false;
    document.body.classList.remove("page-leaving");
  });
}

// Point d'entree principal : on prepare la recherche, l'affichage et les interactions globales.
async function init() {
  await hydrateCatalogFromApi();
  updateCatalogSearchFromUrl();
  renderCurrentPage();
  syncCurrentNavigation();
  setupResponsiveNav();
  setupBackToTopButton();
  initGlobalActions();
}

void init();

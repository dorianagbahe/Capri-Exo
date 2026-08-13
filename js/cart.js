function cartMedia(product) {
  const hasImageClass = product.image ? " has-image" : "";
  const imageMarkup = product.image
    ? `<img class="cart-media-image" src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}">`
    : `<span class="cart-media-fallback">${escapeHtml(productAbbr(product))}</span>`;

  return `
    <div class="cart-media${hasImageClass}" data-abbr="${escapeHtml(productAbbr(product))}">
      ${imageMarkup}
    </div>
  `;
}

function cartControlMarkup(product, line) {
  if (isWeightProduct(product)) {
    return `
      <div class="cart-control">
        <label>
          Poids (kg)
          <input type="number" min="0.1" step="0.1" value="${Number(line.weight || 0.5).toFixed(1)}" data-cart-weight="${product.id}">
        </label>
      </div>
    `;
  }

  return `
    <div class="cart-control">
      <label>
        Quantité
        <input type="number" min="1" step="1" value="${Math.max(1, Number(line.quantity || 1))}" data-cart-quantity="${product.id}">
      </label>
    </div>
  `;
}

function cartLineMarkup(line) {
  const product = findProduct(line.id);

  if (!product) {
    return "";
  }

  const amount = calculateAmount(product, line.quantity, line.weight);

  return `
    <article class="cart-item">
      ${cartMedia(product)}
      <div>
        <h2>${escapeHtml(product.name)}</h2>
        <p>${money(product.priceValue)} ${escapeHtml(unitDisplay(product))}</p>

        <div class="cart-item-footer">
          ${cartControlMarkup(product, line)}
          <div class="line-total">
            ${formatPreview(product, line.quantity, line.weight)}
          </div>
          <button class="remove-button" type="button" data-remove-cart="${product.id}">Supprimer</button>
        </div>
      </div>
    </article>
  `;
}

function cartSummaryMarkup(cart) {
  const total = cartTotal(cart);
  const totalItems = cartItemCount(cart);
  const draft = getOrderDraft();
  const client = getClient();
  const whatsappUrl = buildWhatsAppUrl(cart, client, draft);
  const recapLines = cart
    .map((line) => {
      const product = findProduct(line.id);
      if (!product) {
        return "";
      }

      const quantityText = isWeightProduct(product)
        ? `${Math.round(Number(line.weight || 0.5) * 1000)} g`
        : `${Math.max(1, Number(line.quantity || 1))} article(s)`;

      return `
        <li>
          <div>
            <span>${escapeHtml(product.name)}</span>
            <small>${escapeHtml(product.category)} - ${escapeHtml(unitDisplay(product))}</small>
          </div>
          <strong>${escapeHtml(quantityText)} - ${money(calculateAmount(product, line.quantity, line.weight))}</strong>
        </li>
      `;
    })
    .join("");

  return `
    <aside class="summary-card">
      <h2>Résumé de commande</h2>
      <div class="summary-row">
        <span>Articles</span>
        <strong>${totalItems}</strong>
      </div>
      <div class="summary-row">
        <span>Estimation</span>
        <strong>${money(total)}</strong>
      </div>
      <div class="summary-total">
        <span>Total estimé</span>
        <strong>${money(total)}</strong>
      </div>
      <div class="summary-breakdown">
        <p class="summary-breakdown-title">Récapitulatif détaillé</p>
        <ul class="summary-breakdown-list">
          ${recapLines}
        </ul>
      </div>
      <div class="summary-fields">
        <label>
          Mode de réception
          <select id="orderDeliveryMode" data-order-draft="deliveryMode">
            <option value="pickup" ${draft.deliveryMode === "pickup" ? "selected" : ""}>Retrait sur le marché</option>
            <option value="delivery" ${draft.deliveryMode === "delivery" ? "selected" : ""}>Livraison</option>
          </select>
        </label>

        <label>
          Marché de retrait
          <select id="orderPickupMarket" data-order-draft="pickupMarket">
            ${markets.map((market) => `<option value="${escapeHtml(market.id)}" ${draft.pickupMarket === market.id ? "selected" : ""}>${escapeHtml(market.name)}</option>`).join("")}
          </select>
        </label>

        <label>
          Créneau souhaité
          <input id="orderTimeSlot" type="text" value="${escapeHtml(draft.timeSlot)}" placeholder="Ex : vendredi après-midi" data-order-draft="timeSlot">
        </label>

        <label>
          Mode de paiement
          <select id="orderPaymentMode" data-order-draft="paymentMode">
            <option value="shop" ${draft.paymentMode === "shop" ? "selected" : ""}>Paiement au stand</option>
            <option value="delivery" ${draft.paymentMode === "delivery" ? "selected" : ""}>Paiement à la livraison</option>
            <option value="online" ${draft.paymentMode === "online" ? "selected" : ""}>Paiement en ligne</option>
          </select>
        </label>

        <label>
          Note pour la commande
          <textarea id="orderNote" placeholder="Une précision utile pour votre commande" data-order-draft="note">${escapeHtml(draft.note)}</textarea>
        </label>
      </div>
      <div class="summary-row">
        <span>Retrait prévu</span>
        <strong>${escapeHtml(pickupMarketLabel(draft.pickupMarket))}</strong>
      </div>
      <div class="summary-total summary-total-repeat">
        <span>Total avant validation</span>
        <strong>${money(total)}</strong>
      </div>
      <div class="summary-actions">
        <button class="button button-primary" type="button" data-finalize-order>Finaliser la commande</button>
        <a class="button button-secondary" href="index.html#catalogue-produits">Continuer mes achats</a>
        <button class="button button-secondary" type="button" data-clear-cart>Vider le panier</button>
        <a class="button button-whatsapp" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" data-cart-whatsapp>Commander sur WhatsApp</a>
      </div>
      <p class="muted">${escapeHtml(marketPickupSummary())}</p>
      <p class="muted">
        ${clientRegistered() ? `Commande prête pour ${escapeHtml(client.name)}.` : "Le client peut ajuster les quantités ou le poids avant validation."}
      </p>
    </aside>
  `;
}

function renderOrderConfirmation() {
  const target = document.getElementById("confirmationCommande");
  if (!target) {
    return;
  }

  const orders = getOrders();
  const lastOrder = orders[orders.length - 1];

  if (!lastOrder) {
    target.innerHTML = "";
    return;
  }

  const whatsappUrl = buildWhatsAppUrl(
    lastOrder.items.map((item) => ({ id: item.id, quantity: item.quantity, weight: item.weight })),
    lastOrder.client,
    {
      deliveryMode: lastOrder.deliveryMode,
      timeSlot: lastOrder.timeSlot,
      paymentMode: lastOrder.paymentMode,
      note: lastOrder.note
    }
  );

  const confirmationLines = lastOrder.items
    .map((item) => {
      const quantityText = item.unitMode === "weight"
        ? `${Math.round(Number(item.weight || 0.5) * 1000)} g`
        : `${Math.max(1, Number(item.quantity || 1))} article(s)`;

      return `
        <li>
          <span>${escapeHtml(item.name)}</span>
          <strong>${escapeHtml(quantityText)} - ${money(item.amount)}</strong>
        </li>
      `;
    })
    .join("");

  target.innerHTML = `
    <article class="content-card order-confirmation-card">
      <div class="confirmation-heading">
        <p class="eyebrow">Dernière commande confirmée</p>
        <span class="confirmation-pill">Commande enregistrée</span>
      </div>
      <h2>Commande ${escapeHtml(lastOrder.number)}</h2>
      <p class="muted">
        Enregistrée le ${escapeHtml(formatDate(lastOrder.createdAt))} pour ${escapeHtml(lastOrder.client?.name || "votre compte client")}.
      </p>
      <div class="order-confirmation-grid">
        <p><strong>Réception :</strong> ${escapeHtml(deliveryModeLabel(lastOrder.deliveryMode))}</p>
        <p><strong>Marché :</strong> ${escapeHtml(pickupMarketLabel(lastOrder.pickupMarket))}</p>
        <p><strong>Paiement :</strong> ${escapeHtml(paymentModeLabel(lastOrder.paymentMode))}</p>
        <p><strong>Total estimé :</strong> ${money(lastOrder.total)}</p>
        <p><strong>Articles :</strong> ${lastOrder.totalItems}</p>
      </div>
      <div class="summary-breakdown order-confirmation-list">
        <p class="summary-breakdown-title">Contenu de la commande</p>
        <ul class="summary-breakdown-list">
          ${confirmationLines}
        </ul>
      </div>
      <a class="button button-whatsapp" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">Envoyer cette commande sur WhatsApp</a>
    </article>
  `;
}

// Recalcule et recompose la page panier complete.
function renderCartPage() {
  const target = document.getElementById("contenuPanier");
  if (!target) {
    return;
  }

  const cart = getCart();

  if (cart.length === 0) {
    target.innerHTML = `
      <div class="empty-state">
        <h2>Votre panier est vide</h2>
        <p>Ajoutez des produits depuis le catalogue ou une fiche détaillée pour commencer.</p>
        <a class="button button-primary" href="index.html#catalogue-produits">Voir le catalogue</a>
      </div>
    `;
    renderOrderConfirmation();
    return;
  }

  target.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items">
        ${cart.map(cartLineMarkup).join("")}
      </div>
      ${cartSummaryMarkup(cart)}
    </div>
  `;
  renderOrderConfirmation();
}

function openClientModal() {
  const modal = document.getElementById("modalClient");
  if (!modal) {
    return;
  }

  modal.classList.remove("is-hidden");
  modal.setAttribute("aria-hidden", "false");
}

function closeClientModal() {
  const modal = document.getElementById("modalClient");
  if (!modal) {
    return;
  }

  modal.classList.add("is-hidden");
  modal.setAttribute("aria-hidden", "true");
}

function clientRegistered() {
  const client = getClient();
  return Boolean(client && client.email);
}

function completeOrder(client) {
  const order = createOrder(client);
  void syncOrderToApi(order);
  closeClientModal();
  clearCartWithMessage(`Merci ${client.name}. Votre commande ${order.number} a bien été enregistrée.`);
  renderOrderConfirmation();
  showToast(`Commande ${order.number} confirmée.`);
}

// Gere la derniere etape de commande : soit le client est connu, soit on ouvre la fenetre d'informations.
function finalizeOrder() {
  const cart = getCart();
  const client = getClient();

  if (cart.length === 0) {
    setMessage("messageCommande", "Votre panier est vide. Ajoutez un produit avant de finaliser.");
    return;
  }

  if (clientRegistered()) {
    completeOrder(client);
    return;
  }

  openClientModal();
}

// Enregistre les informations du client depuis la fenetre de commande.
function registerClient(event) {
  event.preventDefault();

  const client = {
    name: document.getElementById("clientNom").value.trim(),
    email: document.getElementById("clientEmail").value.trim(),
    phone: document.getElementById("clientTelephone").value.trim(),
    address: document.getElementById("clientAdresse").value.trim(),
    city: document.getElementById("clientVille").value.trim(),
    postalCode: document.getElementById("clientCodePostal").value.trim(),
    createdAt: new Date().toISOString()
  };

  const savedClient = upsertClientRecord(client);
  writeStore(siteInfo.keys.client, savedClient);
  event.target.reset();
  completeOrder(savedClient);
}

// Affiche les avis deja enregistres dans le navigateur.

function renderReviews() {
  const target = document.getElementById("listeAvis");
  const summary = document.getElementById("reviewSummary");
  if (!target) {
    return;
  }

  const reviews = getReviews();

  if (summary) {
    if (reviews.length === 0) {
      summary.textContent = "Pas encore d'avis publié pour le moment.";
    } else {
      const average = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
      summary.textContent = `${average.toFixed(1)}/5 sur ${reviews.length} avis`;
    }
  }

  if (reviews.length === 0) {
    target.innerHTML = `
      <div class="empty-state">
        <h2>Aucun avis pour le moment</h2>
        <p>Soyez le premier à laisser un retour sur votre expérience.</p>
      </div>
    `;
    return;
  }

  target.innerHTML = reviews
    .slice()
    .reverse()
    .map((review) => `
      <article class="review-card">
        <div class="review-card-header">
          <strong>${escapeHtml(review.name)}</strong>
          <span class="review-stars">${"&#9733;".repeat(review.rating)}${"&#9734;".repeat(5 - review.rating)}</span>
        </div>
        <p>${escapeHtml(review.text)}</p>
        <small class="muted">${escapeHtml(review.email)} - ${escapeHtml(findMarket(review.marketId).name)}${review.createdAt ? ` - ${escapeHtml(formatDate(review.createdAt))}` : ""}</small>
      </article>
    `)
    .join("");
}

function saveContactMessage(event) {
  event.preventDefault();

  const now = new Date().toISOString();
  const message = {
    id: generateRecordId("message"),
    name: document.getElementById("contactNom").value.trim(),
    email: document.getElementById("contactEmail").value.trim(),
    marketId: document.getElementById("contactMarket").value,
    text: document.getElementById("contactMessage").value.trim(),
    status: "received",
    createdAt: now,
    updatedAt: now
  };

  writeStore(siteInfo.keys.messages, [...getMessages(), message]);
  void syncContactMessageToApi(message);
  event.target.reset();
  setMessage("messageContact", `Merci ${message.name}, votre message pour ${findMarket(message.marketId).name} a bien été envoyé.`);
}

function saveReview(event) {
  event.preventDefault();

  const now = new Date().toISOString();
  const review = {
    id: generateRecordId("review"),
    name: document.getElementById("avisNom").value.trim(),
    email: document.getElementById("avisEmail").value.trim(),
    marketId: document.getElementById("avisMarket").value,
    rating: Math.max(1, Math.min(5, Number(document.getElementById("avisNote").value || 5))),
    text: document.getElementById("avisTexte").value.trim(),
    status: "published",
    verifiedOrder: false,
    createdAt: now,
    updatedAt: now
  };

  writeStore(siteInfo.keys.reviews, [...getReviews(), review]);
  void syncReviewToApi(review);
  event.target.reset();
  document.getElementById("avisNote").value = 5;
  refreshRatingPicker(5);
  setMessage("messageAvis", `Merci ${review.name}, votre avis pour ${findMarket(review.marketId).name} a été publié.`);
  renderReviews();
}

function formatWhatsAppPhone(number) {
  const digits = String(number || "").replace(/\D/g, "");

  if (/^33\d{9}$/.test(digits)) {
    const localDigits = `0${digits.slice(2)}`;
    return localDigits.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
  }

  return digits ? `+${digits}` : "Numéro à renseigner";
}

function renderWhatsAppContactPage() {
  const numberTarget = document.getElementById("whatsappDisplayNumber");
  const chatLink = document.getElementById("whatsappChatLink");
  const callLink = document.getElementById("whatsappCallLink");
  const notice = document.getElementById("whatsappConfigNotice");

  if (!numberTarget || !chatLink || !callLink) {
    return;
  }

  const cleanNumber = String(siteInfo.whatsappNumber || "").replace(/\D/g, "");
  const message = new URLSearchParams(window.location.search).get("message")
    || `Bonjour ${siteInfo.brand}, je souhaite obtenir un renseignement.`;
  const placeholderNumber = cleanNumber === "33600000000";

  numberTarget.textContent = formatWhatsAppPhone(cleanNumber);

  if (!cleanNumber || placeholderNumber) {
    chatLink.setAttribute("aria-disabled", "true");
    callLink.setAttribute("aria-disabled", "true");
    chatLink.removeAttribute("href");
    callLink.removeAttribute("href");
    notice.hidden = false;
    return;
  }

  chatLink.href = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  callLink.href = `tel:+${cleanNumber}`;
}

document.addEventListener("DOMContentLoaded", renderWhatsAppContactPage);

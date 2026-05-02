const clarityInput = document.getElementById("clarityInput");
const clarityButton = document.getElementById("clarityButton");
const clarityOutput = document.getElementById("clarityOutput");
const promptCards = document.querySelectorAll(".prompt-card");
const promptOutput = document.getElementById("promptOutput");

function getClarityResponse(text) {
  const normalizedText = text.toLowerCase().trim();

  if (!normalizedText) {
    return "Du weichst noch aus. Schreib den ersten ehrlichen Satz. Nicht den schönen.";
  }

  if (normalizedText.length < 18) {
    return "Das ist noch Oberfläche. Nicht falsch. Nur noch nicht ehrlich genug.";
  }

  if (
    normalizedText.includes("stress") ||
    normalizedText.includes("zu viel") ||
    normalizedText.includes("überfordert") ||
    normalizedText.includes("müde")
  ) {
    return "Du bist nicht schwach. Du bist überladen. Der nächste Schritt ist nicht mehr Disziplin. Es ist Entlastung.";
  }

  if (
    normalizedText.includes("angst") ||
    normalizedText.includes("sorge") ||
    normalizedText.includes("unsicher")
  ) {
    return "Deine Angst will dich nicht zerstören. Sie will gesehen werden. Aber sie darf nicht mehr allein entscheiden.";
  }

  if (
    normalizedText.includes("perfekt") ||
    normalizedText.includes("fehler") ||
    normalizedText.includes("nicht gut genug")
  ) {
    return "Perfektion ist oft nur Angst in Abendgarderobe. Zieh ihr die Maske aus.";
  }

  if (
    normalizedText.includes("wut") ||
    normalizedText.includes("sauer") ||
    normalizedText.includes("genervt")
  ) {
    return "Deine Wut ist nicht das Problem. Sie zeigt nur, wo du dich zu lange übergangen hast.";
  }

  return "Du weißt es wahrscheinlich schon. Du brauchst gerade keine Antwort. Du brauchst den Mut, dir selbst zu glauben.";
}

clarityButton.addEventListener("click", () => {
  clarityOutput.textContent = getClarityResponse(clarityInput.value);
});

promptCards.forEach((card) => {
  card.addEventListener("click", () => {
    promptCards.forEach((item) => item.classList.remove("active"));
    card.classList.add("active");
    promptOutput.textContent = card.dataset.answer;
  });
});
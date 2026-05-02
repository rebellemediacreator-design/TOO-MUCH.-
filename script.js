const clarityInput = document.getElementById("clarityInput");
const clarityButton = document.getElementById("clarityButton");
const clarityOutput = document.getElementById("clarityOutput");

const faceButton = document.getElementById("faceButton");
const faceOutput = document.getElementById("faceOutput");

const promptCards = document.querySelectorAll(".prompt-card");
const promptOutput = document.getElementById("promptOutput");

const criticName = document.getElementById("criticName");
const criticButton = document.getElementById("criticButton");
const criticOutput = document.getElementById("criticOutput");

const takeawayInput = document.getElementById("takeawayInput");
const saveButton = document.getElementById("saveButton");
const takeawayOutput = document.getElementById("takeawayOutput");

function getClarityResponse(text) {
  const value = text.toLowerCase().trim();

  if (!value) {
    return "Du weichst noch aus. Schreib den ersten ehrlichen Satz. Nicht den schönen.";
  }

  if (value.length < 18) {
    return "Das ist noch Oberfläche. Nicht falsch. Nur noch nicht ehrlich genug.";
  }

  if (
    value.includes("stress") ||
    value.includes("zu viel") ||
    value.includes("überfordert") ||
    value.includes("müde") ||
    value.includes("erschöpft")
  ) {
    return "Du bist nicht schwach. Du bist überladen. Der nächste Schritt ist nicht mehr Disziplin. Es ist Entlastung.";
  }

  if (
    value.includes("angst") ||
    value.includes("sorge") ||
    value.includes("unsicher")
  ) {
    return "Deine Angst will dich nicht zerstören. Sie will gesehen werden. Aber sie darf nicht mehr allein entscheiden.";
  }

  if (
    value.includes("perfekt") ||
    value.includes("fehler") ||
    value.includes("nicht gut genug")
  ) {
    return "Perfektion ist oft nur Angst in Abendgarderobe. Zieh ihr die Maske aus.";
  }

  if (
    value.includes("wut") ||
    value.includes("sauer") ||
    value.includes("genervt")
  ) {
    return "Deine Wut ist nicht das Problem. Sie zeigt nur, wo du dich zu lange übergangen hast.";
  }

  return "Du weißt es wahrscheinlich schon. Du brauchst gerade keine Antwort. Du brauchst den Mut, dir selbst zu glauben.";
}

clarityButton.addEventListener("click", () => {
  clarityOutput.textContent = getClarityResponse(clarityInput.value);
});

faceButton.addEventListener("click", () => {
  faceOutput.classList.remove("hidden");
  faceOutput.textContent = "Du hast es die ganze Zeit gewusst. Du hast es nur leiser gemacht.";
});

promptCards.forEach((card) => {
  card.addEventListener("click", () => {
    promptCards.forEach((item) => item.classList.remove("active"));
    card.classList.add("active");
    promptOutput.textContent = card.dataset.answer;
  });
});

criticButton.addEventListener("click", () => {
  const name = criticName.value.trim();

  if (!name) {
    criticOutput.textContent = "Gib der Stimme einen Namen. Namen machen Monster kleiner.";
    return;
  }

  criticOutput.textContent =
    name + " darf reden. Aber " + name + " führt nicht mehr dein Leben.";
});

saveButton.addEventListener("click", () => {
  const takeaway = takeawayInput.value.trim();

  if (!takeaway) {
    takeawayOutput.textContent = "Noch nichts. Vielleicht ist dein erster Satz: Ich darf langsamer ehrlich werden.";
    return;
  }

  takeawayOutput.textContent =
    "Dein Satz steht. Nicht als Lösung. Als Anfang: „" + takeaway + "“";
});
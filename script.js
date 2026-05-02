const reflectionButtons = document.querySelectorAll("[data-reflect]");
const criticButton = document.getElementById("criticButton");
const finalButton = document.getElementById("finalButton");

function collectValues(ids) {
  return ids
    .split(",")
    .map((id) => document.getElementById(id)?.value.trim())
    .filter(Boolean);
}

function buildReflection(values, fallback) {
  if (values.length === 0) {
    return "Noch nichts geschrieben. Vielleicht ist genau das dein Anfang: Du weichst noch aus.";
  }

  const joined = values.join(" ").toLowerCase();

  if (joined.length < 35) {
    return "Das ist noch Oberfläche. Nicht falsch. Nur noch nicht ehrlich genug. Schreib einen Satz, den du nicht hübsch machen musst.";
  }

  if (
    joined.includes("muss") ||
    joined.includes("sollte") ||
    joined.includes("erwarten") ||
    joined.includes("alle")
  ) {
    return "Da steckt Pflicht drin. Vielleicht sogar eine, die du nie bewusst gewählt hast.";
  }

  if (
    joined.includes("angst") ||
    joined.includes("sorge") ||
    joined.includes("unsicher")
  ) {
    return "Da spricht Angst mit. Sie darf da sein. Aber sie muss nicht die Regie übernehmen.";
  }

  if (
    joined.includes("müde") ||
    joined.includes("erschöpft") ||
    joined.includes("überfordert") ||
    joined.includes("zu viel")
  ) {
    return "Du brauchst nicht noch mehr Stärke. Du brauchst weniger Last.";
  }

  if (
    joined.includes("wut") ||
    joined.includes("sauer") ||
    joined.includes("genervt")
  ) {
    return "Deine Wut ist kein Fehler. Sie zeigt, wo du dich zu lange übergangen hast.";
  }

  return fallback;
}

reflectionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const ids = button.dataset.reflect;
    const outputId = button.dataset.output;
    const output = document.getElementById(outputId);
    const fallback = output.textContent;

    const values = collectValues(ids);
    output.textContent = buildReflection(values, fallback);
  });
});

criticButton.addEventListener("click", () => {
  const name = document.getElementById("criticName").value.trim();
  const claim = document.getElementById("q5a").value.trim();
  const loudMoment = document.getElementById("q5b").value.trim();
  const output = document.getElementById("out5");

  if (!name && !claim && !loudMoment) {
    output.textContent = "Diese Stimme bleibt groß, solange sie namenlos bleibt. Fang mit einem Namen an.";
    return;
  }

  if (!name) {
    output.textContent = "Du hast erkannt, was sie sagt. Jetzt gib ihr einen Namen. Namen machen Monster kleiner.";
    return;
  }

  output.textContent =
    name + " darf auftauchen. Aber " + name + " ist nicht dein inneres Gesetz. Nur eine Stimme. Nicht die Wahrheit.";
});

finalButton.addEventListener("click", () => {
  const sentence = document.getElementById("finalSentence").value.trim();
  const output = document.getElementById("out8");

  if (!sentence) {
    output.textContent = "Noch kein Satz. Vielleicht beginnt er so: Ich darf aufhören, mich selbst zu übergehen.";
    return;
  }

  output.textContent =
    "Dein Satz steht: „" + sentence + "“ — nicht als Lösung. Als Anfang.";
});
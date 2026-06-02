const reflectionButtons = document.querySelectorAll("[data-reflect]");
const criticButton = document.getElementById("criticButton");
const finalButton = document.getElementById("finalButton");
const resetProgress = document.getElementById("resetProgress");
const inputs = document.querySelectorAll("textarea, input");
const storageKey = "rebelle-too-much-state-v2";

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
    joined.includes("zu viel") ||
    joined.includes("zuviel")
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

  if (
    joined.includes("nicht mehr") ||
    joined.includes("aufhören") ||
    joined.includes("grenze") ||
    joined.includes("nein")
  ) {
    return "Da ist eine Grenze. Vielleicht ist sie nicht neu. Vielleicht ist sie nur endlich hörbar.";
  }

  return fallback;
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    inputs.forEach((field) => {
      if (saved[field.id]) {
        field.value = saved[field.id];
      }
    });
  } catch (error) {
    console.warn("TOO MUCH. konnte gespeicherte Eingaben nicht laden.", error);
  }
}

function saveState() {
  const data = {};
  inputs.forEach((field) => {
    if (field.id && field.value.trim()) {
      data[field.id] = field.value;
    }
  });
  localStorage.setItem(storageKey, JSON.stringify(data));
}

inputs.forEach((field) => {
  field.addEventListener("input", saveState);
});

reflectionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const ids = button.dataset.reflect;
    const outputId = button.dataset.output;
    const output = document.getElementById(outputId);
    const fallback = output.textContent;

    const values = collectValues(ids);
    output.textContent = buildReflection(values, fallback);
    saveState();
  });
});

if (criticButton) {
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
    saveState();
  });
}

if (finalButton) {
  finalButton.addEventListener("click", () => {
    const sentence = document.getElementById("finalSentence").value.trim();
    const output = document.getElementById("out8");

    if (!sentence) {
      output.textContent = "Noch kein Satz. Vielleicht beginnt er so: Ich darf aufhören, mich selbst zu übergehen.";
      return;
    }

    output.textContent =
      "Dein Satz steht: „" + sentence + "“ — nicht als Lösung. Als Anfang.";
    saveState();
  });
}

if (resetProgress) {
  resetProgress.addEventListener("click", () => {
    const confirmed = window.confirm("Alle Eingaben in TOO MUCH. löschen und neu beginnen?");
    if (!confirmed) return;

    localStorage.removeItem(storageKey);
    inputs.forEach((field) => {
      field.value = "";
    });

    window.location.hash = "#start";
  });
}

loadState();

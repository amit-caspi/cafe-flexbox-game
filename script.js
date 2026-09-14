// --- 1. Stage Configurations (8 Diverse Levels) ---
const STAGES = [
  {
    title: "Morning Espresso",
    instruction: "Rush hour at the bar! Slide both espresso cups to the far right of the counter.",
    items: ["☕", "☕"],
    properties: ["justify-content"],
    solution: { "justify-content": "flex-end" },
    defaults: { "justify-content": "flex-start" }
  },
  {
    title: "Pastry Display",
    instruction: "Distribute the 3 croissants evenly so the first and last touch the counter edges.",
    items: ["🥐", "🥐", "🥐"],
    properties: ["justify-content"],
    solution: { "justify-content": "space-between" },
    defaults: { "justify-content": "flex-start" }
  },
  {
    title: "Cold Drinks Tray",
    instruction: "Keep the cold drinks steady by resting both glasses at the bottom of the counter.",
    items: ["🥤", "🥤"],
    properties: ["align-items"],
    solution: { "align-items": "flex-end" },
    defaults: { "align-items": "flex-start" }
  },
  {
    title: "Combo Breakfast",
    instruction: "Center the coffee and chocolate cake right in the middle (horizontally and vertically).",
    items: ["☕", "🍰"],
    properties: ["justify-content", "align-items"],
    solution: {
      "justify-content": "center",
      "align-items": "center"
    },
    defaults: {
      "justify-content": "flex-start",
      "align-items": "flex-start"
    }
  },
  {
    title: "Takeaway Cupcake Stack",
    instruction: "Arrange the cupcakes in a vertical column, spaced with equal room around each one.",
    items: ["🧁", "🧁", "🧁"],
    properties: ["flex-direction", "justify-content"],
    solution: {
      "flex-direction": "column",
      "justify-content": "space-around"
    },
    defaults: {
      "flex-direction": "row",
      "justify-content": "flex-start"
    }
  },
  {
    title: "Donut Platter",
    instruction: "There are too many donuts for one line! Allow them to wrap to the next row, and space them evenly.",
    items: ["🍩", "🍩", "🍩", "🍩", "🍩", "🍩"],
    properties: ["flex-wrap", "justify-content"],
    solution: {
      "flex-wrap": "wrap",
      "justify-content": "space-evenly"
    },
    defaults: {
      "flex-wrap": "nowrap",
      "justify-content": "flex-start"
    }
  },
  {
    title: "Tea & Pancakes Corner",
    instruction: "Stack the items in a vertical column and align them to the right edge of the counter.",
    items: ["🍵", "🥞"],
    properties: ["flex-direction", "align-items"],
    solution: {
      "flex-direction": "column",
      "align-items": "flex-end"
    },
    defaults: {
      "flex-direction": "row",
      "align-items": "flex-start"
    }
  },
  {
    title: "The Master Chef Showcase",
    instruction: "Final test! Stack items vertically in a column, center them horizontally, and push them to the bottom.",
    items: ["☕", "🥐", "🍰"],
    properties: ["flex-direction", "justify-content", "align-items"],
    solution: {
      "flex-direction": "column",
      "justify-content": "flex-end",
      "align-items": "center"
    },
    defaults: {
      "flex-direction": "row",
      "justify-content": "flex-start",
      "align-items": "flex-start"
    }
  }
];

// --- 2. CSS Property Options Definition ---
const PROPERTY_OPTIONS = {
  "flex-direction": ["row", "column"],
  "justify-content": ["flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly"],
  "align-items": ["flex-start", "center", "flex-end"],
  "flex-wrap": ["nowrap", "wrap"]
};

// --- 3. State Management & Persistent LocalStorage ---
let currentStageIndex = parseInt(localStorage.getItem("cafe_flex_stage")) || 0;
let unlockedStageIndex = parseInt(localStorage.getItem("cafe_flex_unlocked")) || 0;

let stageScoresMap = {};
try {
  stageScoresMap = JSON.parse(localStorage.getItem("cafe_flex_scores")) || {};
} catch (e) {
  stageScoresMap = {};
}

let stageAttemptsMap = {};
try {
  stageAttemptsMap = JSON.parse(localStorage.getItem("cafe_flex_attempts")) || {};
} catch (e) {
  stageAttemptsMap = {};
}

STAGES.forEach((_, idx) => {
  if (typeof stageAttemptsMap[idx] === "undefined") stageAttemptsMap[idx] = 0;
  if (typeof stageScoresMap[idx] === "undefined") stageScoresMap[idx] = 0;
});

// --- 4. DOM Elements Cache ---
const stageNav = document.getElementById("stage-nav");
const stageBadge = document.getElementById("stage-badge");
const totalScoreEl = document.getElementById("total-score");
const stagePointsCurrentEl = document.getElementById("stage-points-current");
const stageScoreBadge = document.getElementById("stage-score-badge");
const attemptCountEl = document.getElementById("attempt-count");
const stageTitle = document.getElementById("stage-title");
const stageInstruction = document.getElementById("stage-instruction");
const controlsContainer = document.getElementById("controls-container");
const feedbackMessage = document.getElementById("feedback-message");
const counterFrame = document.getElementById("counter-frame");
const targetBoard = document.getElementById("target-board");
const dishBoard = document.getElementById("dish-board");
const gameContainer = document.getElementById("game-container");
const btnCheck = document.getElementById("btn-check");
const btnReset = document.getElementById("btn-reset");
const btnNext = document.getElementById("btn-next");

function updateTotalScoreDisplay() {
  const total = Object.values(stageScoresMap).reduce((sum, val) => sum + val, 0);
  totalScoreEl.textContent = total;
}

function updateStageScoreDisplay() {
  const attempts = stageAttemptsMap[currentStageIndex] || 0;
  const currentVal = Math.max(20, 100 - attempts * 10);
  stagePointsCurrentEl.textContent = currentVal;
}

// --- 5. Render Navigation Bar ---
function renderStageNav() {
  stageNav.innerHTML = "";
  STAGES.forEach((_, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "stage-btn";
    btn.textContent = idx + 1;

    if (idx === currentStageIndex) btn.classList.add("active");
    if (idx < unlockedStageIndex) btn.classList.add("completed");
    if (idx > unlockedStageIndex) btn.disabled = true;

    btn.addEventListener("click", () => {
      currentStageIndex = idx;
      loadStage(currentStageIndex);
    });

    stageNav.appendChild(btn);
  });
}

// --- 6. Load Stage Function ---
function loadStage(index) {
  const stage = STAGES[index];

  localStorage.setItem("cafe_flex_stage", index);

  updateTotalScoreDisplay();
  updateStageScoreDisplay();
  attemptCountEl.textContent = stageAttemptsMap[index] || 0;

  renderStageNav();
  stageBadge.textContent = `Stage ${index + 1} of ${STAGES.length}`;
  stageTitle.textContent = stage.title;
  stageInstruction.textContent = stage.instruction;
  feedbackMessage.textContent = "";
  feedbackMessage.className = "feedback";
  counterFrame.classList.remove("win-glow");

  if (index < unlockedStageIndex) {
    btnNext.classList.remove("hidden");
  } else {
    btnNext.classList.add("hidden");
  }

  targetBoard.innerHTML = "";
  dishBoard.innerHTML = "";
  controlsContainer.innerHTML = "";

  resetBoardStyles(targetBoard);
  resetBoardStyles(dishBoard);

  for (const [prop, val] of Object.entries(stage.solution)) {
    targetBoard.style[prop] = val;
  }

  stage.items.forEach(emoji => {
    const targetSlot = document.createElement("div");
    targetSlot.className = "item-slot target-mat";
    targetBoard.appendChild(targetSlot);

    const dishSlot = document.createElement("div");
    dishSlot.className = "item-slot dish-item";
    dishSlot.textContent = emoji;
    dishBoard.appendChild(dishSlot);
  });

  stage.properties.forEach(prop => {
    const row = document.createElement("div");
    row.className = "control-row";

    const label = document.createElement("span");
    label.className = "control-label";
    label.textContent = `${prop}:`;

    const select = document.createElement("select");
    select.className = "control-select";
    select.dataset.property = prop;

    PROPERTY_OPTIONS[prop].forEach(optionVal => {
      const opt = document.createElement("option");
      opt.value = optionVal;
      opt.textContent = `${optionVal};`;
      if (optionVal === stage.defaults[prop]) opt.selected = true;
      select.appendChild(opt);
    });

    select.addEventListener("change", applyUserStyles);

    row.appendChild(label);
    row.appendChild(select);
    controlsContainer.appendChild(row);
  });

  applyUserStyles();
}

function resetBoardStyles(element) {
  element.style.flexDirection = "row";
  element.style.justifyContent = "flex-start";
  element.style.alignItems = "flex-start";
  element.style.flexWrap = "nowrap";
}

function applyUserStyles() {
  const selects = controlsContainer.querySelectorAll(".control-select");
  selects.forEach(select => {
    const prop = select.dataset.property;
    dishBoard.style[prop] = select.value;
  });
}

// --- 7. Check Solution ---
function checkSolution() {
  const stage = STAGES[currentStageIndex];
  const selects = controlsContainer.querySelectorAll(".control-select");
  let isCorrect = true;

  selects.forEach(select => {
    const prop = select.dataset.property;
    if (select.value !== stage.solution[prop]) {
      isCorrect = false;
    }
  });

  if (isCorrect) {
    const attempts = stageAttemptsMap[currentStageIndex] || 0;
    const earnedScore = Math.max(20, 100 - attempts * 10);
    
    if (earnedScore > (stageScoresMap[currentStageIndex] || 0)) {
      stageScoresMap[currentStageIndex] = earnedScore;
      localStorage.setItem("cafe_flex_scores", JSON.stringify(stageScoresMap));
      updateTotalScoreDisplay();
    }

    feedbackMessage.textContent = `Order up! Perfect arrangement! 🛎️ (+${earnedScore} pts awarded!)`;
    feedbackMessage.className = "feedback success";
    counterFrame.classList.add("win-glow");
    btnNext.classList.remove("hidden");

    const dishes = dishBoard.querySelectorAll(".dish-item");
    dishes.forEach(dish => {
      dish.classList.remove("item-bounce");
      void dish.offsetWidth;
      dish.classList.add("item-bounce");
    });

    if (currentStageIndex === unlockedStageIndex && unlockedStageIndex < STAGES.length - 1) {
      unlockedStageIndex++;
      localStorage.setItem("cafe_flex_unlocked", unlockedStageIndex);
      renderStageNav();
    }
  } else {
    stageAttemptsMap[currentStageIndex] = (stageAttemptsMap[currentStageIndex] || 0) + 1;
    localStorage.setItem("cafe_flex_attempts", JSON.stringify(stageAttemptsMap));
    attemptCountEl.textContent = stageAttemptsMap[currentStageIndex];
    updateStageScoreDisplay();

    feedbackMessage.textContent = "Not quite right yet! Order failed (-10 pts). Try again!";
    feedbackMessage.className = "feedback error";
    counterFrame.classList.remove("win-glow");

    gameContainer.classList.add("shake");
    setTimeout(() => gameContainer.classList.remove("shake"), 400);

    stageScoreBadge.classList.add("score-deduct");
    setTimeout(() => stageScoreBadge.classList.remove("score-deduct"), 400);
  }
}

// --- 8. Reset Stage ---
function resetCurrentStage() {
  const stage = STAGES[currentStageIndex];
  const selects = controlsContainer.querySelectorAll(".control-select");

  selects.forEach(select => {
    const prop = select.dataset.property;
    select.value = stage.defaults[prop];
  });

  applyUserStyles();
  feedbackMessage.textContent = "Stage reset to default values.";
  feedbackMessage.className = "feedback";
  counterFrame.classList.remove("win-glow");

  if (currentStageIndex >= unlockedStageIndex) {
    btnNext.classList.add("hidden");
  }
}

// --- 9. Advance Stage ---
function nextStage() {
  if (currentStageIndex < STAGES.length - 1) {
    currentStageIndex++;
    loadStage(currentStageIndex);
  } else {
    const total = Object.values(stageScoresMap).reduce((sum, val) => sum + val, 0);
    feedbackMessage.textContent = `🎉 Master Barista Achieved! Final Score: ${total} / 800!`;
    feedbackMessage.className = "feedback success";
    btnNext.classList.add("hidden");
  }
}

// Event Listeners
btnCheck.addEventListener("click", checkSolution);
btnReset.addEventListener("click", resetCurrentStage);
btnNext.addEventListener("click", nextStage);

// Start Game
loadStage(currentStageIndex);
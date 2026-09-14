# Café Flex ☕🧁

An interactive, responsive web game designed to learn and practice CSS Flexbox concepts.

🔗 **Live Demo:** [https://mayaycs.github.io/cafe-flexbox-game/](https://mayaycs.github.io/cafe-flexbox-game/)

---

## 📖 About The Project

**Café Flex** puts the player in the shoes of a busy café barista. Orders arrive at the counter, and players must arrange the dishes and beverages using CSS Flexbox properties to fulfill the orders correctly.

The project is built entirely with vanilla web technologies without any external frameworks or libraries, adhering to strict layout and responsiveness requirements.

---

## ✨ Features

- **8 Hand-Crafted Stages:** Covering a progressive learning curve from basic alignments to complex multi-property layouts.
- **Full Flexbox Mastery:**
  - `display: flex`
  - `flex-direction` (`row`, `column`)
  - `justify-content` (`flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly`)
  - `align-items` (`flex-start`, `center`, `flex-end`)
  - `flex-wrap` (`nowrap`, `wrap`)
- **Fixed-Size Board Architecture:** Preserves layout consistency (340x340px) across all viewports and mobile devices.
- **Scoring System:** 100 base points per stage, deducting 10 points per incorrect attempt (min 20 pts).
- **Persistent Progress:** Saves completed stages, high scores, and attempts locally via `localStorage`.
- **Stage Navigation:** Allows jumping back to review any previously unlocked stage.
- **Visual Feedback & Animations:** Error shaking, victory item bouncing, glow effects, and a victory modal upon completing service.
- **Reset Capability:** Individual stage reset to default values and a full game reset button.

---

## 🛠️ Built With

- **HTML5:** Semantic scaffolding and DOM layout.
- **CSS3:** Flexbox layouts, custom variables, keyframe animations, and media queries.
- **Vanilla JavaScript (ES6+):** Dynamic DOM updates, game logic validation, score calculation, and state persistence.

---

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone [https://github.com/mayaycs/cafe-flexbox-game.git](https://github.com/mayaycs/cafe-flexbox-game.git)
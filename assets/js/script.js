// =========================================================
// CALVORA — GLOBAL JAVASCRIPT
// =========================================================


// =========================================================
// MARGIN CALCULATOR
// =========================================================

function calculate() {

  const costInput = document.getElementById("cost");
  const priceInput = document.getElementById("price");

  if (!costInput || !priceInput) {
    return;
  }

  const cost = parseFloat(costInput.value);
  const price = parseFloat(priceInput.value);

  if (
    isNaN(cost) ||
    isNaN(price) ||
    cost <= 0 ||
    price <= 0
  ) {
    alert("Please enter valid numbers.");
    return;
  }

  const profit = price - cost;
  const margin = (profit / price) * 100;
  const markup = (profit / cost) * 100;

  const profitEl = document.getElementById("profit");
  const marginEl = document.getElementById("margin");
  const markupEl = document.getElementById("markup");
  const resultEl = document.getElementById("result");

  if (!profitEl || !marginEl || !markupEl || !resultEl) {
    return;
  }

  profitEl.className = "value";
  marginEl.className = "value";
  markupEl.className = "value";

  if (profit > 0) {

    profitEl.classList.add("profit");
    marginEl.classList.add("profit");
    markupEl.classList.add("profit");

  } else if (profit < 0) {

    profitEl.classList.add("loss");
    marginEl.classList.add("loss");
    markupEl.classList.add("loss");

  } else {

    profitEl.classList.add("neutral");
    marginEl.classList.add("neutral");
    markupEl.classList.add("neutral");

  }

  profitEl.textContent = profit.toFixed(2);
  marginEl.textContent = margin.toFixed(2) + "%";
  markupEl.textContent = markup.toFixed(2) + "%";

  resultEl.classList.add("show");
}


// =========================================================
// HOMEPAGE CALCULATOR SEARCH
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

  const searchInput = document.getElementById("calculatorSearch");

  if (!searchInput) {
    return;
  }

  const calculatorCards =
    document.querySelectorAll(".calculator-card");

  searchInput.addEventListener("input", function () {

    const searchTerm =
      searchInput.value.toLowerCase().trim();

    calculatorCards.forEach(function (card) {

      const cardText =
        card.textContent.toLowerCase();

      if (cardText.includes(searchTerm)) {

        card.style.display = "";

      } else {

        card.style.display = "none";

      }

    });

  });

});
/* =========================================
   CALVORA — CALCULATOR SEARCH
========================================= */

const calculatorSearch = document.getElementById("calculatorSearch");

if (calculatorSearch) {

  calculatorSearch.addEventListener("input", function () {

    const query = this.value.toLowerCase().trim();

    const cards = document.querySelectorAll(
      ".calculators-page .calculator-card"
    );

    cards.forEach(function (card) {

      const text = card.textContent.toLowerCase();

      if (text.includes(query)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }

    });

  });

}
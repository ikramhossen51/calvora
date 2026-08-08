// =========================================================
// CALVORA — GLOBAL JAVASCRIPT
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

  // =======================================================
  // HOMEPAGE CALCULATOR SEARCH
  // =======================================================

  const homepageSearch =
    document.getElementById("calculatorSearch");

  if (homepageSearch) {

    const homepageCards =
      document.querySelectorAll(
        "#popular .calculator-card"
      );

    homepageSearch.addEventListener("input", function () {

      const searchTerm =
        this.value.toLowerCase().trim();

      homepageCards.forEach(function (card) {

        const cardText =
          card.textContent.toLowerCase();

        if (cardText.includes(searchTerm)) {

          card.style.display = "";

        } else {

          card.style.display = "none";

        }

      });

    });

  }


  // =======================================================
  // CALCULATORS PAGE SEARCH
  // =======================================================

  const calculatorsPageSearch =
    document.getElementById("calculatorSearch");

  if (
    calculatorsPageSearch &&
    document.querySelector(".calculators-page")
  ) {

    const calculatorCards =
      document.querySelectorAll(
        ".calculators-page .calculator-card"
      );

    calculatorsPageSearch.addEventListener(
      "input",
      function () {

        const searchTerm =
          this.value.toLowerCase().trim();

        calculatorCards.forEach(function (card) {

          const cardText =
            card.textContent.toLowerCase();

          if (cardText.includes(searchTerm)) {

            card.style.display = "";

          } else {

            card.style.display = "none";

          }

        });

      }
    );

  }

});
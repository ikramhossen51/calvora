// =========================================================
// CALVORA — MARGIN CALCULATOR
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

  // =======================================================
  // ELEMENTS
  // =======================================================

  const calculateButton =
    document.getElementById("calculateMargin");

  const resetButton =
    document.getElementById("resetMargin");

  const costInput =
    document.getElementById("cost");

  const priceInput =
    document.getElementById("price");

  const results =
    document.getElementById("marginResults");

  const error =
    document.getElementById("marginError");

  const profitResult =
    document.getElementById("profitResult");

  const marginResult =
    document.getElementById("marginResult");

  const markupResult =
    document.getElementById("markupResult");


  // =======================================================
  // SAFETY CHECK
  // =======================================================

  if (
    !calculateButton ||
    !resetButton ||
    !costInput ||
    !priceInput ||
    !results ||
    !error ||
    !profitResult ||
    !marginResult ||
    !markupResult
  ) {
    return;
  }


  // =======================================================
  // CALCULATE MARGIN
  // =======================================================

  calculateButton.addEventListener(
    "click",
    function () {

      const cost =
        parseFloat(costInput.value);

      const price =
        parseFloat(priceInput.value);


      // ---------------------------------------------------
      // VALIDATION
      // ---------------------------------------------------

      if (
        isNaN(cost) ||
        isNaN(price) ||
        cost <= 0 ||
        price <= 0
      ) {

        results.hidden = true;
        error.hidden = false;

        return;
      }


      // ---------------------------------------------------
      // HIDE ERROR
      // ---------------------------------------------------

      error.hidden = true;


      // ---------------------------------------------------
      // CALCULATIONS
      // ---------------------------------------------------

      const profit =
        price - cost;

      const margin =
        (profit / price) * 100;

      const markup =
        (profit / cost) * 100;


      // ---------------------------------------------------
      // DISPLAY RESULTS
      // ---------------------------------------------------

      profitResult.textContent =
        profit.toFixed(2);

      marginResult.textContent =
        margin.toFixed(2) + "%";

      markupResult.textContent =
        markup.toFixed(2) + "%";


      // ---------------------------------------------------
      // RESULT CARDS
      // ---------------------------------------------------

      const resultCards =
        document.querySelectorAll(
          ".margin-results .result-card"
        );


      resultCards.forEach(function (card) {

        card.classList.remove(
          "profit",
          "loss",
          "neutral"
        );

      });


      // ---------------------------------------------------
      // PROFIT / LOSS / NEUTRAL
      // ---------------------------------------------------

      let resultClass = "neutral";

      if (profit > 0) {

        resultClass = "profit";

      } else if (profit < 0) {

        resultClass = "loss";

      }


      resultCards.forEach(function (card) {

        card.classList.add(resultClass);

      });


      // ---------------------------------------------------
      // SHOW RESULTS
      // ---------------------------------------------------

      results.hidden = false;

    }
  );


  // =======================================================
  // RESET CALCULATOR
  // =======================================================

  resetButton.addEventListener(
    "click",
    function () {

      costInput.value = "";
      priceInput.value = "";

      results.hidden = true;
      error.hidden = true;

      profitResult.textContent = "—";
      marginResult.textContent = "—";
      markupResult.textContent = "—";


      // Remove old result classes

      const resultCards =
        document.querySelectorAll(
          ".margin-results .result-card"
        );


      resultCards.forEach(function (card) {

        card.classList.remove(
          "profit",
          "loss",
          "neutral"
        );

      });

    }
  );

});
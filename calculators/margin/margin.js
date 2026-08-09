// =========================================================
// CALVORA — MARGIN CALCULATOR
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

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

    console.error(
      "Calvora Margin Calculator: Missing HTML element."
    );

    return;
  }


  // =======================================================
  // FORMAT NUMBER
  // =======================================================

  function formatNumber(number) {

    if (!Number.isFinite(number)) {
      return "0.00";
    }

    return Number(number.toFixed(2)).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

  }


  // =======================================================
  // CALCULATE MARGIN
  // =======================================================

  calculateButton.addEventListener("click", function () {

    error.hidden = true;
    results.hidden = true;


    const cost =
      parseFloat(costInput.value);

    const price =
      parseFloat(priceInput.value);


    // =====================================================
    // VALIDATION
    // =====================================================

    if (
      !Number.isFinite(cost) ||
      !Number.isFinite(price) ||
      cost < 0 ||
      price < 0
    ) {

      error.textContent =
        "Please enter valid positive numbers for both prices.";

      error.hidden = false;

      return;
    }


    if (cost === 0 && price === 0) {

      error.textContent =
        "Please enter a value greater than zero.";

      error.hidden = false;

      return;
    }


    if (price === 0) {

      error.textContent =
        "Selling Price must be greater than zero.";

      error.hidden = false;

      return;
    }


    // =====================================================
    // CALCULATIONS
    // =====================================================

    const profit =
      price - cost;

    const margin =
      (profit / price) * 100;

    let markup = 0;

    if (cost !== 0) {

      markup =
        (profit / cost) * 100;

    }


    // =====================================================
    // DISPLAY RESULTS
    // =====================================================

    profitResult.textContent =
      "$" + formatNumber(profit);

    marginResult.textContent =
      formatNumber(margin) + "%";

    markupResult.textContent =
      formatNumber(markup) + "%";


    // =====================================================
    // RESULT CARD STATUS
    // =====================================================

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


    let resultClass =
      "neutral";


    if (profit > 0) {

      resultClass =
        "profit";

    }

    else if (profit < 0) {

      resultClass =
        "loss";

    }


    resultCards.forEach(function (card) {

      card.classList.add(resultClass);

    });


    // =====================================================
    // SHOW RESULTS
    // =====================================================

    results.hidden = false;

  });


  // =======================================================
  // RESET
  // =======================================================

  resetButton.addEventListener("click", function () {

    costInput.value = "";
    priceInput.value = "";

    results.hidden = true;
    error.hidden = true;

    error.textContent = "";

    profitResult.textContent = "—";
    marginResult.textContent = "—";
    markupResult.textContent = "—";


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

  });


  // =======================================================
  // ENTER KEY SUPPORT
  // =======================================================

  costInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

      calculateButton.click();

    }

  });


  priceInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

      calculateButton.click();

    }

  });

});
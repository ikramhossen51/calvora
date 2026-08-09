// =========================================================
// CALVORA — MARGIN CALCULATOR
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

  // =======================================================
  // ELEMENTS
  // =======================================================

  const costInput =
    document.getElementById("cost");

  const priceInput =
    document.getElementById("price");

  const calculateButton =
    document.getElementById("calculateMargin");

  const resetButton =
    document.getElementById("resetMargin");

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
    !costInput ||
    !priceInput ||
    !calculateButton ||
    !resetButton ||
    !results ||
    !error ||
    !profitResult ||
    !marginResult ||
    !markupResult
  ) {

    console.error(
      "Calvora Margin Calculator: Required HTML element is missing."
    );

    return;
  }


  // =======================================================
  // RESULT CARDS
  // =======================================================

  const resultCards =
    results.querySelectorAll(".result-card");


  // =======================================================
  // FORMAT MONEY
  // =======================================================

  function formatMoney(value) {

    return Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

  }


  // =======================================================
  // FORMAT PERCENT
  // =======================================================

  function formatPercent(value) {

    return Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) + "%";

  }


  // =======================================================
  // CLEAR CARD STATUS
  // =======================================================

  function clearCardStatus() {

    resultCards.forEach(function (card) {

      card.classList.remove(
        "profit",
        "loss",
        "neutral"
      );

    });

  }


  // =======================================================
  // CALCULATE MARGIN
  // =======================================================

  function calculateMargin() {

    const cost =
      parseFloat(costInput.value);

    const price =
      parseFloat(priceInput.value);


    // -----------------------------------------------------
    // VALIDATION
    // -----------------------------------------------------

    if (
      !Number.isFinite(cost) ||
      !Number.isFinite(price) ||
      cost < 0 ||
      price <= 0
    ) {

      results.hidden = true;

      error.textContent =
        "Please enter a valid cost price and selling price. Selling price must be greater than 0.";

      error.hidden = false;

      return;
    }


    // -----------------------------------------------------
    // CALCULATIONS
    // -----------------------------------------------------

    const profit =
      price - cost;


    const margin =
      (profit / price) * 100;


    const markup =
      cost === 0
        ? 0
        : (profit / cost) * 100;


    // -----------------------------------------------------
    // DISPLAY
    // -----------------------------------------------------

    profitResult.textContent =
      formatMoney(profit);

    marginResult.textContent =
      formatPercent(margin);

    markupResult.textContent =
      formatPercent(markup);


    // -----------------------------------------------------
    // RESULT STATUS
    // -----------------------------------------------------

    clearCardStatus();


    let status =
      "neutral";


    if (profit > 0) {

      status =
        "profit";

    }

    else if (profit < 0) {

      status =
        "loss";

    }


    resultCards.forEach(function (card) {

      card.classList.add(status);

    });


    // -----------------------------------------------------
    // SHOW RESULTS
    // -----------------------------------------------------

    error.hidden = true;

    results.hidden = false;


    // Scroll result into view on small screens

    if (
      window.innerWidth < 600
    ) {

      results.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });

    }

  }


  // =======================================================
  // RESET
  // =======================================================

  function resetCalculator() {

    costInput.value = "";

    priceInput.value = "";

    profitResult.textContent =
      "—";

    marginResult.textContent =
      "—";

    markupResult.textContent =
      "—";

    results.hidden =
      true;

    error.hidden =
      true;

    error.textContent =
      "";

    clearCardStatus();

    costInput.focus();

  }


  // =======================================================
  // CALCULATE BUTTON
  // =======================================================

  calculateButton.addEventListener(
    "click",
    calculateMargin
  );


  // =======================================================
  // RESET BUTTON
  // =======================================================

  resetButton.addEventListener(
    "click",
    resetCalculator
  );


  // =======================================================
  // ENTER KEY
  // =======================================================

  costInput.addEventListener(
    "keydown",
    function (event) {

      if (event.key === "Enter") {

        event.preventDefault();

        calculateMargin();

      }

    }
  );


  priceInput.addEventListener(
    "keydown",
    function (event) {

      if (event.key === "Enter") {

        event.preventDefault();

        calculateMargin();

      }

    }
  );


  // =======================================================
  // INITIAL STATE
  // =======================================================

  results.hidden =
    true;

  error.hidden =
    true;

  clearCardStatus();

});
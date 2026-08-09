// =========================================================
// CALVORA — MARGIN CALCULATOR
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

  // -------------------------------------------------------
  // ELEMENTS
  // -------------------------------------------------------

  const costInput = document.getElementById("cost");
  const priceInput = document.getElementById("price");

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


  // -------------------------------------------------------
  // SAFETY CHECK
  // -------------------------------------------------------

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
      "Calvora Margin Calculator: Required element missing."
    );

    return;
  }


  // -------------------------------------------------------
  // CALCULATE
  // -------------------------------------------------------

  calculateButton.addEventListener("click", function () {

    const cost = parseFloat(costInput.value);
    const price = parseFloat(priceInput.value);


    // Validation

    if (
      !Number.isFinite(cost) ||
      !Number.isFinite(price) ||
      cost < 0 ||
      price <= 0
    ) {

      results.hidden = true;

      error.textContent =
        "Please enter a valid cost price and selling price.";

      error.hidden = false;

      return;
    }


    // Calculation

    const profit = price - cost;

    const margin = (profit / price) * 100;

    const markup =
      cost === 0
        ? 0
        : (profit / cost) * 100;


    // Display

    profitResult.textContent =
      formatMoney(profit);

    marginResult.textContent =
      formatPercent(margin);

    markupResult.textContent =
      formatPercent(markup);


    // Result card status

    const cards =
      document.querySelectorAll(
        ".margin-results .result-card"
      );


    cards.forEach(function (card) {

      card.classList.remove(
        "profit",
        "loss",
        "neutral"
      );

    });


    let status = "neutral";

    if (profit > 0) {

      status = "profit";

    } else if (profit < 0) {

      status = "loss";

    }


    cards.forEach(function (card) {

      card.classList.add(status);

    });


    // Show result

    error.hidden = true;
    results.hidden = false;

  });


  // -------------------------------------------------------
  // RESET
  // -------------------------------------------------------

  resetButton.addEventListener("click", function () {

    costInput.value = "";
    priceInput.value = "";

    profitResult.textContent = "—";
    marginResult.textContent = "—";
    markupResult.textContent = "—";

    results.hidden = true;
    error.hidden = true;


    const cards =
      document.querySelectorAll(
        ".margin-results .result-card"
      );


    cards.forEach(function (card) {

      card.classList.remove(
        "profit",
        "loss",
        "neutral"
      );

    });

  });


  // -------------------------------------------------------
  // ENTER KEY SUPPORT
  // -------------------------------------------------------

  [costInput, priceInput].forEach(function (input) {

    input.addEventListener("keydown", function (event) {

      if (event.key === "Enter") {

        calculateButton.click();

      }

    });

  });


  // -------------------------------------------------------
  // FORMATTING
  // -------------------------------------------------------

  function formatMoney(value) {

    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

  }


  function formatPercent(value) {

    return (
      value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }) + "%"
    );

  }

});
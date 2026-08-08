/* =========================================
   CALVORA — MARGIN CALCULATOR
========================================= */

const calculateMarginButton =
  document.getElementById("calculateMargin");

const resetMarginButton =
  document.getElementById("resetMargin");

if (calculateMarginButton) {

  calculateMarginButton.addEventListener("click", function () {

    const costInput =
      document.getElementById("cost");

    const priceInput =
      document.getElementById("price");

    const cost =
      parseFloat(costInput.value);

    const price =
      parseFloat(priceInput.value);

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


    /* Validation */

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


    /* Hide error */

    error.hidden = true;


    /* Calculations */

    const profit = price - cost;

    const margin =
      (profit / price) * 100;

    const markup =
      (profit / cost) * 100;


    /* Display results */

    profitResult.textContent =
      profit.toFixed(2);

    marginResult.textContent =
      margin.toFixed(2) + "%";

    markupResult.textContent =
      markup.toFixed(2) + "%";


    /* Result cards */

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


    if (profit > 0) {

      resultCards.forEach(function (card) {

        card.classList.add("profit");

      });

    } else if (profit < 0) {

      resultCards.forEach(function (card) {

        card.classList.add("loss");

      });

    } else {

      resultCards.forEach(function (card) {

        card.classList.add("neutral");

      });

    }


    /* Show results */

    results.hidden = false;

  });

}


/* =========================================
   RESET
========================================= */

if (resetMarginButton) {

  resetMarginButton.addEventListener("click", function () {

    document.getElementById("cost").value = "";

    document.getElementById("price").value = "";

    document.getElementById("marginResults").hidden = true;

    document.getElementById("marginError").hidden = true;

    document.getElementById("profitResult").textContent = "—";

    document.getElementById("marginResult").textContent = "—";

    document.getElementById("markupResult").textContent = "—";

  });

}

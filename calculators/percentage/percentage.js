// =========================================================
// CALVORA — PERCENTAGE CALCULATOR
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

  // =======================================================
  // ELEMENTS
  // =======================================================

  const typeButtons = document.querySelectorAll(
    ".percentage-type-button"
  );

  const calculateButton =
    document.getElementById("calculatePercentage");

  const resetButton =
    document.getElementById("resetPercentage");

  const percentageInput =
    document.getElementById("percentageValue");

  const baseInput =
    document.getElementById("baseValue");

  const secondInput =
    document.getElementById("secondValue");

  const secondValueGroup =
    document.getElementById("secondValueGroup");

  const results =
    document.getElementById("percentageResults");

  const error =
    document.getElementById("percentageError");

  const result =
    document.getElementById("percentageResult");

  const calculation =
    document.getElementById("percentageCalculation");


  // =======================================================
  // SAFETY CHECK
  // =======================================================

  if (
    !calculateButton ||
    !resetButton ||
    !percentageInput ||
    !baseInput ||
    !secondInput ||
    !secondValueGroup ||
    !results ||
    !error ||
    !result ||
    !calculation
  ) {
    console.error(
      "Calvora Percentage Calculator: Required element missing."
    );

    return;
  }


  // =======================================================
  // CURRENT CALCULATION TYPE
  // =======================================================

  let currentType = "percent-of";


  // =======================================================
  // UPDATE INPUTS
  // =======================================================

  function updateInputFields() {

    error.hidden = true;
    results.hidden = true;

    if (currentType === "percent-of") {

      /*
       * What is X% of Y?
       *
       * Percentage = X
       * Number     = Y
       */

      percentageInput.parentElement.parentElement.style.display =
        "block";

      baseInput.parentElement.parentElement.style.display =
        "block";

      secondValueGroup.style.display = "none";

    }


    else if (currentType === "what-percent") {

      /*
       * X is what % of Y?
       *
       * X = first number
       * Y = second number
       */

      percentageInput.parentElement.parentElement.style.display =
        "block";

      baseInput.parentElement.parentElement.style.display =
        "block";

      secondValueGroup.style.display = "none";


      /*
       * Change labels
       */

      const percentageLabel =
        percentageInput
          .parentElement
          .parentElement
          .querySelector("label");

      const baseLabel =
        baseInput
          .parentElement
          .parentElement
          .querySelector("label");

      if (percentageLabel) {
        percentageLabel.textContent = "Part";
      }

      if (baseLabel) {
        baseLabel.textContent = "Whole";
      }

    }


    else if (currentType === "percent-change") {

      /*
       * Percentage Change
       *
       * First Number
       * Second Number
       */

      percentageInput.parentElement.parentElement.style.display =
        "block";

      baseInput.parentElement.parentElement.style.display =
        "block";

      secondValueGroup.style.display = "none";


      /*
       * Change labels
       */

      const percentageLabel =
        percentageInput
          .parentElement
          .parentElement
          .querySelector("label");

      const baseLabel =
        baseInput
          .parentElement
          .parentElement
          .querySelector("label");

      if (percentageLabel) {
        percentageLabel.textContent = "Original Value";
      }

      if (baseLabel) {
        baseLabel.textContent = "New Value";
      }

    }


    /*
     * Restore original labels for first mode
     */

    if (currentType === "percent-of") {

      const percentageLabel =
        percentageInput
          .parentElement
          .parentElement
          .querySelector("label");

      const baseLabel =
        baseInput
          .parentElement
          .parentElement
          .querySelector("label");

      if (percentageLabel) {
        percentageLabel.textContent = "Percentage";
      }

      if (baseLabel) {
        baseLabel.textContent = "Number";
      }

    }

  }


  // =======================================================
  // TYPE BUTTONS
  // =======================================================

  typeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      typeButtons.forEach(function (btn) {

        btn.classList.remove("active");

      });


      button.classList.add("active");


      currentType =
        button.getAttribute("data-type") ||
        "percent-of";


      /*
       * Clear previous values
       */

      percentageInput.value = "";
      baseInput.value = "";
      secondInput.value = "";


      result.textContent = "—";
      calculation.textContent = "—";


      updateInputFields();

    });

  });


  // =======================================================
  // CALCULATE
  // =======================================================

  calculateButton.addEventListener(
    "click",
    function () {

      const first =
        parseFloat(percentageInput.value);

      const second =
        parseFloat(baseInput.value);


      // ---------------------------------------------------
      // VALIDATION
      // ---------------------------------------------------

      if (
        isNaN(first) ||
        isNaN(second)
      ) {

        results.hidden = true;
        error.textContent =
          "Please enter valid numbers.";

        error.hidden = false;

        return;
      }


      // ===================================================
      // WHAT IS X% OF Y?
      // ===================================================

      if (currentType === "percent-of") {

        const answer =
          (first / 100) * second;


        result.textContent =
          formatNumber(answer);


        calculation.textContent =
          "(" +
          formatNumber(first) +
          " ÷ 100) × " +
          formatNumber(second) +
          " = " +
          formatNumber(answer);


        error.hidden = true;
        results.hidden = false;

        return;
      }


      // ===================================================
      // X IS WHAT % OF Y?
      // ===================================================

      if (currentType === "what-percent") {

        if (second === 0) {

          results.hidden = true;

          error.textContent =
            "The whole number cannot be zero.";

          error.hidden = false;

          return;
        }


        const answer =
          (first / second) * 100;


        result.textContent =
          formatNumber(answer) + "%";


        calculation.textContent =
          "(" +
          formatNumber(first) +
          " ÷ " +
          formatNumber(second) +
          ") × 100 = " +
          formatNumber(answer) +
          "%";


        error.hidden = true;
        results.hidden = false;

        return;
      }


      // ===================================================
      // PERCENTAGE CHANGE
      // ===================================================

      if (currentType === "percent-change") {

        if (first === 0) {

          results.hidden = true;

          error.textContent =
            "The original value cannot be zero.";

          error.hidden = false;

          return;
        }


        const change =
          ((second - first) / Math.abs(first)) * 100;


        result.textContent =
          formatNumber(change) + "%";


        calculation.textContent =
          "((" +
          formatNumber(second) +
          " − " +
          formatNumber(first) +
          ") ÷ " +
          formatNumber(first) +
          ") × 100 = " +
          formatNumber(change) +
          "%";


        error.hidden = true;
        results.hidden = false;

      }

    }
  );


  // =======================================================
  // RESET
  // =======================================================

  resetButton.addEventListener(
    "click",
    function () {

      percentageInput.value = "";
      baseInput.value = "";
      secondInput.value = "";


      result.textContent = "—";
      calculation.textContent = "—";


      results.hidden = true;
      error.hidden = true;


      /*
       * Return to first calculation type
       */

      currentType = "percent-of";


      typeButtons.forEach(function (button) {

        button.classList.remove("active");

      });


      const firstButton =
        document.querySelector(
          '.percentage-type-button[data-type="percent-of"]'
        );


      if (firstButton) {
        firstButton.classList.add("active");
      }


      updateInputFields();

    }
  );


  // =======================================================
  // FORMAT NUMBER
  // =======================================================

  function formatNumber(number) {

    if (!Number.isFinite(number)) {
      return "—";
    }


    return number.toLocaleString(
      "en-US",
      {
        maximumFractionDigits: 2
      }
    );

  }


  // =======================================================
  // INITIALIZE
  // =======================================================

  updateInputFields();

});
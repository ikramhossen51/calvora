// =========================================================
// CALVORA — PERCENTAGE CALCULATOR
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

  const calculateButton = document.getElementById("calculatePercentage");
  const resetButton = document.getElementById("resetPercentage");

  const percentageInput = document.getElementById("percentageValue");
  const baseInput = document.getElementById("baseValue");
  const secondInput = document.getElementById("secondValue");

  const secondValueGroup = document.getElementById("secondValueGroup");

  const firstLabel = document.getElementById("firstLabel");
  const secondLabel = document.getElementById("secondLabel");
  const firstPrefix = document.getElementById("firstPrefix");

  const error = document.getElementById("percentageError");

  const results = document.getElementById("percentageResults");
  const result = document.getElementById("percentageResult");
  const calculation = document.getElementById("percentageCalculation");

  const typeButtons =
    document.querySelectorAll(".percentage-type-button");


  // ========================================================
  // SAFETY CHECK
  // ========================================================

  if (
    !calculateButton ||
    !resetButton ||
    !percentageInput ||
    !baseInput ||
    !secondInput ||
    !secondValueGroup ||
    !firstLabel ||
    !secondLabel ||
    !firstPrefix ||
    !error ||
    !results ||
    !result ||
    !calculation
  ) {

    console.error(
      "Calvora Percentage Calculator: Required HTML element missing."
    );

    return;
  }


  // ========================================================
  // CURRENT CALCULATOR TYPE
  // ========================================================

  let currentType = "percent-of";


  // ========================================================
  // FORMAT NUMBER
  // ========================================================

  function formatNumber(value) {

    if (!Number.isFinite(value)) {
      return "0";
    }

    return Number(value.toFixed(2)).toLocaleString("en-US");
  }


  // ========================================================
  // CLEAR RESULT
  // ========================================================

  function clearOutput() {

    error.hidden = true;
    error.textContent = "";

    results.hidden = true;

    result.textContent = "—";
    calculation.textContent = "—";
  }


  // ========================================================
  // UPDATE CALCULATOR TYPE
  // ========================================================

  function updateType() {

    clearOutput();

    percentageInput.value = "";
    baseInput.value = "";
    secondInput.value = "";


    // ------------------------------------------------------
    // WHAT IS X% OF Y?
    // ------------------------------------------------------

    if (currentType === "percent-of") {

      firstLabel.textContent = "Percentage";
      secondLabel.textContent = "Number";

      firstPrefix.textContent = "%";

      percentageInput.placeholder =
        "Enter percentage";

      baseInput.placeholder =
        "Enter number";

      percentageInput.disabled = false;
      baseInput.disabled = false;

      secondInput.disabled = true;

      secondValueGroup.hidden = true;
    }


    // ------------------------------------------------------
    // X IS WHAT % OF Y?
    // ------------------------------------------------------

    else if (currentType === "what-percent") {

      firstLabel.textContent = "Part";
      secondLabel.textContent = "Whole";

      firstPrefix.textContent = "#";

      percentageInput.placeholder =
        "Enter part";

      baseInput.placeholder =
        "Enter whole";

      percentageInput.disabled = false;
      baseInput.disabled = false;

      secondInput.disabled = true;

      secondValueGroup.hidden = true;
    }


    // ------------------------------------------------------
    // PERCENTAGE CHANGE
    // ------------------------------------------------------

    else if (currentType === "percent-change") {

      firstLabel.textContent = "Original Value";
      secondLabel.textContent = "New Value";

      firstPrefix.textContent = "#";

      percentageInput.placeholder =
        "Enter original value";

      baseInput.placeholder =
        "Enter new value";

      percentageInput.disabled = false;
      baseInput.disabled = false;

      secondInput.disabled = true;

      // Third input is not required
      secondValueGroup.hidden = true;
    }
  }


  // ========================================================
  // TYPE BUTTONS
  // ========================================================

  typeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      typeButtons.forEach(function (item) {

        item.classList.remove("active");

      });

      button.classList.add("active");

      currentType = button.dataset.type;

      updateType();
    });
  });


  // ========================================================
  // CALCULATE
  // ========================================================

  calculateButton.addEventListener("click", function () {

    clearOutput();


    // ======================================================
    // 1. WHAT IS X% OF Y?
    // ======================================================

    if (currentType === "percent-of") {

      const percentage =
        parseFloat(percentageInput.value);

      const number =
        parseFloat(baseInput.value);


      if (
        !Number.isFinite(percentage) ||
        !Number.isFinite(number)
      ) {

        error.textContent =
          "Please enter both numbers.";

        error.hidden = false;

        return;
      }


      const answer =
        (percentage / 100) * number;


      result.textContent =
        formatNumber(answer);


      calculation.textContent =
        `(${formatNumber(percentage)} ÷ 100) × ${formatNumber(number)} = ${formatNumber(answer)}`;


      results.hidden = false;

      return;
    }


    // ======================================================
    // 2. X IS WHAT % OF Y?
    // ======================================================

    if (currentType === "what-percent") {

      const part =
        parseFloat(percentageInput.value);

      const whole =
        parseFloat(baseInput.value);


      if (
        !Number.isFinite(part) ||
        !Number.isFinite(whole)
      ) {

        error.textContent =
          "Please enter both numbers.";

        error.hidden = false;

        return;
      }


      if (whole === 0) {

        error.textContent =
          "Whole cannot be zero.";

        error.hidden = false;

        return;
      }


      const answer =
        (part / whole) * 100;


      result.textContent =
        formatNumber(answer) + "%";


      calculation.textContent =
        `(${formatNumber(part)} ÷ ${formatNumber(whole)}) × 100 = ${formatNumber(answer)}%`;


      results.hidden = false;

      return;
    }


    // ======================================================
    // 3. PERCENTAGE CHANGE
    // ======================================================

    if (currentType === "percent-change") {

      const original =
        parseFloat(percentageInput.value);

      const newValue =
        parseFloat(baseInput.value);


      if (
        !Number.isFinite(original) ||
        !Number.isFinite(newValue)
      ) {

        error.textContent =
          "Please enter both numbers.";

        error.hidden = false;

        return;
      }


      if (original === 0) {

        error.textContent =
          "Original value cannot be zero.";

        error.hidden = false;

        return;
      }


      const change =
        ((newValue - original) / original) * 100;


      result.textContent =
        formatNumber(change) + "%";


      calculation.textContent =
        `((${formatNumber(newValue)} − ${formatNumber(original)}) ÷ ${formatNumber(original)}) × 100 = ${formatNumber(change)}%`;


      results.hidden = false;

      return;
    }

  });


  // ========================================================
  // RESET
  // ========================================================

  resetButton.addEventListener("click", function () {

    percentageInput.value = "";
    baseInput.value = "";
    secondInput.value = "";

    clearOutput();
  });


  // ========================================================
  // INITIAL STATE
  // ========================================================

  updateType();

});
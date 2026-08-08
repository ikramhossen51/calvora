// =========================================================
// CALVORA — PERCENTAGE CALCULATOR
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

  // =======================================================
  // ELEMENTS
  // =======================================================

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

  const typeButtons =
    document.querySelectorAll(".percentage-type-button");


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
      "Percentage Calculator: Required HTML element not found."
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

  function updateInputs() {

    // -----------------------------------------------------
    // WHAT IS X% OF Y?
    // -----------------------------------------------------

    if (currentType === "percent-of") {

      percentageInput.parentElement.parentElement
        .querySelector("label").textContent =
        "Percentage";

      baseInput.parentElement.parentElement
        .querySelector("label").textContent =
        "Number";

      percentageInput.placeholder =
        "Enter percentage";

      baseInput.placeholder =
        "Enter number";

      secondValueGroup.style.display = "none";

    }


    // -----------------------------------------------------
    // X IS WHAT % OF Y?
    // -----------------------------------------------------

    else if (currentType === "what-percent") {

      percentageInput.parentElement.parentElement
        .querySelector("label").textContent =
        "Part";

      baseInput.parentElement.parentElement
        .querySelector("label").textContent =
        "Whole";

      percentageInput.placeholder =
        "Enter part";

      baseInput.placeholder =
        "Enter whole";

      secondValueGroup.style.display = "none";

    }


    // -----------------------------------------------------
    // PERCENTAGE CHANGE
    // -----------------------------------------------------

    else if (currentType === "percent-change") {

      percentageInput.parentElement.parentElement
        .querySelector("label").textContent =
        "Original Value";

      baseInput.parentElement.parentElement
        .querySelector("label").textContent =
        "New Value";

      percentageInput.placeholder =
        "Enter original value";

      baseInput.placeholder =
        "Enter new value";

      secondValueGroup.style.display = "none";

    }

  }


  // =======================================================
  // TYPE BUTTONS
  // =======================================================

  typeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      // Remove active state
      typeButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      // Add active state
      button.classList.add("active");

      // Update type
      currentType =
        button.dataset.type;

      // Clear previous result
      results.hidden = true;
      error.hidden = true;

      result.textContent = "—";
      calculation.textContent = "—";

      // Update inputs
      updateInputs();

    });

  });


  // =======================================================
  // CALCULATE
  // =======================================================

  calculateButton.addEventListener("click", function () {

    const firstValue =
      parseFloat(percentageInput.value);

    const secondValue =
      parseFloat(baseInput.value);


    // -----------------------------------------------------
    // VALIDATION
    // -----------------------------------------------------

    if (
      !Number.isFinite(firstValue) ||
      !Number.isFinite(secondValue)
    ) {

      results.hidden = true;
      error.hidden = false;

      error.textContent =
        "Please enter valid numbers.";

      return;
    }


    // =====================================================
    // WHAT IS X% OF Y?
    // =====================================================

    if (currentType === "percent-of") {

      const percentage =
        firstValue;

      const number =
        secondValue;

      const answer =
        (percentage / 100) * number;


      result.textContent =
        formatNumber(answer);

      calculation.textContent =
        formatNumber(percentage) +
        "% × " +
        formatNumber(number) +
        " = " +
        formatNumber(answer);

    }


    // =====================================================
    // X IS WHAT % OF Y?
    // =====================================================

    else if (currentType === "what-percent") {

      const part =
        firstValue;

      const whole =
        secondValue;


      // Cannot divide by zero

      if (whole === 0) {

        results.hidden = true;
        error.hidden = false;

        error.textContent =
          "The whole value cannot be zero.";

        return;
      }


      const answer =
        (part / whole) * 100;


      result.textContent =
        formatNumber(answer) + "%";

      calculation.textContent =
        "(" +
        formatNumber(part) +
        " ÷ " +
        formatNumber(whole) +
        ") × 100 = " +
        formatNumber(answer) +
        "%";

    }


    // =====================================================
    // PERCENTAGE CHANGE
    // =====================================================

    else if (currentType === "percent-change") {

      const original =
        firstValue;

      const newValue =
        secondValue;


      // Original cannot be zero

      if (original === 0) {

        results.hidden = true;
        error.hidden = false;

        error.textContent =
          "The original value cannot be zero.";

        return;
      }


      const change =
        ((newValue - original) / original) * 100;


      result.textContent =
        formatNumber(change) + "%";


      calculation.textContent =
        "((" +
        formatNumber(newValue) +
        " − " +
        formatNumber(original) +
        ") ÷ " +
        formatNumber(original) +
        ") × 100 = " +
        formatNumber(change) +
        "%";

    }


    // =====================================================
    // SHOW RESULT
    // =====================================================

    error.hidden = true;
    results.hidden = false;

  });


  // =======================================================
  // RESET
  // =======================================================

  resetButton.addEventListener("click", function () {

    percentageInput.value = "";
    baseInput.value = "";
    secondInput.value = "";

    results.hidden = true;
    error.hidden = true;

    result.textContent = "—";
    calculation.textContent = "—";

    error.textContent =
      "Please enter valid numbers.";


    // Reset calculation type

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


    updateInputs();

  });


  // =======================================================
  // NUMBER FORMATTER
  // =======================================================

  function formatNumber(value) {

    if (!Number.isFinite(value)) {
      return "0";
    }


    // Avoid unnecessary decimal zeros

    return Number(
      value.toFixed(2)
    ).toLocaleString("en-US", {
      maximumFractionDigits: 2
    });

  }


  // =======================================================
  // INITIALIZE
  // =======================================================

  updateInputs();

});
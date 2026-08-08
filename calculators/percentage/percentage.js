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

  const percentageValue =
    document.getElementById("percentageValue");

  const baseValue =
    document.getElementById("baseValue");

  const secondValue =
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
    !percentageValue ||
    !baseValue ||
    !secondValue ||
    !secondValueGroup ||
    !results ||
    !error ||
    !result ||
    !calculation
  ) {
    console.error(
      "Calvora Percentage Calculator: Required elements not found."
    );

    return;
  }


  // =======================================================
  // CURRENT CALCULATION TYPE
  // =======================================================

  let currentType = "percent-of";


  // =======================================================
  // HELPER — FORMAT NUMBER
  // =======================================================

  function formatNumber(number) {

    if (!Number.isFinite(number)) {
      return "—";
    }

    return Number(
      number.toFixed(2)
    ).toLocaleString("en-US", {
      maximumFractionDigits: 2
    });

  }


  // =======================================================
  // UPDATE INPUT LABELS
  // =======================================================

  function updateInputs() {

    const percentageLabel =
      document.querySelector(
        'label[for="percentageValue"]'
      );

    const baseLabel =
      document.querySelector(
        'label[for="baseValue"]'
      );

    const secondLabel =
      document.querySelector(
        'label[for="secondValue"]'
      );


    const percentagePrefix =
      percentageValue
        .closest(".input-wrapper")
        ?.querySelector(".input-prefix");

    const basePrefix =
      baseValue
        .closest(".input-wrapper")
        ?.querySelector(".input-prefix");

    const secondPrefix =
      secondValue
        .closest(".input-wrapper")
        ?.querySelector(".input-prefix");


    // -----------------------------------------------------
    // WHAT IS X% OF Y?
    // -----------------------------------------------------

    if (currentType === "percent-of") {

      if (percentageLabel) {
        percentageLabel.textContent =
          "Percentage";
      }

      if (baseLabel) {
        baseLabel.textContent =
          "Number";
      }

      if (secondLabel) {
        secondLabel.textContent =
          "Second Number";
      }

      if (percentageValue) {
        percentageValue.placeholder =
          "Enter percentage";
      }

      if (baseValue) {
        baseValue.placeholder =
          "Enter number";
      }

      if (secondValue) {
        secondValue.placeholder =
          "Not required";
      }

      if (percentagePrefix) {
        percentagePrefix.textContent =
          "%";
      }

      if (basePrefix) {
        basePrefix.textContent =
          "#";
      }

      if (secondPrefix) {
        secondPrefix.textContent =
          "#";
      }

      secondValueGroup.style.display =
        "none";

    }


    // -----------------------------------------------------
    // X IS WHAT % OF Y?
    // -----------------------------------------------------

    else if (currentType === "what-percent") {

      if (percentageLabel) {
        percentageLabel.textContent =
          "Part";
      }

      if (baseLabel) {
        baseLabel.textContent =
          "Whole";
      }

      if (percentageValue) {
        percentageValue.placeholder =
          "Enter part";
      }

      if (baseValue) {
        baseValue.placeholder =
          "Enter whole";
      }

      if (percentagePrefix) {
        percentagePrefix.textContent =
          "#";
      }

      if (basePrefix) {
        basePrefix.textContent =
          "#";
      }

      secondValueGroup.style.display =
        "none";

    }


    // -----------------------------------------------------
    // PERCENTAGE CHANGE
    // -----------------------------------------------------

    else if (currentType === "percent-change") {

      if (percentageLabel) {
        percentageLabel.textContent =
          "Original Value";
      }

      if (baseLabel) {
        baseLabel.textContent =
          "New Value";
      }

      if (percentageValue) {
        percentageValue.placeholder =
          "Enter original value";
      }

      if (baseValue) {
        baseValue.placeholder =
          "Enter new value";
      }

      if (percentagePrefix) {
        percentagePrefix.textContent =
          "#";
      }

      if (basePrefix) {
        basePrefix.textContent =
          "#";
      }

      secondValueGroup.style.display =
        "none";

    }

  }


  // =======================================================
  // TYPE BUTTONS
  // =======================================================

  typeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      typeButtons.forEach(function (item) {

        item.classList.remove("active");

      });


      button.classList.add("active");


      currentType =
        button.dataset.type || "percent-of";


      // Clear previous result
      results.hidden = true;

      error.hidden = true;

      result.textContent = "—";

      calculation.textContent = "—";


      updateInputs();

    });

  });


  // =======================================================
  // CALCULATE
  // =======================================================

  calculateButton.addEventListener("click", function () {

    const first =
      parseFloat(percentageValue.value);

    const second =
      parseFloat(baseValue.value);


    // -----------------------------------------------------
    // CLEAR OLD ERROR
    // -----------------------------------------------------

    error.hidden = true;


    // -----------------------------------------------------
    // VALIDATION
    // -----------------------------------------------------

    if (
      !Number.isFinite(first) ||
      !Number.isFinite(second)
    ) {

      results.hidden = true;

      error.textContent =
        "Please enter valid numbers.";

      error.hidden = false;

      return;

    }


    // =====================================================
    // WHAT IS X% OF Y?
    // =====================================================

    if (currentType === "percent-of") {

      const percentage =
        first;

      const number =
        second;


      const answer =
        (percentage / 100) * number;


      result.textContent =
        formatNumber(answer);


      calculation.textContent =
        `${formatNumber(percentage)}% × ${formatNumber(number)} = ${formatNumber(answer)}`;

    }


    // =====================================================
    // X IS WHAT % OF Y?
    // =====================================================

    else if (currentType === "what-percent") {

      const part =
        first;

      const whole =
        second;


      if (whole === 0) {

        results.hidden = true;

        error.textContent =
          "The whole value cannot be zero.";

        error.hidden = false;

        return;

      }


      const answer =
        (part / whole) * 100;


      result.textContent =
        formatNumber(answer) + "%";


      calculation.textContent =
        `(${formatNumber(part)} ÷ ${formatNumber(whole)}) × 100 = ${formatNumber(answer)}%`;

    }


    // =====================================================
    // PERCENTAGE CHANGE
    // =====================================================

    else if (currentType === "percent-change") {

      const original =
        first;

      const newValue =
        second;


      if (original === 0) {

        results.hidden = true;

        error.textContent =
          "The original value cannot be zero.";

        error.hidden = false;

        return;

      }


      const answer =
        ((newValue - original) / Math.abs(original)) * 100;


      result.textContent =
        formatNumber(answer) + "%";


      const direction =
        answer > 0
          ? "increase"
          : answer < 0
            ? "decrease"
            : "no change";


      calculation.textContent =
        `(${formatNumber(newValue)} − ${formatNumber(original)}) ÷ ${formatNumber(Math.abs(original))} × 100 = ${formatNumber(answer)}% (${direction})`;

    }


    // =====================================================
    // SHOW RESULTS
    // =====================================================

    results.hidden = false;


    // Add success class

    const resultCards =
      results.querySelectorAll(
        ".percentage-result-card"
      );


    resultCards.forEach(function (card) {

      card.classList.add("success");

    });

  });


  // =======================================================
  // RESET
  // =======================================================

  resetButton.addEventListener("click", function () {

    percentageValue.value = "";

    baseValue.value = "";

    secondValue.value = "";


    results.hidden = true;

    error.hidden = true;


    result.textContent =
      "—";

    calculation.textContent =
      "—";


    const resultCards =
      results.querySelectorAll(
        ".percentage-result-card"
      );


    resultCards.forEach(function (card) {

      card.classList.remove("success");

    });


    // Reset calculation type

    currentType =
      "percent-of";


    typeButtons.forEach(function (button) {

      button.classList.remove("active");

    });


    const defaultButton =
      document.querySelector(
        '.percentage-type-button[data-type="percent-of"]'
      );


    if (defaultButton) {

      defaultButton.classList.add("active");

    }


    updateInputs();

  });


  // =======================================================
  // ENTER KEY SUPPORT
  // =======================================================

  [
    percentageValue,
    baseValue,
    secondValue
  ].forEach(function (input) {

    input.addEventListener("keydown", function (event) {

      if (event.key === "Enter") {

        event.preventDefault();

        calculateButton.click();

      }

    });

  });


  // =======================================================
  // INITIALIZE
  // =======================================================

  updateInputs();

});
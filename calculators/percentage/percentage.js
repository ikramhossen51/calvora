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

  const percentageInput =
    document.getElementById("percentageValue");

  const baseInput =
    document.getElementById("baseValue");

  const secondInput =
    document.getElementById("secondValue");

  const secondValueGroup =
    document.getElementById("secondValueGroup");

  const calculateButton =
    document.getElementById("calculatePercentage");

  const resetButton =
    document.getElementById("resetPercentage");

  const results =
    document.getElementById("percentageResults");

  const result =
    document.getElementById("percentageResult");

  const calculation =
    document.getElementById("percentageCalculation");

  const error =
    document.getElementById("percentageError");


  // =======================================================
  // CURRENT CALCULATION TYPE
  // =======================================================

  let currentType = "percent-of";


  // =======================================================
  // SAFETY CHECK
  // =======================================================

  if (
    !percentageInput ||
    !baseInput ||
    !secondInput ||
    !secondValueGroup ||
    !calculateButton ||
    !resetButton ||
    !results ||
    !result ||
    !calculation ||
    !error
  ) {
    console.error(
      "Calvora Percentage Calculator: Required HTML elements not found."
    );

    return;
  }


  // =======================================================
  // FORMAT NUMBER
  // =======================================================

  function formatNumber(number) {

    if (!Number.isFinite(number)) {
      return "—";
    }

    return Number(
      number.toFixed(2)
    ).toLocaleString("en-US");

  }


  // =======================================================
  // SHOW / HIDE SECOND NUMBER
  // =======================================================

  function updateInputFields() {

    if (currentType === "percent-change") {

      secondValueGroup.style.display = "block";

      percentageInput.closest(".input-group").style.display =
        "none";

      baseInput.closest(".input-group").style.display =
        "block";

      baseInput.parentElement.parentElement
        .querySelector("label").textContent =
        "Original Value";

      baseInput.placeholder =
        "Enter original value";

      secondInput.parentElement.parentElement
        .querySelector("label").textContent =
        "New Value";

      secondInput.placeholder =
        "Enter new value";

    }

    else if (currentType === "what-percent") {

      secondValueGroup.style.display = "none";

      percentageInput.closest(".input-group").style.display =
        "block";

      baseInput.closest(".input-group").style.display =
        "block";

      percentageInput.parentElement.parentElement
        .querySelector("label").textContent =
        "Part";

      percentageInput.parentElement.querySelector(
        ".input-prefix"
      ).textContent = "#";

      percentageInput.placeholder =
        "Enter part";

      baseInput.parentElement.parentElement
        .querySelector("label").textContent =
        "Whole";

      baseInput.placeholder =
        "Enter whole";

    }

    else {

      secondValueGroup.style.display = "none";

      percentageInput.closest(".input-group").style.display =
        "block";

      baseInput.closest(".input-group").style.display =
        "block";

      percentageInput.parentElement.parentElement
        .querySelector("label").textContent =
        "Percentage";

      percentageInput.parentElement.querySelector(
        ".input-prefix"
      ).textContent = "%";

      percentageInput.placeholder =
        "Enter percentage";

      baseInput.parentElement.parentElement
        .querySelector("label").textContent =
        "Number";

      baseInput.placeholder =
        "Enter number";

    }

  }


  // =======================================================
  // CALCULATION TYPE BUTTONS
  // =======================================================

  typeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      typeButtons.forEach(function (item) {
        item.classList.remove("active");
      });

      button.classList.add("active");

      currentType =
        button.dataset.type || "percent-of";

      results.hidden = true;
      error.hidden = true;

      result.textContent = "—";
      calculation.textContent = "—";

      updateInputFields();

    });

  });


  // =======================================================
  // CALCULATE
  // =======================================================

  calculateButton.addEventListener("click", function () {

    error.hidden = true;


    // =====================================================
    // WHAT IS X% OF Y?
    // =====================================================

    if (currentType === "percent-of") {

      const percentage =
        parseFloat(percentageInput.value);

      const number =
        parseFloat(baseInput.value);


      if (
        !Number.isFinite(percentage) ||
        !Number.isFinite(number)
      ) {

        results.hidden = true;
        error.textContent =
          "Please enter a valid percentage and number.";
        error.hidden = false;

        return;
      }


      const answer =
        (percentage / 100) * number;


      result.textContent =
        formatNumber(answer);


      calculation.textContent =
        `${formatNumber(percentage)}% × ${formatNumber(number)} = ${formatNumber(answer)}`;


      results.hidden = false;

      return;
    }


    // =====================================================
    // X IS WHAT % OF Y?
    // =====================================================

    if (currentType === "what-percent") {

      const part =
        parseFloat(percentageInput.value);

      const whole =
        parseFloat(baseInput.value);


      if (
        !Number.isFinite(part) ||
        !Number.isFinite(whole)
      ) {

        results.hidden = true;
        error.textContent =
          "Please enter valid numbers.";
        error.hidden = false;

        return;
      }


      if (whole === 0) {

        results.hidden = true;
        error.textContent =
          "The whole number cannot be zero.";
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


    // =====================================================
    // PERCENTAGE CHANGE
    // =====================================================

    if (currentType === "percent-change") {

      const original =
        parseFloat(baseInput.value);

      const newValue =
        parseFloat(secondInput.value);


      if (
        !Number.isFinite(original) ||
        !Number.isFinite(newValue)
      ) {

        results.hidden = true;
        error.textContent =
          "Please enter the original and new values.";
        error.hidden = false;

        return;
      }


      if (original === 0) {

        results.hidden = true;
        error.textContent =
          "The original value cannot be zero.";
        error.hidden = false;

        return;
      }


      const change =
        ((newValue - original) / original) * 100;


      const sign =
        change > 0 ? "+" : "";


      result.textContent =
        sign + formatNumber(change) + "%";


      calculation.textContent =
        `((${formatNumber(newValue)} − ${formatNumber(original)}) ÷ ${formatNumber(original)}) × 100 = ${sign}${formatNumber(change)}%`;


      results.hidden = false;

    }

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


    // Return to default mode

    currentType = "percent-of";


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


    updateInputFields();

  });


  // =======================================================
  // INITIAL STATE
  // =======================================================

  updateInputFields();

});
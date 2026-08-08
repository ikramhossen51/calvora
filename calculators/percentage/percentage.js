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

  const results = document.getElementById("percentageResults");
  const error = document.getElementById("percentageError");

  const result = document.getElementById("percentageResult");
  const calculation = document.getElementById("percentageCalculation");

  const typeButtons = document.querySelectorAll(
    ".percentage-type-button"
  );


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
    console.error("Calvora Percentage Calculator: Missing HTML element.");
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

    error.hidden = true;
    results.hidden = true;

    if (currentType === "percent-of") {

      percentageInput.disabled = false;
      baseInput.disabled = false;
      secondInput.disabled = true;

      percentageInput.placeholder = "Enter percentage";
      baseInput.placeholder = "Enter number";

      secondValueGroup.style.display = "none";

    }

    else if (currentType === "what-percent") {

      percentageInput.disabled = false;
      baseInput.disabled = false;
      secondInput.disabled = true;

      percentageInput.placeholder = "Enter first number";
      baseInput.placeholder = "Enter whole number";

      secondValueGroup.style.display = "none";

    }

    else if (currentType === "percent-change") {

      percentageInput.disabled = true;
      baseInput.disabled = false;
      secondInput.disabled = false;

      baseInput.placeholder = "Enter original value";
      secondInput.placeholder = "Enter new value";

      secondValueGroup.style.display = "block";

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

      currentType = button.dataset.type;

      updateInputs();

    });

  });


  // =======================================================
  // CALCULATE
  // =======================================================

  calculateButton.addEventListener("click", function () {

    error.hidden = true;
    results.hidden = true;


    // -----------------------------------------------------
    // WHAT IS X% OF Y?
    // -----------------------------------------------------

    if (currentType === "percent-of") {

      const percentage = parseFloat(
        percentageInput.value
      );

      const number = parseFloat(
        baseInput.value
      );


      if (
        isNaN(percentage) ||
        isNaN(number)
      ) {

        error.textContent =
          "Please enter valid numbers.";

        error.hidden = false;

        return;
      }


      const answer =
        (percentage / 100) * number;


      result.textContent =
        formatNumber(answer);

      calculation.textContent =
        `(${percentage} ÷ 100) × ${number} = ${formatNumber(answer)}`;

      results.hidden = false;

    }


    // -----------------------------------------------------
    // X IS WHAT % OF Y?
    // -----------------------------------------------------

    else if (currentType === "what-percent") {

      const value = parseFloat(
        percentageInput.value
      );

      const total = parseFloat(
        baseInput.value
      );


      if (
        isNaN(value) ||
        isNaN(total) ||
        total === 0
      ) {

        error.textContent =
          "Please enter valid numbers. The second number cannot be zero.";

        error.hidden = false;

        return;
      }


      const answer =
        (value / total) * 100;


      result.textContent =
        formatNumber(answer) + "%";

      calculation.textContent =
        `(${value} ÷ ${total}) × 100 = ${formatNumber(answer)}%`;

      results.hidden = false;

    }


    // -----------------------------------------------------
    // PERCENTAGE CHANGE
    // -----------------------------------------------------

    else if (currentType === "percent-change") {

      const original = parseFloat(
        baseInput.value
      );

      const newValue = parseFloat(
        secondInput.value
      );


      if (
        isNaN(original) ||
        isNaN(newValue) ||
        original === 0
      ) {

        error.textContent =
          "Please enter valid numbers. The original value cannot be zero.";

        error.hidden = false;

        return;
      }


      const change =
        ((newValue - original) / original) * 100;


      result.textContent =
        formatNumber(change) + "%";


      calculation.textContent =
        `((${newValue} − ${original}) ÷ ${original}) × 100 = ${formatNumber(change)}%`;


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

    result.textContent = "—";
    calculation.textContent = "—";

    error.hidden = true;
    results.hidden = true;

  });


  // =======================================================
  // NUMBER FORMAT
  // =======================================================

  function formatNumber(number) {

    if (!Number.isFinite(number)) {
      return "0";
    }

    return Number(number.toFixed(2)).toLocaleString(
      "en-US"
    );

  }


  // =======================================================
  // INITIAL STATE
  // =======================================================

  updateInputs();

});
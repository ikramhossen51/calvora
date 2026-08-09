// =========================================================
// CALVORA — PERCENTAGE CALCULATOR
// Standalone calculator
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

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

  const firstLabel =
    document.getElementById("firstLabel");

  const secondLabel =
    document.getElementById("secondLabel");

  const firstPrefix =
    document.getElementById("firstPrefix");

  const error =
    document.getElementById("percentageError");

  const results =
    document.getElementById("percentageResults");

  const result =
    document.getElementById("percentageResult");

  const calculation =
    document.getElementById("percentageCalculation");

  const typeButtons =
    document.querySelectorAll(
      ".percentage-type-button"
    );


  // -------------------------------------------------------
  // SAFETY CHECK
  // -------------------------------------------------------

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
      "Calvora Percentage Calculator: HTML element missing."
    );

    return;
  }


  // -------------------------------------------------------
  // CURRENT TYPE
  // -------------------------------------------------------

  let currentType = "percent-of";


  // -------------------------------------------------------
  // FORMAT NUMBER
  // -------------------------------------------------------

  function formatNumber(value) {

    if (!Number.isFinite(value)) {
      return "0";
    }

    return Number(
      value.toFixed(2)
    ).toLocaleString("en-US");

  }


  // -------------------------------------------------------
  // RESET OUTPUT
  // -------------------------------------------------------

  function clearOutput() {

    error.hidden = true;

    results.hidden = true;

    result.textContent = "—";

    calculation.textContent = "—";

  }


  // -------------------------------------------------------
  // UPDATE TYPE
  // -------------------------------------------------------

  function updateType() {

    clearOutput();

    percentageInput.value = "";
    baseInput.value = "";
    secondInput.value = "";


    if (currentType === "percent-of") {

      firstLabel.textContent =
        "Percentage";

      secondLabel.textContent =
        "Number";

      firstPrefix.textContent =
        "%";

      percentageInput.placeholder =
        "Enter percentage";

      baseInput.placeholder =
        "Enter number";

      percentageInput.disabled =
        false;

      baseInput.disabled =
        false;

      secondInput.disabled =
        true;

      secondValueGroup.hidden =
        true;

    }


    else if (currentType === "what-percent") {

      firstLabel.textContent =
        "Part";

      secondLabel.textContent =
        "Whole";

      firstPrefix.textContent =
        "#";

      percentageInput.placeholder =
        "Enter part";

      baseInput.placeholder =
        "Enter whole";

      percentageInput.disabled =
        false;

      baseInput.disabled =
        false;

      secondInput.disabled =
        true;

      secondValueGroup.hidden =
        true;

    }


    else if (currentType === "percent-change") {

      firstLabel.textContent =
        "Original Value";

      secondLabel.textContent =
        "New Value";

      firstPrefix.textContent =
        "#";

      percentageInput.disabled =
        true;

      baseInput.disabled =
        false;

      secondInput.disabled =
        false;

      baseInput.placeholder =
        "Enter original value";

      secondInput.placeholder =
        "Enter new value";

      secondValueGroup.hidden =
        true;

      // Move the second input into the main position.
      // The third input is the new value.

      secondValueGroup.hidden =
        false;

    }

  }


  // -------------------------------------------------------
  // TYPE BUTTONS
  // -------------------------------------------------------

  typeButtons.forEach(function (button) {

    button.addEventListener(
      "click",
      function () {

        typeButtons.forEach(
          function (item) {
            item.classList.remove("active");
          }
        );

        button.classList.add("active");

        currentType =
          button.dataset.type;

        updateType();

      }
    );

  });


  // -------------------------------------------------------
  // CALCULATE
  // -------------------------------------------------------

  calculateButton.addEventListener(
    "click",
    function () {

      clearOutput();


      // ===================================================
      // WHAT IS X% OF Y?
      // ===================================================

      if (currentType === "percent-of") {

        const percentage =
          parseFloat(
            percentageInput.value
          );

        const number =
          parseFloat(
            baseInput.value
          );


        if (
          !Number.isFinite(percentage) ||
          !Number.isFinite(number)
        ) {

          error.textContent =
            "Please enter both numbers.";

          error.hidden =
            false;

          return;
        }


        const answer =
          (percentage / 100) * number;


        result.textContent =
          formatNumber(answer);


        calculation.textContent =
          `(${formatNumber(percentage)} ÷ 100) × ${formatNumber(number)} = ${formatNumber(answer)}`;


        results.hidden =
          false;

        return;

      }


      // ===================================================
      // X IS WHAT % OF Y?
      // ===================================================

      if (currentType === "what-percent") {

        const part =
          parseFloat(
            percentageInput.value
          );

        const whole =
          parseFloat(
            baseInput.value
          );


        if (
          !Number.isFinite(part) ||
          !Number.isFinite(whole) ||
          whole === 0
        ) {

          error.textContent =
            "Please enter valid numbers. Whole cannot be zero.";

          error.hidden =
            false;

          return;
        }


        const answer =
          (part / whole) * 100;


        result.textContent =
          formatNumber(answer) + "%";


        calculation.textContent =
          `(${formatNumber(part)} ÷ ${formatNumber(whole)}) × 100 = ${formatNumber(answer)}%`;


        results.hidden =
          false;

        return;

      }


      // ===================================================
      // PERCENTAGE CHANGE
      // ===================================================

      if (currentType === "percent-change") {

        const original =
          parseFloat(
            baseInput.value
          );

        const newValue =
          parseFloat(
            secondInput.value
          );


        if (
          !Number.isFinite(original) ||
          !Number.isFinite(newValue) ||
          original === 0
        ) {

          error.textContent =
            "Please enter valid numbers. Original value cannot be zero.";

          error.hidden =
            false;

          return;
        }


        const change =
          ((newValue - original) / original) * 100;


        result.textContent =
          formatNumber(change) + "%";


        calculation.textContent =
          `((${formatNumber(newValue)} − ${formatNumber(original)}) ÷ ${formatNumber(original)}) × 100 = ${formatNumber(change)}%`;


        results.hidden =
          false;

      }

    }
  );


  // -------------------------------------------------------
  // RESET
  // -------------------------------------------------------

  resetButton.addEventListener(
    "click",
    function () {

      percentageInput.value = "";

      baseInput.value = "";

      secondInput.value = "";

      clearOutput();

    }
  );


  // -------------------------------------------------------
  // INITIAL STATE
  // -------------------------------------------------------

  updateType();

});
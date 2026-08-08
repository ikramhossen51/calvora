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

  const valueInput =
    document.getElementById("percentageValue");

  const totalInput =
    document.getElementById("percentageTotal");

  const results =
    document.getElementById("percentageResults");

  const error =
    document.getElementById("percentageError");

  const result =
    document.getElementById("percentageResult");


  // =======================================================
  // SAFETY CHECK
  // =======================================================

  if (
    !calculateButton ||
    !resetButton ||
    !valueInput ||
    !totalInput ||
    !results ||
    !error ||
    !result
  ) {
    return;
  }


  // =======================================================
  // CALCULATE
  // =======================================================

  calculateButton.addEventListener("click", function () {

    const value =
      parseFloat(valueInput.value);

    const total =
      parseFloat(totalInput.value);


    // -----------------------------------------------------
    // VALIDATION
    // -----------------------------------------------------

    if (
      isNaN(value) ||
      isNaN(total) ||
      total === 0
    ) {

      results.hidden = true;
      error.hidden = false;

      return;
    }


    // -----------------------------------------------------
    // HIDE ERROR
    // -----------------------------------------------------

    error.hidden = true;


    // -----------------------------------------------------
    // CALCULATION
    // -----------------------------------------------------

    const percentage =
      (value / total) * 100;


    // -----------------------------------------------------
    // DISPLAY RESULT
    // -----------------------------------------------------

    result.textContent =
      percentage.toFixed(2) + "%";


    // -----------------------------------------------------
    // RESULT STYLE
    // -----------------------------------------------------

    const resultCard =
      results.querySelector(
        ".percentage-result-card"
      );

    if (resultCard) {

      resultCard.classList.remove("success");

      resultCard.classList.add("success");

    }


    // -----------------------------------------------------
    // SHOW RESULTS
    // -----------------------------------------------------

    results.hidden = false;

  });


  // =======================================================
  // RESET
  // =======================================================

  resetButton.addEventListener("click", function () {

    valueInput.value = "";
    totalInput.value = "";

    results.hidden = true;
    error.hidden = true;

    result.textContent = "—";


    const resultCard =
      results.querySelector(
        ".percentage-result-card"
      );

    if (resultCard) {

      resultCard.classList.remove("success");

    }

  });

});
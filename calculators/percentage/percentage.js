/* =========================================================
   CALVORA — PERCENTAGE CALCULATOR
   FINAL / GIGI FIXED VERSION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =======================================================
     ELEMENTS
  ======================================================= */

  const percentageInput =
    document.getElementById("percentage");

  const numberInput =
    document.getElementById("number");

  const calculateButton =
    document.getElementById("calculatePercentage");

  const resetButton =
    document.getElementById("resetPercentage");

  const results =
    document.getElementById("percentageResults");

  const error =
    document.getElementById("percentageError");

  const percentageResult =
    document.getElementById("percentageResult");

  const percentValueResult =
    document.getElementById("percentValueResult");


  /* =======================================================
     SAFETY CHECK
  ======================================================= */

  if (
    !percentageInput ||
    !numberInput ||
    !calculateButton ||
    !resetButton ||
    !results ||
    !error ||
    !percentageResult
  ) {

    console.error(
      "Calvora Percentage Calculator: Required HTML element is missing."
    );

    return;
  }


  /* =======================================================
     FORMAT NUMBER
  ======================================================= */

  function formatNumber(value) {

    if (!Number.isFinite(value)) {
      return "—";
    }

    /* Avoid unnecessary floating-point errors */

    const rounded =
      Number.parseFloat(value.toFixed(10));


    return rounded.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 10
    });
  }


  /* =======================================================
     SHOW ERROR
  ======================================================= */

  function showError(message) {

    results.hidden = true;

    error.textContent = message;

    error.hidden = false;
  }


  /* =======================================================
     CLEAR ERROR
  ======================================================= */

  function clearError() {

    error.textContent = "";

    error.hidden = true;
  }


  /* =======================================================
     CALCULATE PERCENTAGE
     
     Example:
     20% of 150 = 30
  ======================================================= */

  function calculatePercentageOfNumber() {

    const percentage =
      Number.parseFloat(percentageInput.value);

    const number =
      Number.parseFloat(numberInput.value);


    /* Validation */

    if (
      percentageInput.value.trim() === "" ||
      numberInput.value.trim() === ""
    ) {

      showError(
        "Please enter both a percentage and a number."
      );

      return;
    }


    if (
      !Number.isFinite(percentage) ||
      !Number.isFinite(number)
    ) {

      showError(
        "Please enter valid numbers."
      );

      return;
    }


    /* Main calculation */

    const calculatedValue =
      (percentage / 100) * number;


    if (!Number.isFinite(calculatedValue)) {

      showError(
        "Unable to calculate the result. Please check your values."
      );

      return;
    }


    /* Display */

    percentageResult.textContent =
      formatNumber(calculatedValue);


    /*
      Secondary result.
      Example:
      20% of 150 = 30
    */

    if (percentValueResult) {

      percentValueResult.textContent =
        `${formatNumber(percentage)}% of ${formatNumber(number)}`;
    }


    /* Show */

    clearError();

    results.hidden = false;
  }


  /* =======================================================
     CALCULATE BUTTON
  ======================================================= */

  calculateButton.addEventListener(
    "click",
    function () {

      calculatePercentageOfNumber();

    }
  );


  /* =======================================================
     RESET
  ======================================================= */

  resetButton.addEventListener(
    "click",
    function () {

      percentageInput.value = "";

      numberInput.value = "";

      percentageResult.textContent = "—";

      if (percentValueResult) {
        percentValueResult.textContent = "—";
      }

      results.hidden = true;

      clearError();

      percentageInput.focus();

    }
  );


  /* =======================================================
     ENTER KEY SUPPORT
  ======================================================= */

  function handleEnter(event) {

    if (event.key === "Enter") {

      event.preventDefault();

      calculatePercentageOfNumber();

    }
  }


  percentageInput.addEventListener(
    "keydown",
    handleEnter
  );


  numberInput.addEventListener(
    "keydown",
    handleEnter
  );


  /* =======================================================
     INPUT VALIDATION
     
     Remove old error when user starts typing again.
  ======================================================= */

  percentageInput.addEventListener(
    "input",
    function () {

      if (!error.hidden) {
        clearError();
      }

    }
  );


  numberInput.addEventListener(
    "input",
    function () {

      if (!error.hidden) {
        clearError();
      }

    }
  );


  /* =======================================================
     INITIAL STATE
  ======================================================= */

  results.hidden = true;

  error.hidden = true;

  percentageResult.textContent = "—";

  if (percentValueResult) {
    percentValueResult.textContent = "—";
  }

});
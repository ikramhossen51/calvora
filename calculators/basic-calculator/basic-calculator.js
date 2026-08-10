document.addEventListener("DOMContentLoaded", function () {

  /* =====================================================
     ELEMENTS
  ====================================================== */

  const display = document.getElementById("basicDisplay");
  const expressionDisplay =
    document.getElementById("basicExpression");

  const keypad =
    document.querySelector(".basic-keypad");


  /* =====================================================
     SAFETY CHECK
  ====================================================== */

  if (!display || !keypad) {
    return;
  }


  /* =====================================================
     CALCULATOR STATE
  ====================================================== */

  let currentValue = "0";
  let previousValue = null;

  let operator = null;

  let waitingForNewValue = false;

  let expression = "";



  /* =====================================================
     DISPLAY
  ====================================================== */

  function updateDisplay() {

    display.textContent = formatNumber(currentValue);

    if (expressionDisplay) {
      expressionDisplay.textContent = expression;
    }

  }



  /* =====================================================
     NUMBER FORMAT
  ====================================================== */

  function formatNumber(value) {

    if (value === "Error") {
      return "Error";
    }


    const number = Number(value);


    if (!Number.isFinite(number)) {
      return "Error";
    }


    /*
      Keep decimal values as entered.
    */

    if (
      typeof value === "string" &&
      value.includes(".") &&
      value.endsWith(".")
    ) {
      return value;
    }


    /*
      Avoid unnecessary scientific notation
      for normal calculator results.
    */

    if (Math.abs(number) >= 1e12) {

      return number.toExponential(8);

    }


    /*
      Limit very long numbers.
    */

    if (
      typeof value === "string" &&
      value.length > 16
    ) {

      return number.toPrecision(12);

    }


    return String(value);

  }



  /* =====================================================
     NUMBER INPUT
  ====================================================== */

  function inputNumber(number) {

    if (currentValue === "Error") {

      clearCalculator();

    }


    if (waitingForNewValue) {

      currentValue = number;

      waitingForNewValue = false;

    } else {

      if (currentValue === "0") {

        currentValue = number;

      } else {

        /*
          Prevent excessively long input.
        */

        if (currentValue.replace("-", "").length >= 16) {
          return;
        }

        currentValue += number;

      }

    }


    updateDisplay();

  }



  /* =====================================================
     DECIMAL
  ====================================================== */

  function inputDecimal() {

    if (currentValue === "Error") {

      clearCalculator();

    }


    if (waitingForNewValue) {

      currentValue = "0.";

      waitingForNewValue = false;

    } else if (!currentValue.includes(".")) {

      currentValue += ".";

    }


    updateDisplay();

  }



  /* =====================================================
     CLEAR
  ====================================================== */

  function clearCalculator() {

    currentValue = "0";

    previousValue = null;

    operator = null;

    waitingForNewValue = false;

    expression = "";


    updateDisplay();

  }



  /* =====================================================
     DELETE
  ====================================================== */

  function deleteLastDigit() {

    if (
      currentValue === "Error" ||
      waitingForNewValue
    ) {
      return;
    }


    /*
      If only one digit remains,
      return to zero.
    */

    if (
      currentValue.length <= 1 ||
      (
        currentValue.length === 2 &&
        currentValue.startsWith("-")
      )
    ) {

      currentValue = "0";

    } else {

      currentValue =
        currentValue.slice(0, -1);

    }


    updateDisplay();

  }



  /* =====================================================
     PERCENTAGE
  ====================================================== */

  function calculatePercentage() {

    if (currentValue === "Error") {
      return;
    }


    const value = Number(currentValue);


    if (!Number.isFinite(value)) {

      showError();

      return;

    }


    currentValue =
      String(value / 100);


    updateDisplay();

  }



  /* =====================================================
     OPERATOR
  ====================================================== */

  function chooseOperator(selectedOperator) {

    if (currentValue === "Error") {
      return;
    }


    const inputValue =
      Number(currentValue);


    if (!Number.isFinite(inputValue)) {

      showError();

      return;

    }


    /*
      If user presses another operator
      before entering a new number,
      simply replace the operator.
    */

    if (
      operator !== null &&
      waitingForNewValue
    ) {

      operator = selectedOperator;


      expression =
        formatNumber(String(previousValue)) +
        " " +
        selectedOperator;


      updateDisplay();

      return;

    }


    /*
      First operator.
    */

    if (previousValue === null) {

      previousValue = inputValue;

    }

    /*
      Chain calculation.
    */

    else if (operator !== null) {

      const result =
        performCalculation(
          previousValue,
          inputValue,
          operator
        );


      if (result === null) {

        showError();

        return;

      }


      currentValue = String(result);

      previousValue = result;

    }


    operator = selectedOperator;

    waitingForNewValue = true;


    expression =
      formatNumber(String(previousValue)) +
      " " +
      selectedOperator;


    updateDisplay();

  }



  /* =====================================================
     EQUALS
  ====================================================== */

  function calculateResult() {

    if (
      operator === null ||
      previousValue === null ||
      currentValue === "Error"
    ) {
      return;
    }


    const inputValue =
      Number(currentValue);


    if (!Number.isFinite(inputValue)) {

      showError();

      return;

    }


    const result =
      performCalculation(
        previousValue,
        inputValue,
        operator
      );


    if (result === null) {

      showError();

      return;

    }


    /*
      Show complete calculation.
    */

    expression =
      formatNumber(String(previousValue)) +
      " " +
      operator +
      " " +
      formatNumber(String(inputValue)) +
      " =";


    currentValue = String(result);

    previousValue = null;

    operator = null;

    waitingForNewValue = true;


    updateDisplay();

  }



  /* =====================================================
     MATH ENGINE
  ====================================================== */

  function performCalculation(
    first,
    second,
    selectedOperator
  ) {

    let result;


    switch (selectedOperator) {

      case "+":

        result = first + second;

        break;


      case "−":
      case "-":

        result = first - second;

        break;


      case "×":
      case "*":

        result = first * second;

        break;


      case "÷":
      case "/":

        /*
          Division by zero.
        */

        if (second === 0) {

          return null;

        }


        result = first / second;

        break;


      default:

        return null;

    }


    /*
      Prevent Infinity / NaN.
    */

    if (!Number.isFinite(result)) {

      return null;

    }


    return roundResult(result);

  }



  /* =====================================================
     ROUNDING
  ====================================================== */

  function roundResult(value) {

    /*
      Prevent floating-point problems such as:

      0.1 + 0.2 = 0.30000000000000004
    */

    return Number(
      Number(value).toPrecision(12)
    );

  }



  /* =====================================================
     ERROR
  ====================================================== */

  function showError() {

    currentValue = "Error";

    previousValue = null;

    operator = null;

    waitingForNewValue = true;

    expression = "Cannot calculate";


    updateDisplay();

  }



  /* =====================================================
     BUTTON CLICK
  ====================================================== */

  keypad.addEventListener(
    "click",
    function (event) {

      /*
        Find the actual calculator button.
      */

      const button =
        event.target.closest(".calc-key");


      if (!button) {
        return;
      }


      const value =
        button.dataset.value;

      const action =
        button.dataset.action;



      /* =================================================
         NUMBER
      ================================================= */

      if (
        button.classList.contains("number-key") &&
        value !== "."
      ) {

        inputNumber(value);

        return;

      }



      /* =================================================
         DECIMAL
      ================================================= */

      if (value === ".") {

        inputDecimal();

        return;

      }



      /* =================================================
         CLEAR
      ================================================= */

      if (action === "clear") {

        clearCalculator();

        return;

      }



      /* =================================================
         DELETE
      ================================================= */

      if (action === "delete") {

        deleteLastDigit();

        return;

      }



      /* =================================================
         PERCENT
      ================================================= */

      if (action === "percent") {

        calculatePercentage();

        return;

      }



      /* =================================================
         OPERATOR
      ================================================= */

      if (action === "operator") {

        chooseOperator(value);

        return;

      }



      /* =================================================
         EQUALS
      ================================================= */

      if (action === "equals") {

        calculateResult();

        return;

      }

    }
  );



  /* =====================================================
     KEYBOARD SUPPORT
  ====================================================== */

  document.addEventListener(
    "keydown",
    function (event) {

      const key = event.key;



      /* =================================================
         NUMBERS
      ================================================= */

      if (/^[0-9]$/.test(key)) {

        inputNumber(key);

        return;

      }



      /* =================================================
         DECIMAL
      ================================================= */

      if (
        key === "." ||
        key === ","
      ) {

        event.preventDefault();

        inputDecimal();

        return;

      }



      /* =================================================
         ADD
      ================================================= */

      if (key === "+") {

        event.preventDefault();

        chooseOperator("+");

        return;

      }



      /* =================================================
         SUBTRACT
      ================================================= */

      if (key === "-") {

        event.preventDefault();

        chooseOperator("−");

        return;

      }



      /* =================================================
         MULTIPLY
      ================================================= */

      if (key === "*") {

        event.preventDefault();

        chooseOperator("×");

        return;

      }



      /* =================================================
         DIVIDE
      ================================================= */

      if (key === "/") {

        event.preventDefault();

        chooseOperator("÷");

        return;

      }



      /* =================================================
         EQUALS
      ================================================= */

      if (
        key === "Enter" ||
        key === "="
      ) {

        event.preventDefault();

        calculateResult();

        return;

      }



      /* =================================================
         CLEAR
      ================================================= */

      if (
        key === "Escape"
      ) {

        event.preventDefault();

        clearCalculator();

        return;

      }



      /* =================================================
         DELETE / CLEAR
      ================================================= */

      if (key === "Delete") {

        event.preventDefault();

        clearCalculator();

        return;

      }



      /* =================================================
         BACKSPACE
      ================================================= */

      if (key === "Backspace") {

        event.preventDefault();

        deleteLastDigit();

        return;

      }



      /* =================================================
         PERCENT
      ================================================= */

      if (key === "%") {

        event.preventDefault();

        calculatePercentage();

        return;

      }

    }
  );



  /* =====================================================
     INITIAL DISPLAY
  ====================================================== */

  updateDisplay();

});
/* =====================================================
   CALVORA BASIC CALCULATOR
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  const resultDisplay = document.querySelector(".calculator-result");
  const expressionDisplay = document.querySelector(".calculator-expression");
  const keys = document.querySelector(".calculator-keys");

  if (!resultDisplay || !keys) {
    return;
  }


  /* ===================================================
     STATE
  =================================================== */

  let currentValue = "0";
  let previousValue = null;
  let operator = null;
  let waitingForNewValue = false;
  let expression = "";


  /* ===================================================
     DISPLAY
  =================================================== */

  function updateDisplay() {

    resultDisplay.textContent = formatDisplayValue(currentValue);

    if (expressionDisplay) {
      expressionDisplay.textContent = expression || "";
    }
  }


  function formatDisplayValue(value) {

    if (value === "Error") {
      return "Error";
    }

    if (value === "Infinity") {
      return "Error";
    }

    if (value.length <= 16) {
      return value;
    }

    const number = Number(value);

    if (!Number.isFinite(number)) {
      return "Error";
    }

    return number.toPrecision(10);
  }


  /* ===================================================
     INPUT NUMBER
  =================================================== */

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

        if (currentValue.length >= 16) {
          return;
        }

        currentValue += number;
      }
    }

    updateDisplay();
  }


  /* ===================================================
     DECIMAL
  =================================================== */

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


  /* ===================================================
     CLEAR
  =================================================== */

  function clearCalculator() {

    currentValue = "0";
    previousValue = null;
    operator = null;
    waitingForNewValue = false;
    expression = "";

    updateDisplay();
  }


  /* ===================================================
     BACKSPACE
  =================================================== */

  function backspace() {

    if (waitingForNewValue || currentValue === "Error") {
      return;
    }


    if (
      currentValue.length <= 1 ||
      (currentValue.length === 2 && currentValue.startsWith("-"))
    ) {

      currentValue = "0";

    } else {

      currentValue = currentValue.slice(0, -1);

    }

    updateDisplay();
  }


  /* ===================================================
     PERCENTAGE
  =================================================== */

  function percentage() {

    if (currentValue === "Error") {
      return;
    }


    const value = Number(currentValue);

    if (!Number.isFinite(value)) {
      showError();
      return;
    }


    currentValue = String(value / 100);

    updateDisplay();
  }


  /* ===================================================
     PLUS / MINUS
  =================================================== */

  function toggleSign() {

    if (currentValue === "0" || currentValue === "Error") {
      return;
    }


    if (currentValue.startsWith("-")) {
      currentValue = currentValue.slice(1);
    } else {
      currentValue = "-" + currentValue;
    }


    updateDisplay();
  }


  /* ===================================================
     OPERATOR
  =================================================== */

  function chooseOperator(nextOperator) {

    if (currentValue === "Error") {
      return;
    }


    const inputValue = Number(currentValue);


    if (!Number.isFinite(inputValue)) {
      showError();
      return;
    }


    if (operator && waitingForNewValue) {

      operator = nextOperator;

      expression = `${formatDisplayValue(String(previousValue))} ${operatorSymbol(operator)}`;

      updateDisplay();

      return;
    }


    if (previousValue === null) {

      previousValue = inputValue;

    } else if (operator) {

      const result = calculate(
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


    operator = nextOperator;
    waitingForNewValue = true;


    expression =
      `${formatDisplayValue(String(previousValue))} ${operatorSymbol(operator)}`;


    updateDisplay();
  }


  /* ===================================================
     CALCULATE
  =================================================== */

  function calculateResult() {

    if (
      operator === null ||
      previousValue === null ||
      currentValue === "Error"
    ) {
      return;
    }


    const inputValue = Number(currentValue);


    if (!Number.isFinite(inputValue)) {
      showError();
      return;
    }


    const result = calculate(
      previousValue,
      inputValue,
      operator
    );


    if (result === null) {
      showError();
      return;
    }


    expression =
      `${formatDisplayValue(String(previousValue))} ` +
      `${operatorSymbol(operator)} ` +
      `${formatDisplayValue(String(inputValue))} =`;


    currentValue = String(result);

    previousValue = null;
    operator = null;
    waitingForNewValue = true;


    updateDisplay();
  }


  /* ===================================================
     MATH ENGINE
  =================================================== */

  function calculate(first, second, selectedOperator) {

    let result;


    switch (selectedOperator) {

      case "+":
        result = first + second;
        break;


      case "-":
        result = first - second;
        break;


      case "*":
        result = first * second;
        break;


      case "/":

        if (second === 0) {
          return null;
        }

        result = first / second;
        break;


      default:
        return null;
    }


    if (!Number.isFinite(result)) {
      return null;
    }


    return roundResult(result);
  }


  /* ===================================================
     ROUNDING
  =================================================== */

  function roundResult(value) {

    return Number.parseFloat(
      value.toPrecision(12)
    );
  }


  /* ===================================================
     OPERATOR SYMBOL
  =================================================== */

  function operatorSymbol(value) {

    switch (value) {

      case "*":
        return "×";

      case "/":
        return "÷";

      case "+":
        return "+";

      case "-":
        return "−";

      default:
        return value;
    }
  }


  /* ===================================================
     ERROR
  =================================================== */

  function showError() {

    currentValue = "Error";
    previousValue = null;
    operator = null;
    waitingForNewValue = true;

    expression = "Cannot calculate";

    updateDisplay();
  }


  /* ===================================================
     BUTTON CLICK
  =================================================== */

  keys.addEventListener("click", function (event) {

    const button = event.target.closest("button");

    if (!button) {
      return;
    }


    const number = button.dataset.number;
    const action = button.dataset.action;
    const buttonOperator = button.dataset.operator;


    /* NUMBER */

    if (number !== undefined) {

      inputNumber(number);
      return;
    }


    /* DECIMAL */

    if (action === "decimal") {

      inputDecimal();
      return;
    }


    /* CLEAR */

    if (
      action === "clear" ||
      action === "all-clear"
    ) {

      clearCalculator();
      return;
    }


    /* BACKSPACE */

    if (
      action === "backspace" ||
      action === "delete"
    ) {

      backspace();
      return;
    }


    /* PERCENT */

    if (
      action === "percent" ||
      action === "percentage"
    ) {

      percentage();
      return;
    }


    /* PLUS / MINUS */

    if (
      action === "sign" ||
      action === "plus-minus"
    ) {

      toggleSign();
      return;
    }


    /* OPERATOR */

    if (
      buttonOperator !== undefined
    ) {

      chooseOperator(buttonOperator);
      return;
    }


    /* EQUALS */

    if (
      action === "equals" ||
      action === "calculate"
    ) {

      calculateResult();
      return;
    }

  });


  /* ===================================================
     KEYBOARD SUPPORT
  =================================================== */

  document.addEventListener("keydown", function (event) {

    const key = event.key;


    /* NUMBERS */

    if (/^[0-9]$/.test(key)) {

      inputNumber(key);
      return;
    }


    /* DECIMAL */

    if (
      key === "." ||
      key === ","
    ) {

      event.preventDefault();

      inputDecimal();
      return;
    }


    /* OPERATORS */

    if (
      key === "+" ||
      key === "-" ||
      key === "*" ||
      key === "/"
    ) {

      event.preventDefault();

      chooseOperator(key);
      return;
    }


    /* ENTER */

    if (
      key === "Enter" ||
      key === "="
    ) {

      event.preventDefault();

      calculateResult();
      return;
    }


    /* ESCAPE */

    if (
      key === "Escape" ||
      key === "Delete"
    ) {

      event.preventDefault();

      clearCalculator();
      return;
    }


    /* BACKSPACE */

    if (key === "Backspace") {

      event.preventDefault();

      backspace();
      return;
    }


    /* PERCENT */

    if (key === "%") {

      event.preventDefault();

      percentage();
      return;
    }

  });


  /* ===================================================
     INITIAL DISPLAY
  =================================================== */

  updateDisplay();

});
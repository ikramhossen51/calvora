/* =========================================================
   CALVORA — SCIENTIFIC CALCULATOR
   Premium Scientific Calculator
   Mobile / Tablet / Desktop
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =====================================================
     ELEMENTS
  ====================================================== */

  const display =
    document.getElementById("scientificDisplay");

  const expressionDisplay =
    document.getElementById("scientificExpression");

  const keypad =
    document.querySelector(".scientific-keypad");

  const angleModeButton =
    document.getElementById("angleMode");

  if (!display || !keypad) {

    console.error(
      "Calvora Scientific Calculator: Required element missing."
    );

    return;
  }


  /* =====================================================
     CALCULATOR STATE
  ====================================================== */

  let currentValue = "0";

  let expression = "";

  let angleMode = "DEG";

  let justCalculated = false;

  let errorState = false;


  /* =====================================================
     DISPLAY
  ====================================================== */

  function updateDisplay() {

    display.textContent =
      formatDisplayValue(currentValue);

    if (expressionDisplay) {

      expressionDisplay.textContent =
        expression;

    }

  }


  /* =====================================================
     FORMAT DISPLAY
  ====================================================== */

  function formatDisplayValue(value) {

    if (value === "Error") {
      return "Error";
    }

    if (value === "Infinity") {
      return "Error";
    }

    if (
      typeof value !== "string" &&
      typeof value !== "number"
    ) {
      return "Error";
    }

    const stringValue = String(value);

    if (stringValue.length <= 16) {
      return stringValue;
    }

    const number =
      Number(stringValue);

    if (!Number.isFinite(number)) {
      return "Error";
    }

    return number.toPrecision(12);

  }


  /* =====================================================
     FORMAT RESULT
  ====================================================== */

  function formatResult(value) {

    if (!Number.isFinite(value)) {
      return "Error";
    }

    if (Math.abs(value) < 1e-12) {
      value = 0;
    }

    return Number(
      value.toPrecision(12)
    ).toString();

  }


  /* =====================================================
     INPUT NUMBER
  ====================================================== */

  function inputNumber(number) {

    if (errorState) {
      clearCalculator();
    }

    if (justCalculated) {

      currentValue = number;
      expression = "";
      justCalculated = false;

      updateDisplay();
      return;
    }

    if (currentValue === "0") {

      currentValue = number;

    } else {

      if (currentValue.length >= 16) {
        return;
      }

      currentValue += number;

    }

    updateDisplay();

  }


  /* =====================================================
     DECIMAL
  ====================================================== */

  function inputDecimal() {

    if (errorState) {
      clearCalculator();
    }

    if (justCalculated) {

      currentValue = "0.";
      expression = "";
      justCalculated = false;

      updateDisplay();
      return;
    }

    if (!currentValue.includes(".")) {

      currentValue += ".";

    }

    updateDisplay();

  }


  /* =====================================================
     DELETE
  ====================================================== */

  function deleteLastDigit() {

    if (errorState) {
      clearCalculator();
      return;
    }

    if (justCalculated) {
      return;
    }

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
     CLEAR
  ====================================================== */

  function clearCalculator() {

    currentValue = "0";

    expression = "";

    justCalculated = false;

    errorState = false;

    updateDisplay();

  }


  /* =====================================================
     TOGGLE SIGN
  ====================================================== */

  function toggleSign() {

    if (errorState) {
      return;
    }

    const value =
      Number(currentValue);

    if (!Number.isFinite(value)) {
      showError();
      return;
    }

    currentValue =
      formatResult(-value);

    updateDisplay();

  }


  /* =====================================================
     PERCENT
  ====================================================== */

  function calculatePercentage() {

    if (errorState) {
      return;
    }

    const value =
      Number(currentValue);

    if (!Number.isFinite(value)) {
      showError();
      return;
    }

    currentValue =
      formatResult(value / 100);

    updateDisplay();

  }


  /* =====================================================
     PI
  ====================================================== */

  function insertPi() {

    if (errorState) {
      clearCalculator();
    }

    if (justCalculated) {

      expression = "";
      justCalculated = false;

    }

    currentValue =
      formatResult(Math.PI);

    updateDisplay();

  }


  /* =====================================================
     EULER NUMBER
  ====================================================== */

  function insertEuler() {

    if (errorState) {
      clearCalculator();
    }

    if (justCalculated) {

      expression = "";
      justCalculated = false;

    }

    currentValue =
      formatResult(Math.E);

    updateDisplay();

  }


  /* =====================================================
     SQUARE ROOT
  ====================================================== */

  function calculateSquareRoot() {

    const value =
      Number(currentValue);

    if (
      !Number.isFinite(value) ||
      value < 0
    ) {

      showError();
      return;

    }

    expression =
      "√(" + formatDisplayValue(currentValue) + ")";

    currentValue =
      formatResult(Math.sqrt(value));

    justCalculated = true;

    updateDisplay();

  }


  /* =====================================================
     SQUARE
  ====================================================== */

  function calculateSquare() {

    const value =
      Number(currentValue);

    if (!Number.isFinite(value)) {
      showError();
      return;
    }

    expression =
      "(" +
      formatDisplayValue(currentValue) +
      ")²";

    currentValue =
      formatResult(value * value);

    justCalculated = true;

    updateDisplay();

  }


  /* =====================================================
     CUBE
  ====================================================== */

  function calculateCube() {

    const value =
      Number(currentValue);

    if (!Number.isFinite(value)) {
      showError();
      return;
    }

    expression =
      "(" +
      formatDisplayValue(currentValue) +
      ")³";

    currentValue =
      formatResult(value * value * value);

    justCalculated = true;

    updateDisplay();

  }


  /* =====================================================
     RECIPROCAL
  ====================================================== */

  function calculateReciprocal() {

    const value =
      Number(currentValue);

    if (
      !Number.isFinite(value) ||
      value === 0
    ) {

      showError();
      return;

    }

    expression =
      "1 / (" +
      formatDisplayValue(currentValue) +
      ")";

    currentValue =
      formatResult(1 / value);

    justCalculated = true;

    updateDisplay();

  }


  /* =====================================================
     FACTORIAL
  ====================================================== */

  function calculateFactorial() {

    const value =
      Number(currentValue);

    if (
      !Number.isFinite(value) ||
      value < 0 ||
      !Number.isInteger(value) ||
      value > 170
    ) {

      showError();
      return;

    }

    let result = 1;

    for (let i = 2; i <= value; i++) {
      result *= i;
    }

    expression =
      formatDisplayValue(currentValue) + "!";

    currentValue =
      formatResult(result);

    justCalculated = true;

    updateDisplay();

  }


  /* =====================================================
     TRIGONOMETRY
  ====================================================== */

  function toRadians(value) {

    if (angleMode === "DEG") {
      return value * Math.PI / 180;
    }

    return value;

  }


  function fromRadians(value) {

    if (angleMode === "DEG") {
      return value * 180 / Math.PI;
    }

    return value;

  }


  function calculateSin() {

    const value =
      Number(currentValue);

    if (!Number.isFinite(value)) {
      showError();
      return;
    }

    expression =
      "sin(" +
      formatDisplayValue(currentValue) +
      ")";

    currentValue =
      formatResult(
        Math.sin(toRadians(value))
      );

    justCalculated = true;

    updateDisplay();

  }


  function calculateCos() {

    const value =
      Number(currentValue);

    if (!Number.isFinite(value)) {
      showError();
      return;
    }

    expression =
      "cos(" +
      formatDisplayValue(currentValue) +
      ")";

    currentValue =
      formatResult(
        Math.cos(toRadians(value))
      );

    justCalculated = true;

    updateDisplay();

  }


  function calculateTan() {

    const value =
      Number(currentValue);

    if (!Number.isFinite(value)) {
      showError();
      return;
    }

    const radians =
      toRadians(value);

    const cosine =
      Math.cos(radians);

    if (Math.abs(cosine) < 1e-12) {
      showError();
      return;
    }

    expression =
      "tan(" +
      formatDisplayValue(currentValue) +
      ")";

    currentValue =
      formatResult(
        Math.tan(radians)
      );

    justCalculated = true;

    updateDisplay();

  }


  /* =====================================================
     INVERSE TRIGONOMETRY
  ====================================================== */

  function calculateAsin() {

    const value =
      Number(currentValue);

    if (
      !Number.isFinite(value) ||
      value < -1 ||
      value > 1
    ) {

      showError();
      return;

    }

    expression =
      "sin⁻¹(" +
      formatDisplayValue(currentValue) +
      ")";

    currentValue =
      formatResult(
        fromRadians(Math.asin(value))
      );

    justCalculated = true;

    updateDisplay();

  }


  function calculateAcos() {

    const value =
      Number(currentValue);

    if (
      !Number.isFinite(value) ||
      value < -1 ||
      value > 1
    ) {

      showError();
      return;

    }

    expression =
      "cos⁻¹(" +
      formatDisplayValue(currentValue) +
      ")";

    currentValue =
      formatResult(
        fromRadians(Math.acos(value))
      );

    justCalculated = true;

    updateDisplay();

  }


  function calculateAtan() {

    const value =
      Number(currentValue);

    if (!Number.isFinite(value)) {
      showError();
      return;
    }

    expression =
      "tan⁻¹(" +
      formatDisplayValue(currentValue) +
      ")";

    currentValue =
      formatResult(
        fromRadians(Math.atan(value))
      );

    justCalculated = true;

    updateDisplay();

  }


  /* =====================================================
     LOGARITHMS
  ====================================================== */

  function calculateLog() {

    const value =
      Number(currentValue);

    if (
      !Number.isFinite(value) ||
      value <= 0
    ) {

      showError();
      return;

    }

    expression =
      "log(" +
      formatDisplayValue(currentValue) +
      ")";

    currentValue =
      formatResult(Math.log10(value));

    justCalculated = true;

    updateDisplay();

  }


  function calculateLn() {

    const value =
      Number(currentValue);

    if (
      !Number.isFinite(value) ||
      value <= 0
    ) {

      showError();
      return;

    }

    expression =
      "ln(" +
      formatDisplayValue(currentValue) +
      ")";

    currentValue =
      formatResult(Math.log(value));

    justCalculated = true;

    updateDisplay();

  }


  /* =====================================================
     EXPONENTIAL
  ====================================================== */

  function calculateExp() {

    const value =
      Number(currentValue);

    if (!Number.isFinite(value)) {
      showError();
      return;
    }

    const result =
      Math.exp(value);

    if (!Number.isFinite(result)) {
      showError();
      return;
    }

    expression =
      "e^(" +
      formatDisplayValue(currentValue) +
      ")";

    currentValue =
      formatResult(result);

    justCalculated = true;

    updateDisplay();

  }


  /* =====================================================
     POWER OF 10
  ====================================================== */

  function calculatePowerOfTen() {

    const value =
      Number(currentValue);

    if (!Number.isFinite(value)) {
      showError();
      return;
    }

    const result =
      Math.pow(10, value);

    if (!Number.isFinite(result)) {
      showError();
      return;
    }

    expression =
      "10^(" +
      formatDisplayValue(currentValue) +
      ")";

    currentValue =
      formatResult(result);

    justCalculated = true;

    updateDisplay();

  }


  /* =====================================================
     BINARY OPERATION
  ====================================================== */

  function binaryOperation(operatorSymbol) {

    if (errorState) {
      return;
    }

    /*
      For scientific calculator we keep the operation
      in a JavaScript-safe expression string.
    */

    const value =
      Number(currentValue);

    if (!Number.isFinite(value)) {
      showError();
      return;
    }

    expression =
      formatDisplayValue(currentValue) +
      " " +
      operatorSymbol;

    currentValue = "0";

    justCalculated = false;

    updateDisplay();

  }


  /* =====================================================
     POWER
  ====================================================== */

  function powerOperation() {

    const base =
      Number(currentValue);

    if (!Number.isFinite(base)) {
      showError();
      return;
    }

    const exponent =
      window.prompt(
        "Enter exponent:"
      );

    if (exponent === null) {
      return;
    }

    const power =
      Number(exponent);

    if (!Number.isFinite(power)) {
      showError();
      return;
    }

    const result =
      Math.pow(base, power);

    if (!Number.isFinite(result)) {
      showError();
      return;
    }

    expression =
      formatDisplayValue(currentValue) +
      "^" +
      exponent;

    currentValue =
      formatResult(result);

    justCalculated = true;

    updateDisplay();

  }


  /* =====================================================
     CALCULATE BASIC EXPRESSION
  ====================================================== */

  function evaluateExpression() {

    /*
      This calculator intentionally avoids eval().
      Only the supported operation currently stored
      in expression is evaluated through controlled logic.
    */

    if (errorState) {
      return;
    }

    /*
      If no binary expression exists,
      keep the current number.
    */

    if (
      !expression ||
      !/[+\-×÷]/.test(expression)
    ) {

      justCalculated = true;
      updateDisplay();
      return;

    }

    const match =
      expression.match(
        /^(-?\d+(?:\.\d+)?)\s*([+\-×÷])$/
      );

    if (!match) {
      justCalculated = true;
      updateDisplay();
      return;
    }

    const first =
      Number(match[1]);

    const operatorSymbol =
      match[2];

    const second =
      Number(currentValue);

    if (
      !Number.isFinite(first) ||
      !Number.isFinite(second)
    ) {

      showError();
      return;

    }

    let result;

    switch (operatorSymbol) {

      case "+":
        result = first + second;
        break;

      case "-":
        result = first - second;
        break;

      case "×":
        result = first * second;
        break;

      case "÷":

        if (second === 0) {
          showError();
          return;
        }

        result = first / second;
        break;

      default:
        showError();
        return;

    }

    if (!Number.isFinite(result)) {
      showError();
      return;
    }

    expression =
      expression +
      " " +
      formatDisplayValue(currentValue) +
      " =";

    currentValue =
      formatResult(result);

    justCalculated = true;

    updateDisplay();

  }


  /* =====================================================
     ERROR
  ====================================================== */

  function showError() {

    currentValue = "Error";

    expression = "Cannot calculate";

    errorState = true;

    justCalculated = true;

    updateDisplay();

  }


  /* =====================================================
     ANGLE MODE
  ====================================================== */

  function toggleAngleMode() {

    if (angleMode === "DEG") {

      angleMode = "RAD";

    } else {

      angleMode = "DEG";

    }

    if (angleModeButton) {

      angleModeButton.textContent =
        angleMode;

      angleModeButton.setAttribute(
        "aria-label",
        "Angle mode: " + angleMode
      );

    }

  }


  /* =====================================================
     ACTION HANDLER
  ====================================================== */

  function handleAction(action, value) {

    switch (action) {

      case "clear":
      case "all-clear":

        clearCalculator();
        return;


      case "delete":

        deleteLastDigit();
        return;


      case "equals":

        evaluateExpression();
        return;


      case "percent":

        calculatePercentage();
        return;


      case "sign":

      case "plus-minus":

        toggleSign();
        return;


      case "pi":

        insertPi();
        return;


      case "e":

      case "euler":

        insertEuler();
        return;


      case "sqrt":

      case "square-root":

        calculateSquareRoot();
        return;


      case "square":

      case "square-x":

        calculateSquare();
        return;


      case "cube":

      case "cube-x":

        calculateCube();
        return;


      case "reciprocal":

      case "one-over-x":

        calculateReciprocal();
        return;


      case "factorial":

      case "fact":

        calculateFactorial();
        return;


      case "sin":

        calculateSin();
        return;


      case "cos":

        calculateCos();
        return;


      case "tan":

        calculateTan();
        return;


      case "asin":

      case "sin-inverse":

        calculateAsin();
        return;


      case "acos":

      case "cos-inverse":

        calculateAcos();
        return;


      case "atan":

      case "tan-inverse":

        calculateAtan();
        return;


      case "log":

        calculateLog();
        return;


      case "ln":

        calculateLn();
        return;


      case "exp":

        calculateExp();
        return;


      case "10x":

      case "power-ten":

        calculatePowerOfTen();
        return;


      case "power":

      case "x-power-y":

        powerOperation();
        return;


      case "angle":

      case "angle-mode":

        toggleAngleMode();
        return;

    }


    /*
      Operator
/* =========================================================
   CALVORA — SCIENTIFIC CALCULATOR
   Fully Functional / Mobile / Keyboard Support
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  const display = document.getElementById("scientificDisplay");
  const expressionDisplay = document.getElementById("scientificExpression");
  const keypad = document.querySelector(".scientific-keypad");

  if (!display || !keypad) {
    console.error("Calvora Scientific Calculator: Required element missing.");
    return;
  }


  /* =====================================================
     STATE
  ====================================================== */

  let expression = "";
  let lastAnswer = 0;
  let justCalculated = false;


  /* =====================================================
     DISPLAY
  ====================================================== */

  function updateDisplay() {

    display.textContent = expression || "0";

    if (expressionDisplay) {
      expressionDisplay.textContent = "";
    }
  }


  /* =====================================================
     INPUT
  ====================================================== */

  function append(value) {

    if (justCalculated) {
      expression = "";
      justCalculated = false;
    }

    expression += value;

    updateDisplay();
  }


  /* =====================================================
     CLEAR
  ====================================================== */

  function clearCalculator() {

    expression = "";
    justCalculated = false;

    updateDisplay();
  }


  /* =====================================================
     DELETE
  ====================================================== */

  function deleteLast() {

    if (justCalculated) {
      clearCalculator();
      return;
    }

    expression = expression.slice(0, -1);

    updateDisplay();
  }


  /* =====================================================
     FORMAT
  ====================================================== */

  function formatNumber(value) {

    if (!Number.isFinite(value)) {
      return "Error";
    }

    if (Math.abs(value) < 1e-12) {
      value = 0;
    }

    return Number(value.toPrecision(12)).toString();
  }


  /* =====================================================
     SAFE EVALUATION
  ====================================================== */

  function evaluateExpression(input) {

    let exp = input;

    /* Constants */

    exp = exp.replace(/π/g, "Math.PI");
    exp = exp.replace(/\be\b/g, "Math.E");

    /* Powers */

    exp = exp.replace(/\^/g, "**");

    /* Square root */

    exp = exp.replace(
      /√\s*\(/g,
      "Math.sqrt("
    );

    exp = exp.replace(
      /√\s*([0-9.]+)/g,
      "Math.sqrt($1)"
    );

    /* Functions */

    exp = exp.replace(
      /sin\(/g,
      "Math.sin("
    );

    exp = exp.replace(
      /cos\(/g,
      "Math.cos("
    );

    exp = exp.replace(
      /tan\(/g,
      "Math.tan("
    );

    exp = exp.replace(
      /asin\(/g,
      "Math.asin("
    );

    exp = exp.replace(
      /acos\(/g,
      "Math.acos("
    );

    exp = exp.replace(
      /atan\(/g,
      "Math.atan("
    );

    exp = exp.replace(
      /log\(/g,
      "Math.log10("
    );

    exp = exp.replace(
      /ln\(/g,
      "Math.log("
    );

    exp = exp.replace(
      /abs\(/g,
      "Math.abs("
    );


    /* Factorial */

    exp = exp.replace(
      /(\d+(?:\.\d+)?)!/g,
      "factorial($1)"
    );


    /*
      Safety:
      Only allow calculator characters.
    */

    if (!/^[0-9+\-*/().,\sA-Za-z_π√*]+$/.test(exp)) {
      throw new Error("Invalid expression");
    }


    /*
      Evaluate only calculator-generated expression.
    */

    const result = Function(
      "factorial",
      '"use strict"; return (' + exp + ');'
    )(factorial);


    if (!Number.isFinite(result)) {
      throw new Error("Invalid result");
    }

    return result;
  }


  /* =====================================================
     FACTORIAL
  ====================================================== */

  function factorial(number) {

    if (
      !Number.isFinite(number) ||
      number < 0 ||
      !Number.isInteger(number)
    ) {
      throw new Error("Invalid factorial");
    }

    if (number > 170) {
      throw new Error("Number too large");
    }

    let result = 1;

    for (let i = 2; i <= number; i++) {
      result *= i;
    }

    return result;
  }


  /* =====================================================
     CALCULATE
  ====================================================== */

  function calculate() {

    if (!expression) {
      return;
    }

    try {

      const result = evaluateExpression(expression);

      lastAnswer = result;

      expression = formatNumber(result);

      justCalculated = true;

      updateDisplay();

    } catch (error) {

      expression = "Error";

      justCalculated = true;

      updateDisplay();

      console.error(
        "Scientific Calculator:",
        error
      );
    }
  }


  /* =====================================================
     PERCENT
  ====================================================== */

  function percentage() {

    if (!expression) {
      return;
    }

    try {

      const result =
        evaluateExpression(expression) / 100;

      expression = formatNumber(result);

      updateDisplay();

    } catch {

      expression = "Error";

      justCalculated = true;

      updateDisplay();
    }
  }


  /* =====================================================
     PLUS / MINUS
  ====================================================== */

  function toggleSign() {

    if (!expression) {
      expression = "-";
      updateDisplay();
      return;
    }

    try {

      const value =
        evaluateExpression(expression);

      expression =
        formatNumber(-value);

      updateDisplay();

    } catch {

      if (expression.startsWith("-")) {
        expression = expression.slice(1);
      } else {
        expression = "-" + expression;
      }

      updateDisplay();
    }
  }


  /* =====================================================
     FUNCTION
  ====================================================== */

  function applyFunction(type) {

    try {

      let value;

      if (expression) {
        value = evaluateExpression(expression);
      } else {
        value = lastAnswer;
      }


      let result;


      switch (type) {

        case "sqrt":
          result = Math.sqrt(value);
          break;

        case "square":
          result = value * value;
          break;

        case "cube":
          result = value * value * value;
          break;

        case "sin":
          result = Math.sin(value);
          break;

        case "cos":
          result = Math.cos(value);
          break;

        case "tan":
          result = Math.tan(value);
          break;

        case "asin":
          result = Math.asin(value);
          break;

        case "acos":
          result = Math.acos(value);
          break;

        case "atan":
          result = Math.atan(value);
          break;

        case "log":
          result = Math.log10(value);
          break;

        case "ln":
          result = Math.log(value);
          break;

        case "factorial":
          result = factorial(value);
          break;

        case "inverse":

          if (value === 0) {
            throw new Error("Cannot divide by zero");
          }

          result = 1 / value;
          break;

        default:
          return;
      }


      if (!Number.isFinite(result)) {
        throw new Error("Invalid result");
      }


      expression = formatNumber(result);

      lastAnswer = result;

      justCalculated = true;

      updateDisplay();

    } catch {

      expression = "Error";

      justCalculated = true;

      updateDisplay();
    }
  }


  /* =====================================================
     BUTTON CLICK
  ====================================================== */

  keypad.addEventListener("click", function (event) {

    const button =
      event.target.closest(".scientific-key");

    if (!button) {
      return;
    }


    const value =
      button.dataset.value;

    const action =
      button.dataset.action;


    /* ---------------------------------------------
       NUMBER / SYMBOL
    ---------------------------------------------- */

    if (value !== undefined) {

      append(value);

      return;
    }


    /* ---------------------------------------------
       ACTIONS
    ---------------------------------------------- */

    switch (action) {

      case "clear":

        clearCalculator();

        break;


      case "delete":

        deleteLast();

        break;


      case "equals":

        calculate();

        break;


      case "percent":

        percentage();

        break;


      case "sign":

        toggleSign();

        break;


      case "sqrt":

        applyFunction("sqrt");

        break;


      case "square":

        applyFunction("square");

        break;


      case "cube":

        applyFunction("cube");

        break;


      case "sin":

        append("sin(");

        break;


      case "cos":

        append("cos(");

        break;


      case "tan":

        append("tan(");

        break;


      case "asin":

        append("asin(");

        break;


      case "acos":

        append("acos(");

        break;


      case "atan":

        append("atan(");

        break;


      case "log":

        append("log(");

        break;


      case "ln":

        append("ln(");

        break;


      case "factorial":

        append("!");

        break;


      case "inverse":

        applyFunction("inverse");

        break;

    }

  });


  /* =====================================================
     KEYBOARD
  ====================================================== */

  document.addEventListener("keydown", function (event) {

    const key = event.key;


    /* Numbers */

    if (/^[0-9]$/.test(key)) {

      append(key);

      return;
    }


    /* Decimal */

    if (key === ".") {

      append(".");

      return;
    }


    /* Operators */

    if (key === "+") {

      append("+");

      return;
    }


    if (key === "-") {

      append("-");

      return;
    }


    if (key === "*") {

      append("*");

      return;
    }


    if (key === "/") {

      event.preventDefault();

      append("/");

      return;
    }


    /* Power */

    if (key === "^") {

      append("^");

      return;
    }


    /* Parentheses */

    if (key === "(" || key === ")") {

      append(key);

      return;
    }


    /* Enter */

    if (
      key === "Enter" ||
      key === "="
    ) {

      event.preventDefault();

      calculate();

      return;
    }


    /* Backspace */

    if (key === "Backspace") {

      event.preventDefault();

      deleteLast();

      return;
    }


    /* Escape */

    if (key === "Escape") {

      clearCalculator();

      return;
    }


    /* Percent */

    if (key === "%") {

      event.preventDefault();

      percentage();

      return;
    }

  });


  /* =====================================================
     INITIAL DISPLAY
  ====================================================== */

  updateDisplay();

});
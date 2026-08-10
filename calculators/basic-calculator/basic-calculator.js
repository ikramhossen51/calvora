// =========================================================
// CALVORA — BASIC CALCULATOR
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

  // -------------------------------------------------------
  // ELEMENTS
  // -------------------------------------------------------

  const display =
    document.getElementById("calculatorDisplay");

  const expressionDisplay =
    document.getElementById("calculatorExpression");

  const numberButtons =
    document.querySelectorAll("[data-number]");

  const operatorButtons =
    document.querySelectorAll("[data-operator]");

  const actionButtons =
    document.querySelectorAll("[data-action]");


  // -------------------------------------------------------
  // SAFETY CHECK
  // -------------------------------------------------------

  if (
    !display ||
    !expressionDisplay
  ) {

    console.error(
      "Calvora Basic Calculator: Required element missing."
    );

    return;
  }


  // -------------------------------------------------------
  // CALCULATOR STATE
  // -------------------------------------------------------

  let currentValue = "0";
  let previousValue = null;
  let currentOperator = null;

  let waitingForOperand = false;
  let justCalculated = false;


  // -------------------------------------------------------
  // DISPLAY
  // -------------------------------------------------------

  function updateDisplay() {

    display.textContent = formatDisplay(currentValue);

  }


  function updateExpression() {

    if (
      previousValue !== null &&
      currentOperator
    ) {

      expressionDisplay.textContent =
        formatDisplay(previousValue) +
        " " +
        getOperatorSymbol(currentOperator);

    } else {

      expressionDisplay.textContent = "";

    }

  }


  function formatDisplay(value) {

    if (
      value === "Error" ||
      value === "Infinity"
    ) {

      return value;

    }

    const parts = String(value).split(".");

    let integerPart = parts[0];
    const decimalPart = parts[1];

    let sign = "";

    if (integerPart.startsWith("-")) {

      sign = "-";
      integerPart = integerPart.slice(1);

    }

    if (integerPart.length > 3) {

      integerPart =
        Number(integerPart).toLocaleString("en-US");

    }

    return (
      sign +
      integerPart +
      (
        decimalPart !== undefined
          ? "." + decimalPart
          : ""
      )
    );

  }


  function getOperatorSymbol(operator) {

    const symbols = {
      "+": "+",
      "-": "−",
      "*": "×",
      "/": "÷"
    };

    return symbols[operator] || operator;

  }


  // -------------------------------------------------------
  // NUMBER INPUT
  // -------------------------------------------------------

  function inputNumber(number) {

    if (
      currentValue === "Error" ||
      justCalculated
    ) {

      currentValue = "0";

      previousValue = null;
      currentOperator = null;

      justCalculated = false;

    }


    if (waitingForOperand) {

      currentValue = number;

      waitingForOperand = false;

    } else {

      if (
        currentValue === "0" &&
        number !== "."
      ) {

        currentValue = number;

      } else {

        currentValue += number;

      }

    }


    updateDisplay();
    updateExpression();

  }


  // -------------------------------------------------------
  // DECIMAL
  // -------------------------------------------------------

  function inputDecimal() {

    if (
      currentValue === "Error" ||
      justCalculated
    ) {

      currentValue = "0";
      justCalculated = false;

    }


    if (waitingForOperand) {

      currentValue = "0.";
      waitingForOperand = false;

    } else if (
      !currentValue.includes(".")
    ) {

      currentValue += ".";

    }


    updateDisplay();

  }


  // -------------------------------------------------------
  // OPERATOR
  // -------------------------------------------------------

  function chooseOperator(operator) {

    const inputValue =
      parseFloat(currentValue);


    if (!Number.isFinite(inputValue)) {

      return;

    }


    if (currentOperator !== null) {

      if (waitingForOperand) {

        currentOperator = operator;

        updateExpression();

        return;

      }


      const result =
        calculate(
          previousValue,
          inputValue,
          currentOperator
        );


      if (result === null) {

        showError();

        return;

      }


      currentValue =
        formatNumber(result);

      previousValue = result;

    } else {

      previousValue = inputValue;

    }


    currentOperator = operator;

    waitingForOperand = true;

    justCalculated = false;


    updateDisplay();
    updateExpression();

  }


  // -------------------------------------------------------
  // CALCULATE
  // -------------------------------------------------------

  function calculate(
    first,
    second,
    operator
  ) {

    if (
      !Number.isFinite(first) ||
      !Number.isFinite(second)
    ) {

      return null;

    }


    switch (operator) {

      case "+":

        return first + second;


      case "-":

        return first - second;


      case "*":

        return first * second;


      case "/":

        if (second === 0) {

          return null;

        }

        return first / second;


      default:

        return null;

    }

  }


  // -------------------------------------------------------
  // EQUALS
  // -------------------------------------------------------

  function calculateResult() {

    if (
      currentOperator === null ||
      previousValue === null
    ) {

      return;

    }


    const secondValue =
      parseFloat(currentValue);


    const result =
      calculate(
        previousValue,
        secondValue,
        currentOperator
      );


    if (result === null) {

      showError();

      return;

    }


    expressionDisplay.textContent =
      formatDisplay(previousValue) +
      " " +
      getOperatorSymbol(currentOperator) +
      " " +
      formatDisplay(secondValue) +
      " =";


    currentValue =
      formatNumber(result);

    previousValue = null;
    currentOperator = null;

    waitingForOperand = true;
    justCalculated = true;


    updateDisplay();

  }


  // -------------------------------------------------------
  // PERCENT
  // -------------------------------------------------------

  function calculatePercent() {

    const value =
      parseFloat(currentValue);


    if (!Number.isFinite(value)) {

      return;

    }


    if (
      previousValue !== null &&
      currentOperator
    ) {

      /*
        For example:

        200 + 10% = 220
        200 - 10% = 180
        200 × 10% = 20
        200 ÷ 10% = 2000
      */

      if (
        currentOperator === "+" ||
        currentOperator === "-"
      ) {

        currentValue =
          formatNumber(
            previousValue * value / 100
          );

      } else {

        currentValue =
          formatNumber(value / 100);

      }

    } else {

      currentValue =
        formatNumber(value / 100);

    }


    updateDisplay();

  }


  // -------------------------------------------------------
  // CHANGE SIGN
  // -------------------------------------------------------

  function changeSign() {

    if (
      currentValue === "0" ||
      currentValue === "Error"
    ) {

      return;

    }


    if (
      currentValue.startsWith("-")
    ) {

      currentValue =
        currentValue.substring(1);

    } else {

      currentValue =
        "-" + currentValue;

    }


    updateDisplay();

  }


  // -------------------------------------------------------
  // DELETE
  // -------------------------------------------------------

  function deleteLast() {

    if (
      currentValue === "Error" ||
      justCalculated
    ) {

      clearCalculator();

      return;

    }


    if (
      waitingForOperand
    ) {

      return;

    }


    if (
      currentValue.length <= 1
    ) {

      currentValue = "0";

    } else {

      currentValue =
        currentValue.slice(0, -1);

    }


    if (
      currentValue === "-"
    ) {

      currentValue = "0";

    }


    updateDisplay();

  }


  // -------------------------------------------------------
  // CLEAR
  // -------------------------------------------------------

  function clearCalculator() {

    currentValue = "0";

    previousValue = null;
    currentOperator = null;

    waitingForOperand = false;
    justCalculated = false;


    expressionDisplay.textContent = "";

    updateDisplay();

  }


  // -------------------------------------------------------
  // ERROR
  // -------------------------------------------------------

  function showError() {

    currentValue = "Error";

    previousValue = null;
    currentOperator = null;

    waitingForOperand = true;
    justCalculated = false;


    expressionDisplay.textContent =
      "Invalid calculation";


    updateDisplay();

  }


  // -------------------------------------------------------
  // NUMBER FORMATTING
  // -------------------------------------------------------

  function formatNumber(value) {

    if (!Number.isFinite(value)) {

      return "Error";

    }


    const rounded =
      Number(
        parseFloat(
          value.toPrecision(12)
        )
      );


    return String(rounded);

  }


  // -------------------------------------------------------
  // BUTTON EVENTS — NUMBERS
  // -------------------------------------------------------

  numberButtons.forEach(function (button) {

    button.addEventListener(
      "click",
      function () {

        const number =
          button.dataset.number;


        if (number === ".") {

          inputDecimal();

        } else {

          inputNumber(number);

        }

      }
    );

  });


  // -------------------------------------------------------
  // BUTTON EVENTS — OPERATORS
  // -------------------------------------------------------

  operatorButtons.forEach(function (button) {

    button.addEventListener(
      "click",
      function () {

        chooseOperator(
          button.dataset.operator
        );

      }
    );

  });


  // -------------------------------------------------------
  // BUTTON EVENTS — ACTIONS
  // -------------------------------------------------------

  actionButtons.forEach(function (button) {

    button.addEventListener(
      "click",
      function () {

        const action =
          button.dataset.action;


        switch (action) {

          case "clear":

            clearCalculator();

            break;


          case "delete":

            deleteLast();

            break;


          case "percent":

            calculatePercent();

            break;


          case "sign":

            changeSign();

            break;


          case "equals":

            calculateResult();

            break;

        }

      }
    );

  });


  // -------------------------------------------------------
  // KEYBOARD SUPPORT
  // -------------------------------------------------------

  document.addEventListener(
    "keydown",
    function (event) {

      const key = event.key;


      // Numbers

      if (
        key >= "0" &&
        key <= "9"
      ) {

        inputNumber(key);

        return;

      }


      // Decimal

      if (
        key === "." ||
        key === ","
      ) {

        inputDecimal();

        return;

      }


      // Operators

      if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/"
      ) {

        chooseOperator(key);

        return;

      }


      // Enter / Equals

      if (
        key === "Enter" ||
        key === "="
      ) {

        event.preventDefault();

        calculateResult();

        return;

      }


      // Escape / Clear

      if (
        key === "Escape"
      ) {

        clearCalculator();

        return;

      }


      // Backspace

      if (
        key === "Backspace"
      ) {

        event.preventDefault();

        deleteLast();

        return;

      }


      // Percent

      if (
        key === "%"
      ) {

        calculatePercent();

      }

    }
  );


  // -------------------------------------------------------
  // INITIAL DISPLAY
  // -------------------------------------------------------

  updateDisplay();

});
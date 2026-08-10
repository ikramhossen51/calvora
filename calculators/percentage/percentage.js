// =========================================================
// CALVORA — PERCENTAGE CALCULATOR
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

// -------------------------------------------------------
// ELEMENTS
// -------------------------------------------------------

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

const result =
document.getElementById("percentageResult");

// -------------------------------------------------------
// SAFETY CHECK
// -------------------------------------------------------

if (
!percentageInput ||
!numberInput ||
!calculateButton ||
!resetButton ||
!results ||
!error ||
!result
) {

console.error(
  "Calvora Percentage Calculator: Required element missing."
);

return;

}

// -------------------------------------------------------
// CALCULATE
// -------------------------------------------------------

calculateButton.addEventListener("click", function () {

const percentage =
  parseFloat(percentageInput.value);

const number =
  parseFloat(numberInput.value);


// -----------------------------------------------------
// VALIDATION
// -----------------------------------------------------

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


// -----------------------------------------------------
// CALCULATION
// -----------------------------------------------------

const calculatedValue =
  (percentage / 100) * number;


// -----------------------------------------------------
// DISPLAY RESULT
// -----------------------------------------------------

result.textContent =
  formatNumber(calculatedValue);


// -----------------------------------------------------
// SHOW RESULT
// -----------------------------------------------------

error.hidden = true;

results.hidden = false;

});

// -------------------------------------------------------
// RESET
// -------------------------------------------------------

resetButton.addEventListener("click", function () {

percentageInput.value = "";

numberInput.value = "";

result.textContent = "—";

results.hidden = true;

error.hidden = true;

});

// -------------------------------------------------------
// ENTER KEY SUPPORT
// -------------------------------------------------------

[
percentageInput,
numberInput
].forEach(function (input) {

input.addEventListener("keydown", function (event) {

  if (event.key === "Enter") {

    calculateButton.click();

  }

});

});

// -------------------------------------------------------
// FORMAT NUMBER
// -------------------------------------------------------

function formatNumber(value) {

return value.toLocaleString("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

}

});
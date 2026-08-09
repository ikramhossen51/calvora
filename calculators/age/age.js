// =========================================================
// CALVORA — AGE CALCULATOR
// Accurate date calculation / Mobile friendly
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

  const birthDate = document.getElementById("birthDate");
  const ageAtDate = document.getElementById("ageAtDate");

  const calculateButton = document.getElementById("calculateAge");
  const resetButton = document.getElementById("resetAge");

  const error = document.getElementById("ageError");
  const results = document.getElementById("ageResults");

  const exactAge = document.getElementById("exactAge");

  const totalMonths = document.getElementById("totalMonths");
  const remainingMonthDays =
    document.getElementById("remainingMonthDays");

  const totalWeeks = document.getElementById("totalWeeks");
  const remainingWeekDays =
    document.getElementById("remainingWeekDays");

  const totalDays = document.getElementById("totalDays");
  const totalHours = document.getElementById("totalHours");
  const totalMinutes = document.getElementById("totalMinutes");
  const totalSeconds = document.getElementById("totalSeconds");

  const nextBirthday = document.getElementById("nextBirthday");
  const birthWeekday = document.getElementById("birthWeekday");
  const daysUntilBirthday =
    document.getElementById("daysUntilBirthday");


  // =======================================================
  // SAFETY CHECK
  // =======================================================

  if (
    !birthDate ||
    !ageAtDate ||
    !calculateButton ||
    !resetButton ||
    !error ||
    !results ||
    !exactAge ||
    !totalMonths ||
    !remainingMonthDays ||
    !totalWeeks ||
    !remainingWeekDays ||
    !totalDays ||
    !totalHours ||
    !totalMinutes ||
    !totalSeconds ||
    !nextBirthday ||
    !birthWeekday ||
    !daysUntilBirthday
  ) {
    console.error(
      "Calvora Age Calculator: Required HTML element missing."
    );
    return;
  }


  // =======================================================
  // CONSTANTS
  // =======================================================

  const MS_PER_DAY = 86400000;


  // =======================================================
  // FORMAT NUMBER
  // =======================================================

  function formatNumber(value) {
    return Number(value).toLocaleString("en-US");
  }


  // =======================================================
  // PAD NUMBER
  // =======================================================

  function pad(value) {
    return String(value).padStart(2, "0");
  }


  // =======================================================
  // FORMAT DATE AS YYYY-MM-DD
  // =======================================================

  function formatInputDate(date) {

    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate())
    );

  }


  // =======================================================
  // PARSE DATE INPUT SAFELY
  // =======================================================

  function parseDate(value) {

    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return null;
    }

    const [year, month, day] =
      value.split("-").map(Number);

    const date =
      new Date(
        year,
        month - 1,
        day
      );

    date.setHours(0, 0, 0, 0);

    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return null;
    }

    return date;
  }


  // =======================================================
  // DAYS BETWEEN TWO DATES
  // =======================================================

  function differenceInDays(start, end) {

    return Math.round(
      (end.getTime() - start.getTime()) /
      MS_PER_DAY
    );

  }


  // =======================================================
  // DAYS IN MONTH
  // =======================================================

  function daysInMonth(year, monthIndex) {

    return new Date(
      year,
      monthIndex + 1,
      0
    ).getDate();

  }


  // =======================================================
  // ADD YEARS SAFELY
  // =======================================================

  function addYears(date, years) {

    const year =
      date.getFullYear() + years;

    const month =
      date.getMonth();

    const day =
      Math.min(
        date.getDate(),
        daysInMonth(year, month)
      );

    return new Date(
      year,
      month,
      day
    );

  }


  // =======================================================
  // ADD MONTHS SAFELY
  // =======================================================

  function addMonths(date, months) {

    const totalMonths =
      date.getFullYear() * 12 +
      date.getMonth() +
      months;

    const year =
      Math.floor(totalMonths / 12);

    const month =
      totalMonths % 12;

    const day =
      Math.min(
        date.getDate(),
        daysInMonth(year, month)
      );

    return new Date(
      year,
      month,
      day
    );

  }


  // =======================================================
  // CALCULATE YEARS / MONTHS / DAYS
  // =======================================================

  function calculateAgeParts(birth, end) {

    let years =
      end.getFullYear() -
      birth.getFullYear();

    let current =
      addYears(
        birth,
        years
      );

    if (current > end) {

      years--;

      current =
        addYears(
          birth,
          years
        );

    }

    let months = 0;

    while (true) {

      const next =
        addMonths(
          current,
          1
        );

      if (next <= end) {

        current = next;
        months++;

      } else {

        break;

      }

    }

    const days =
      differenceInDays(
        current,
        end
      );

    return {
      years,
      months,
      days
    };

  }


  // =======================================================
  // GET BIRTHDAY FOR A SPECIFIC YEAR
  // =======================================================

  function getBirthdayForYear(birth, year) {

    const month =
      birth.getMonth();

    let day =
      birth.getDate();

    /*
      For a February 29 birthday,
      use February 28 in a non-leap year.
    */

    if (
      month === 1 &&
      day === 29 &&
      daysInMonth(year, month) !== 29
    ) {
      day = 28;
    }

    return new Date(
      year,
      month,
      day
    );

  }


  // =======================================================
  // NEXT BIRTHDAY
  // =======================================================

  function calculateNextBirthday(birth, end) {

    let birthday =
      getBirthdayForYear(
        birth,
        end.getFullYear()
      );

    if (birthday < end) {

      birthday =
        getBirthdayForYear(
          birth,
          end.getFullYear() + 1
        );

    }

    return birthday;

  }


  // =======================================================
  // CLEAR RESULTS
  // =======================================================

  function clearResults() {

    error.hidden = true;
    error.textContent = "";

    results.hidden = true;

    exactAge.textContent = "—";

    totalMonths.textContent = "—";
    remainingMonthDays.textContent = "—";

    totalWeeks.textContent = "—";
    remainingWeekDays.textContent = "—";

    totalDays.textContent = "—";
    totalHours.textContent = "—";
    totalMinutes.textContent = "—";
    totalSeconds.textContent = "—";

    nextBirthday.textContent = "—";
    birthWeekday.textContent = "—";
    daysUntilBirthday.textContent = "—";

  }


  // =======================================================
  // SHOW ERROR
  // =======================================================

  function showError(message) {

    error.textContent = message;
    error.hidden = false;

    results.hidden = true;

  }


  // =======================================================
  // CALCULATE
  // =======================================================

  function calculate() {

    clearResults();

    const birth =
      parseDate(
        birthDate.value
      );

    const end =
      parseDate(
        ageAtDate.value
      );


    // -----------------------------------------------------
    // VALIDATION
    // -----------------------------------------------------

    if (!birth || !end) {

      showError(
        "Please select your date of birth and calculation date."
      );

      return;

    }


    if (birth > end) {

      showError(
        "Your date of birth cannot be after the calculation date."
      );

      return;

    }


    // -----------------------------------------------------
    // AGE
    // -----------------------------------------------------

    const age =
      calculateAgeParts(
        birth,
        end
      );


    const days =
      differenceInDays(
        birth,
        end
      );


    // -----------------------------------------------------
    // EXACT AGE
    // -----------------------------------------------------

    exactAge.textContent =
      `${formatNumber(age.years)} ${
        age.years === 1 ? "year" : "years"
      } ${
        formatNumber(age.months)
      } ${
        age.months === 1 ? "month" : "months"
      } ${
        formatNumber(age.days)
      } ${
        age.days === 1 ? "day" : "days"
      }`;


    // -----------------------------------------------------
    // TOTAL MONTHS
    // -----------------------------------------------------

    const months =
      age.years * 12 +
      age.months;

    totalMonths.textContent =
      formatNumber(months);

    remainingMonthDays.textContent =
      formatNumber(age.days);


    // -----------------------------------------------------
    // TOTAL WEEKS
    // -----------------------------------------------------

    totalWeeks.textContent =
      formatNumber(
        Math.floor(days / 7)
      );

    remainingWeekDays.textContent =
      formatNumber(
        days % 7
      );


    // -----------------------------------------------------
    // TOTAL DAYS
    // -----------------------------------------------------

    totalDays.textContent =
      formatNumber(days);


    // -----------------------------------------------------
    // TOTAL HOURS
    // -----------------------------------------------------

    totalHours.textContent =
      formatNumber(
        days * 24
      );


    // -----------------------------------------------------
    // TOTAL MINUTES
    // -----------------------------------------------------

    totalMinutes.textContent =
      formatNumber(
        days * 24 * 60
      );


    // -----------------------------------------------------
    // TOTAL SECONDS
    // -----------------------------------------------------

    totalSeconds.textContent =
      formatNumber(
        days * 24 * 60 * 60
      );


    // -----------------------------------------------------
    // NEXT BIRTHDAY
    // -----------------------------------------------------

    const birthday =
      calculateNextBirthday(
        birth,
        end
      );

    nextBirthday.textContent =
      birthday.toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric"
        }
      );


    // -----------------------------------------------------
    // BIRTH WEEKDAY
    // -----------------------------------------------------

    birthWeekday.textContent =
      birth.toLocaleDateString(
        "en-US",
        {
          weekday: "long"
        }
      );


    // -----------------------------------------------------
    // DAYS UNTIL BIRTHDAY
    // -----------------------------------------------------

    daysUntilBirthday.textContent =
      formatNumber(
        differenceInDays(
          end,
          birthday
        )
      );


    // -----------------------------------------------------
    // SHOW RESULT
    // -----------------------------------------------------

    results.hidden = false;

    results.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });

  }


  // =======================================================
  // SET TODAY
  // =======================================================

  function setToday() {

    const today =
      new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    ageAtDate.value =
      formatInputDate(today);

  }


  // =======================================================
  // EVENTS
  // =======================================================

  calculateButton.addEventListener(
    "click",
    calculate
  );


  resetButton.addEventListener(
    "click",
    function () {

      birthDate.value = "";

      setToday();

      clearResults();

      birthDate.focus();

    }
  );


  birthDate.addEventListener(
    "keydown",
    function (event) {

      if (event.key === "Enter") {

        event.preventDefault();

        calculate();

      }

    }
  );


  ageAtDate.addEventListener(
    "keydown",
    function (event) {

      if (event.key === "Enter") {

        event.preventDefault();

        calculate();

      }

    }
  );


  // =======================================================
  // INITIALIZE
  // =======================================================

  setToday();
  clearResults();

});
// =========================================================
// CALVORA — AGE CALCULATOR
// =========================================================

document.addEventListener("DOMContentLoaded", function () {


  // =======================================================
  // ELEMENTS
  // =======================================================

  const birthDate =
    document.getElementById("birthDate");

  const ageAtDate =
    document.getElementById("ageAtDate");

  const calculateButton =
    document.getElementById("calculateAge");

  const resetButton =
    document.getElementById("resetAge");

  const error =
    document.getElementById("ageError");

  const results =
    document.getElementById("ageResults");

  const exactAge =
    document.getElementById("exactAge");

  const totalMonths =
    document.getElementById("totalMonths");

  const remainingMonthDays =
    document.getElementById("remainingMonthDays");

  const totalWeeks =
    document.getElementById("totalWeeks");

  const remainingWeekDays =
    document.getElementById("remainingWeekDays");

  const totalDays =
    document.getElementById("totalDays");

  const totalHours =
    document.getElementById("totalHours");

  const totalMinutes =
    document.getElementById("totalMinutes");

  const totalSeconds =
    document.getElementById("totalSeconds");

  const nextBirthday =
    document.getElementById("nextBirthday");

  const birthWeekday =
    document.getElementById("birthWeekday");

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
    !results
  ) {

    console.error(
      "Calvora Age Calculator: HTML element missing."
    );

    return;

  }


  // =======================================================
  // HELPERS
  // =======================================================

  function pad(number) {

    return String(number).padStart(2, "0");

  }


  function formatNumber(number) {

    return Number(number)
      .toLocaleString("en-US");

  }


  function parseDate(value) {

    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(value)
    ) {

      return null;

    }


    const parts =
      value.split("-").map(Number);

    const year = parts[0];
    const month = parts[1];
    const day = parts[2];


    const date =
      new Date(
        year,
        month - 1,
        day
      );


    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {

      return null;

    }


    date.setHours(0, 0, 0, 0);

    return date;

  }


  function differenceInDays(start, end) {

    return Math.round(
      (end - start) /
      86400000
    );

  }


  // =======================================================
  // ADD YEARS
  // =======================================================

  function addYears(date, years) {

    const result =
      new Date(date);

    const originalMonth =
      date.getMonth();

    const originalDay =
      date.getDate();


    result.setFullYear(
      date.getFullYear() + years
    );


    /*
      Handle February 29
    */

    if (
      originalMonth === 1 &&
      originalDay === 29 &&
      result.getMonth() !== 1
    ) {

      result.setMonth(1);
      result.setDate(28);

    }


    return result;

  }


  // =======================================================
  // ADD MONTHS
  // =======================================================

  function addMonths(date, months) {

    const result =
      new Date(date);

    const originalDay =
      date.getDate();


    result.setDate(1);

    result.setMonth(
      result.getMonth() + months
    );


    const lastDay =
      new Date(
        result.getFullYear(),
        result.getMonth() + 1,
        0
      ).getDate();


    result.setDate(
      Math.min(
        originalDay,
        lastDay
      )
    );


    return result;

  }


  // =======================================================
  // CALCULATE YEARS / MONTHS / DAYS
  // =======================================================

  function calculateAgeParts(
    birth,
    end
  ) {

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

      }

      else {

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
  // NEXT BIRTHDAY
  // =======================================================

  function calculateNextBirthday(
    birth,
    currentDate
  ) {

    let birthday =
      new Date(
        currentDate.getFullYear(),
        birth.getMonth(),
        birth.getDate()
      );


    /*
      Handle February 29
    */

    if (
      birth.getMonth() === 1 &&
      birth.getDate() === 29 &&
      birthday.getMonth() !== 1
    ) {

      birthday =
        new Date(
          currentDate.getFullYear(),
          1,
          28
        );

    }


    birthday.setHours(
      0,
      0,
      0,
      0
    );


    if (birthday < currentDate) {

      birthday =
        new Date(
          currentDate.getFullYear() + 1,
          birth.getMonth(),
          birth.getDate()
        );


      if (
        birth.getMonth() === 1 &&
        birth.getDate() === 29 &&
        birthday.getMonth() !== 1
      ) {

        birthday =
          new Date(
            currentDate.getFullYear() + 1,
            1,
            28
          );

      }


      birthday.setHours(
        0,
        0,
        0,
        0
      );

    }


    return birthday;

  }


  // =======================================================
  // CLEAR RESULT
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
  // ERROR
  // =======================================================

  function showError(message) {

    error.textContent =
      message;

    error.hidden =
      false;

    results.hidden =
      true;

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


    // Missing date

    if (
      !birth ||
      !end
    ) {

      showError(
        "Please select both dates."
      );

      return;

    }


    // Invalid order

    if (birth > end) {

      showError(
        "The date of birth cannot be after the calculation date."
      );

      return;

    }


    // =====================================================
    // AGE
    // =====================================================

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


    // =====================================================
    // EXACT AGE
    // =====================================================

    exactAge.textContent =
      `${age.years} ${
        age.years === 1
          ? "year"
          : "years"
      } ${
        age.months
      } ${
        age.months === 1
          ? "month"
          : "months"
      } ${
        age.days
      } ${
        age.days === 1
          ? "day"
          : "days"
      }`;


    // =====================================================
    // TOTAL MONTHS
    // =====================================================

    totalMonths.textContent =
      formatNumber(
        age.years * 12 +
        age.months
      );


    remainingMonthDays.textContent =
      formatNumber(
        age.days
      );


    // =====================================================
    // TOTAL WEEKS
    // =====================================================

    totalWeeks.textContent =
      formatNumber(
        Math.floor(days / 7)
      );


    remainingWeekDays.textContent =
      formatNumber(
        days % 7
      );


    // =====================================================
    // TOTAL DAYS
    // =====================================================

    totalDays.textContent =
      formatNumber(
        days
      );


    // =====================================================
    // HOURS
    // =====================================================

    totalHours.textContent =
      formatNumber(
        days * 24
      );


    // =====================================================
    // MINUTES
    // =====================================================

    totalMinutes.textContent =
      formatNumber(
        days * 1440
      );


    // =====================================================
    // SECONDS
    // =====================================================

    totalSeconds.textContent =
      formatNumber(
        days * 86400
      );


    // =====================================================
    // NEXT BIRTHDAY
    // =====================================================

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


    // =====================================================
    // BIRTHDAY WEEKDAY
    // =====================================================

    birthWeekday.textContent =
      birth.toLocaleDateString(
        "en-US",
        {
          weekday: "long"
        }
      );


    // =====================================================
    // DAYS UNTIL BIRTHDAY
    // =====================================================

    daysUntilBirthday.textContent =
      formatNumber(
        differenceInDays(
          end,
          birthday
        )
      );


    // =====================================================
    // SHOW
    // =====================================================

    results.hidden =
      false;

  }


  // =======================================================
  // TODAY
  // =======================================================

  function setToday() {

    const today =
      new Date();


    ageAtDate.value =
      `${today.getFullYear()}-${
        pad(today.getMonth() + 1)
      }-${
        pad(today.getDate())
      }`;

  }


  // =======================================================
  // CALCULATE BUTTON
  // =======================================================

  calculateButton.addEventListener(
    "click",
    calculate
  );


  // =======================================================
  // RESET
  // =======================================================

  resetButton.addEventListener(
    "click",
    function () {

      birthDate.value = "";

      setToday();

      clearResults();

      birthDate.focus();

    }
  );


  // =======================================================
  // ENTER KEY
  // =======================================================

  birthDate.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Enter"
      ) {

        event.preventDefault();

        calculate();

      }

    }
  );


  ageAtDate.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Enter"
      ) {

        event.preventDefault();

        calculate();

      }

    }
  );


  // =======================================================
  // INITIAL STATE
  // =======================================================

  setToday();

  clearResults();

});
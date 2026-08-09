// =========================================================
// CALVORA — AGE CALCULATOR
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

  const birthDateInput =
    document.getElementById("birthDate");

  const todayDateInput =
    document.getElementById("todayDate");

  const calculateButton =
    document.getElementById("calculateAge");

  const resetButton =
    document.getElementById("resetAge");

  const error =
    document.getElementById("ageError");

  const results =
    document.getElementById("ageResults");

  const ageYears =
    document.getElementById("ageYears");

  const ageMonths =
    document.getElementById("ageMonths");

  const ageDays =
    document.getElementById("ageDays");

  const totalMonths =
    document.getElementById("totalMonths");

  const totalWeeks =
    document.getElementById("totalWeeks");

  const totalDays =
    document.getElementById("totalDays");

  const nextBirthday =
    document.getElementById("nextBirthday");


  // ========================================================
  // SAFETY CHECK
  // ========================================================

  if (
    !birthDateInput ||
    !todayDateInput ||
    !calculateButton ||
    !resetButton ||
    !error ||
    !results ||
    !ageYears ||
    !ageMonths ||
    !ageDays ||
    !totalMonths ||
    !totalWeeks ||
    !totalDays ||
    !nextBirthday
  ) {

    console.error(
      "Calvora Age Calculator: Required HTML element missing."
    );

    return;
  }


  // ========================================================
  // DATE HELPERS
  // ========================================================

  function parseDate(dateString) {

    if (!dateString) {
      return null;
    }

    const parts =
      dateString.split("-").map(Number);

    if (parts.length !== 3) {
      return null;
    }

    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    const date =
      new Date(year, month - 1, day);

    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return null;
    }

    return date;
  }


  function formatNumber(number) {

    return Number(number).toLocaleString("en-US");
  }


  function daysInMonth(year, month) {

    return new Date(
      year,
      month + 1,
      0
    ).getDate();
  }


  function getTodayString() {

    const today = new Date();

    const year =
      today.getFullYear();

    const month =
      String(today.getMonth() + 1)
        .padStart(2, "0");

    const day =
      String(today.getDate())
        .padStart(2, "0");

    return `${year}-${month}-${day}`;
  }


  // ========================================================
  // SET TODAY
  // ========================================================

  todayDateInput.value =
    getTodayString();

  todayDateInput.max =
    getTodayString();


  // ========================================================
  // CLEAR OUTPUT
  // ========================================================

  function clearOutput() {

    error.hidden = true;

    error.textContent = "";

    results.hidden = true;

    ageYears.textContent = "0";
    ageMonths.textContent = "0";
    ageDays.textContent = "0";

    totalMonths.textContent = "—";
    totalWeeks.textContent = "—";
    totalDays.textContent = "—";
    nextBirthday.textContent = "—";
  }


  // ========================================================
  // CALCULATE EXACT AGE
  // ========================================================

  calculateButton.addEventListener(
    "click",
    function () {

      clearOutput();


      const birthDate =
        parseDate(birthDateInput.value);

      const endDate =
        parseDate(todayDateInput.value);


      // ----------------------------------------------------
      // VALIDATION
      // ----------------------------------------------------

      if (!birthDate || !endDate) {

        error.textContent =
          "Please select both dates.";

        error.hidden = false;

        return;
      }


      if (birthDate > endDate) {

        error.textContent =
          "Date of birth cannot be after the calculation date.";

        error.hidden = false;

        return;
      }


      // ----------------------------------------------------
      // EXACT YEARS
      // ----------------------------------------------------

      let years =
        endDate.getFullYear() -
        birthDate.getFullYear();


      let months =
        endDate.getMonth() -
        birthDate.getMonth();


      let days =
        endDate.getDate() -
        birthDate.getDate();


      // ----------------------------------------------------
      // BORROW DAYS
      // ----------------------------------------------------

      if (days < 0) {

        months--;

        const previousMonthDays =
          daysInMonth(
            endDate.getFullYear(),
            endDate.getMonth() - 1
          );

        days += previousMonthDays;
      }


      // ----------------------------------------------------
      // BORROW MONTHS
      // ----------------------------------------------------

      if (months < 0) {

        years--;

        months += 12;
      }


      // ----------------------------------------------------
      // SAFETY
      // ----------------------------------------------------

      if (years < 0) {
        years = 0;
      }


      // ----------------------------------------------------
      // TOTAL DAYS
      // ----------------------------------------------------

      const millisecondsPerDay =
        1000 * 60 * 60 * 24;


      const differenceMilliseconds =
        endDate.getTime() -
        birthDate.getTime();


      const totalDaysValue =
        Math.floor(
          differenceMilliseconds /
          millisecondsPerDay
        );


      // ----------------------------------------------------
      // TOTAL WEEKS
      // ----------------------------------------------------

      const totalWeeksValue =
        Math.floor(
          totalDaysValue / 7
        );


      // ----------------------------------------------------
      // TOTAL MONTHS
      // ----------------------------------------------------

      const totalMonthsValue =
        years * 12 + months;


      // ----------------------------------------------------
      // DISPLAY AGE
      // ----------------------------------------------------

      ageYears.textContent =
        formatNumber(years);

      ageMonths.textContent =
        formatNumber(months);

      ageDays.textContent =
        formatNumber(days);


      totalMonths.textContent =
        formatNumber(totalMonthsValue);


      totalWeeks.textContent =
        formatNumber(totalWeeksValue);


      totalDays.textContent =
        formatNumber(totalDaysValue);


      // ----------------------------------------------------
      // NEXT BIRTHDAY
      // ----------------------------------------------------

      const birthMonth =
        birthDate.getMonth();

      const birthDay =
        birthDate.getDate();

      let nextBirthdayDate =
        new Date(
          endDate.getFullYear(),
          birthMonth,
          birthDay
        );


      /*
        Special handling for February 29.
        If the current year is not a leap year,
        birthday is treated as February 28.
      */

      if (
        birthMonth === 1 &&
        birthDay === 29 &&
        nextBirthdayDate.getDate() !== 29
      ) {

        nextBirthdayDate =
          new Date(
            endDate.getFullYear(),
            1,
            28
          );
      }


      if (nextBirthdayDate < endDate) {

        nextBirthdayDate =
          new Date(
            endDate.getFullYear() + 1,
            birthMonth,
            birthDay
          );


        if (
          birthMonth === 1 &&
          birthDay === 29 &&
          nextBirthdayDate.getDate() !== 29
        ) {

          nextBirthdayDate =
            new Date(
              endDate.getFullYear() + 1,
              1,
              28
            );
        }
      }


      const birthdayDifference =
        Math.ceil(
          (
            nextBirthdayDate.getTime() -
            endDate.getTime()
          ) /
          millisecondsPerDay
        );


      if (birthdayDifference === 0) {

        nextBirthday.textContent =
          "Today! 🎉";

      } else {

        nextBirthday.textContent =
          `${formatNumber(birthdayDifference)} days`;
      }


      // ----------------------------------------------------
      // SHOW RESULTS
      // ----------------------------------------------------

      results.hidden = false;

    }
  );


  // ========================================================
  // RESET
  // ========================================================

  resetButton.addEventListener(
    "click",
    function () {

      birthDateInput.value = "";

      todayDateInput.value =
        getTodayString();

      clearOutput();

    }
  );


  // ========================================================
  // AUTO CLEAR ERROR WHEN USER CHANGES DATE
  // ========================================================

  birthDateInput.addEventListener(
    "change",
    function () {

      error.hidden = true;
    }
  );


  todayDateInput.addEventListener(
    "change",
    function () {

      error.hidden = true;
    }
  );

});
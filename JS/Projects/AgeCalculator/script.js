const today = new Date();
console.log(today);

// const birthDate = new Date()

class ageCalc {
  constructor(cuurentDate) {
    this.year = cuurentDate.getFullYear();
    this.month = cuurentDate.getMonth();
    this.days = cuurentDate.getDate();
  }

  currentAge(year, month, days) {
    const currentMonthDays = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
    ).getDate();

    const lastmonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0,
    ).getDate();

    console.log(`Total days of current month: ${currentMonthDays}`);

    console.log(`Total days of last month: ${lastmonth}`);
    const ageList = [];
    console.log(`Current month: ${this.month + 1}`);
    console.log(`Current days: ${this.days}`);

    const yearDiff = this.year - year;
    const monthDiff = this.month + 1 - month;
    const daysDiff = this.days - days;
    console.log(`Months difference: ${monthDiff}`);
    const leapYear =
      (this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0;
    console.log(`Check leapyear: ${leapYear}`);

    if (days === 29 && month === 2 && !leapYear) {
      if (monthDiff <= 0) {
        if (daysDiff < 0) {
          ageList.push(yearDiff - 1, 12 - this.month - 1, -daysDiff);
        } else {
          ageList.push(yearDiff - 1, 12 - this.month - 1, daysDiff);
        }
      } else if (monthDiff > 0) {
        if (daysDiff < 0 && this.month === 2) {
          ageList.push(yearDiff, monthDiff - 1, lastmonth + daysDiff + 1);
        } else if (daysDiff < 0) {
          ageList.push(yearDiff, monthDiff - 1, lastmonth + daysDiff);
        } else {
          ageList.push(yearDiff, monthDiff, daysDiff);
        }
      }
    } else {
      if (monthDiff < 0) {
        if (daysDiff < 0) {
          ageList.push(yearDiff - 1, 12 + monthDiff - 1, lastmonth + daysDiff);
        } else {
          ageList.push(yearDiff - 1, 12 + monthDiff, daysDiff);
        }
      } else if (monthDiff >= 0) {
        if (daysDiff < 0) {
          ageList.push(yearDiff, monthDiff - 1, lastmonth + daysDiff);
        } else {
          ageList.push(yearDiff, monthDiff, daysDiff);
        }
      }
    }

    return ageList;
  }
}

const checkDate = new ageCalc(today);

function calcAge(event) {
  event.preventDefault();
  const birthDate = document.getElementById("ageValue").value;
  console.log(birthDate);
  if (!birthDate) {
    document.getElementsByTagName("h2")[0].innerText =
      `Date of birth cannot be empty. Please enter a date of birth.`;
    return;
  }
  const numBirth = new Date(birthDate);
  console.log(numBirth);
  if (numBirth > today) {
    document.getElementsByTagName("h2")[0].innerText =
      `Date of birth cannot be in future please enter valid date of birth`;
    return;
  }

  const result = checkDate.currentAge(
    numBirth.getFullYear(),
    numBirth.getMonth() + 1,
    numBirth.getDate(),
  );

  document.getElementsByTagName("h2")[0].innerText =
    `You are ${result[0]} years, ${result[1]} month, ${result[2]} days old.`;
}

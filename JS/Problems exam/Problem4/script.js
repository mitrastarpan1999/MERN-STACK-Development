function ageCalc() {
  const dateValue = document.getElementById("ageValue").value;

  console.log(dateValue);

  const currentDate = new Date();
  console.log("current date: ", currentDate);

  const ageValue = new Date(dateValue);
  //   console.log("current age: ",ageValue);
  const prevMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0,
  ).getDate();
  console.log(prevMonth);

  let years = currentDate.getFullYear() - ageValue.getFullYear();
  let months = currentDate.getMonth() - ageValue.getMonth();
  let days = currentDate.getDate() - ageValue.getDate();

  console.log(years, months, days);

  if (days < 0) {
    months--;
    days += prevMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const ageObj = {
    year: years,
    month: months,
    day: days,
  };

  console.log(ageObj);

  //   27 -3 -5 31

  if (!dateValue) {
    document.getElementById("ageResult").innerHTML =
      `Date of birth cannot be empty. Please enter valid age`;
  } else if (ageValue > currentDate) {
    document.getElementById("ageResult").innerHTML =
      `Date of birth cannot be in future. Please enter valid age`;
  } else {
    document.getElementById("ageResult").innerHTML =
      `Your age: ${ageObj.year} years, ${ageObj.month} months, ${ageObj.day} days.`;
  }
}

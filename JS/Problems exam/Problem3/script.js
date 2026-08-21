const students = [
  { name: "Rahul", marks: [78, 85, 69] },
  { name: "Priya", marks: [92, 88, 95] },
  { name: "Amit", marks: [45, 55, 48] },
  { name: "Sneha", marks: [67, 72, 80] },
  { name: "Arjun", marks: [35, 42, 39] },
];

const studentResult = [];

function studentAnalyzer(student) {
  let grade = "";

  student.forEach((element) => {
    const total = element.marks.reduce((acc, curr) => {
      return acc + curr;
    }, 0);

    console.log(total);
    const average = total / element.marks.length;
    // console.log(average);
    if (average >= 90) {
      grade = "A+";
    } else if (average >= 80 && average < 90) {
      grade = "A";
    } else if (average >= 70 && average < 80) {
      grade = "B";
    } else if (average >= 60 && average < 70) {
      grade = "C";
    } else if (average >= 50 && average < 60) {
      grade = "D";
    } else {
      grade = "F";
    }

    const objectArray = {
      name: element.name,
      total: total,
      average: +average.toFixed(2),
      Grade: grade,
    };

    studentResult.push(objectArray);
  });

  return studentResult;
}

const strResult = studentAnalyzer(students);

function topper() {
  let avgList = [];
  let passcount = 0;
  strResult.forEach((element) => {
    avgList.push(element.average);
  });

  avgList.sort((a, b) => b - a);
  // console.log(avgList[0]);
  const newObj = {
    highestAvg: avgList[0],
    lowestAvg: avgList[avgList.length - 1],
  };
  strResult.forEach((element) => {
    if (element.average === avgList[0]) {
      // console.log(element.name);
      newObj.toppername = element.name;
    }

    if (element.average === avgList[avgList.length - 1]) {
      newObj.lowest = element.name;
    }

    if (element.average >= 50) {
      passcount++;
    }
  });
  newObj.passCount = passcount;
  // console.log(newObj);
  return newObj;
}

const overAll = topper();

console.log(strResult);

console.log(overAll);

function showResult() {
  strResult.forEach((element) => {
    document.getElementById("showData").innerHTML += `
        <tr>
        <td>${element.name}</td>
        <td>${element.total}</td>
        <td>${element.average}</td>
        <td>${element.Grade}</td>
        </tr>
        `;
  });
}

document.getElementById("topperbtn").addEventListener("click", () => {
  document.getElementById("container").innerHTML = `
    <table border="1" style="height: 100px; width: 400px;">
            <tr>
                <th>Topper name</th>
                <th>Topper Average</th>
                <th>Lowest scorer</th>
                <th>Lowest average</th>
                <th>Pass count</th>
            </tr>
            <tbody>
                <tr>
                    <td>${overAll.toppername}</td>
                    <td>${overAll.highestAvg}</td>
                    <td>${overAll.lowest}</td>
                    <td>${overAll.lowestAvg}</td>
                    <td>${overAll.passCount}</td>
                    </tr>

            </tbody>
        </table>
    `;
});

window.onload = showResult;

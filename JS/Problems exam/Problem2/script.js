class employee {
  constructor(name, salary, department) {
    this.name = name;
    this.salary = salary;
    this.department = department;
  }

  calculateBonus() {
    if (this.salary < 50000) {
      return (this.salary * 5) / 100;
    } else if (this.salary >= 50000 && this.salary < 100000) {
      return (this.salary * 10) / 100;
    } else {
      return (this.salary * 20) / 100;
    }
  }
  getAnnualSalary() {
    return this.salary * 12 + this.calculateBonus();
  }

  getDetails() {
    const empdetails = {
      name: this.name,
      salary: this.salary,
      department: this.department,
      AnnualSalary: this.getAnnualSalary(),
      Bonus: this.calculateBonus(),
    };
    return empdetails;
  }
}

class Manager extends employee {
  constructor(name, salary, department, teamSize) {
    super(name, salary, department);
    this.teamSize = teamSize;
  }

  getDetails() {
    const manage = super.getDetails();

    manage.TeamSize = this.teamSize;

    return manage;
  }
}

const employeeDetails = [
  new employee("Rahul", 60000, "Development"),
  new employee("Alex", 50000, "Development"),
  new employee("Arpan", 75000, "Development"),
  new employee("David", 40000, "HR"),
  new employee("David", 40000, "Development"),
];



console.log(employeeDetails[0]);

let teamSize = 0;

employeeDetails.forEach((element) => {
  if (element.department.toLowerCase() === "development") {
    teamSize++;
  }
});

const result = new Manager(
  "Arvind",
  90000,
  "Management",
  teamSize
);

function showInfo(event) {
  event.preventDefault();

  document.getElementById("showData").innerHTML = "";
  for (let i = 0; i < employeeDetails.length; i++) {
    const details = employeeDetails[i].getDetails();
    console.log(details);

    document.getElementById("showData").innerHTML += `

            <tr>
            <td>${details.name}</td>
            <td>${details.department}</td>
            <td>${details.salary}</td>
            <td>${details.AnnualSalary}</td>
            <td>${details.Bonus}</td>
            
            </tr>
    `;
  }
  
const managerDetails = result.getDetails();

document.getElementById("managerdata").innerHTML = `
  <tr>
    <td>${managerDetails.name}</td>
    <td>${managerDetails.department}</td>
    <td>${managerDetails.salary}</td>
    <td>${managerDetails.AnnualSalary}</td>
    <td>${managerDetails.Bonus}</td>
    <td>${managerDetails.TeamSize}</td>
  </tr>
`;

  
  
}

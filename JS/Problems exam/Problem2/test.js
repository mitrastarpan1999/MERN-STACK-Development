const employeeDetails = [
  {
    name: "Rahul",
    salary: 60000,
    department: "Development"
  },
  {
    name: "Alex",
    salary: 50000,
    department: "Development"
  },
  {
    name: "Arpan",
    salary: 75000,
    department: "Development"
  },
  {
    name: "Priya",
    salary: 80000,
    department: "HR"
  }
];


let i = 0

employeeDetails.forEach(element => {
    
    if(element.department.toLowerCase() === "DeveLopment".toLowerCase()){
        i++
    }

});

console.log(i);

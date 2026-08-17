class employee{
    constructor (name, salary, department){
        this.name = name;
        this.salary = salary;
        this.department = department;
    }


    display(){
        console.log(this.name, this.salary, this.department);
        
    }
}

const empl = new employee("Arpan", 25000, "MERN");

empl.display()
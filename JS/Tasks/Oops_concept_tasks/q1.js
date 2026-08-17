class student{
    constructor (name, age, course){
        this.name = name;
        this.age = age;
        this.course = course;
    }

    display(){
        console.log(this.name, this.age, this.course);
        
    }
}


const std1 = new student("Arpan", 26, "MERN");

const std2 = new student("Alex", 24, "HTML");

std1.display()

std2.display()
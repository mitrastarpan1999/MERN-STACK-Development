class mobile{
    constructor(brand, model, price){
        this.brand = brand;
        this.model = model;
        this.price = price;
    }


    displayMobile(){
        console.log(`Mobile: ${this.brand}, Model: ${this.model}, Price: ${this.price}`);
        
    }


    applyDiscount(percent){
        let discount = this.price * (percent/100)
        this.price -= discount 
        return `Discount: ${discount}, Updated price: ${this.price}`;
        
    }
}


const mob = new mobile("Samsung", "S22 Ultra", 50000)

mob.displayMobile()

console.log(mob.applyDiscount(25));

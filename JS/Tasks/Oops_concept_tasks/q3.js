class Product {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    calculateTotal(){
        console.log(this.price * this.quantity);
        
    }
}


const Prod = new Product("Arpan", 500, 5)

Prod.calculateTotal()


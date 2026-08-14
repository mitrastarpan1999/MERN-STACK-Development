async function users(){
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const user = await response.json();
    return user;
}

async function orders(){
    const response = await fetch("https://fakestoreapi.com/carts");
    const order = await response.json();
    return order;
}

async function products(){
    const response = await fetch("https://fakestoreapi.com/products");
    const product = await response.json();
    return product;
}

async function main() {
    try{
        const promiseAll = await Promise.all([ users(), orders(), products()])
        console.log(promiseAll[0][0]);
        console.log(promiseAll[1][0]);
        console.log(promiseAll[2][0]);
                
        
        
        
        
    } catch(error) {
        console.log(error);
        
    }
}

main()
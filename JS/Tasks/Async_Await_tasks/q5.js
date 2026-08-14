async function getUser() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const user = await response.json();
    return user;
}


async function getOrders(userId){
    const order = {
        orderId: userId,

    }
    return order;

}


async function getPayment(orderId) {
    const payment = {
        paymentId: orderId
    }
    
    return payment;
}


async function main() {
    try{
        const result = await getUser();
        console.log(result[0]);
        const order = await getOrders(result[0].id)
        console.log(order);
        const payment = await getPayment(order.orderId)
        console.log(payment);
        
        
    } catch (error){
        console.log(error);
        
    }

}

main()

async function getUser() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const user = await response.json();

  return user;
}




async function getOrders(userId, emailAddress) {
  const order = {
    OrderId: 101,
    userID: userId,
    Email: emailAddress,
  };

  return order;
}

setTimeout(()=>{
    
})
async function getPayment(orderId) {
  const payment = {
    paymentID: orderId,
  };

  return payment;
}



async function main() {
  try {
    const result = await getUser();
    console.log(result[0].id, result[0].name);
    const order = await getOrders(result[0].id, result[0].email);
    console.log(order.OrderId);
    const payment = await getPayment(order.OrderId);
    console.log(payment.paymentID);
  } catch (error) {
    console.log(error);
  }
}

main()


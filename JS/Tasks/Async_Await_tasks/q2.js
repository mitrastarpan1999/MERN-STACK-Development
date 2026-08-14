function checkAge(age) {
  const myPromise = new Promise((resolve, reject) => {
    if (age >= 18) {
      resolve("You are eligible");
    } else {
      reject("You are not eligible");
    }
  });

  return myPromise;
}


async function main() {

    
    try {
        const result = await checkAge(17)
        console.log(result);
        
    } catch(error){
        console.log(error);
        
    }
    
}

main()
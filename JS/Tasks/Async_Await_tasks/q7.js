const time = 5000;
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Successful");
  }, time);
});

const newPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Request timeout");
  }, 2000);
});

async function main() {
  try {
    const result = await Promise.race([myPromise, newPromise]);
    console.log(result);
    
  } catch (error) {
    console.log(error);
    
  }
}

main();

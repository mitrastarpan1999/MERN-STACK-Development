const myPromise = new Promise((resolve, reject) => {
  const dataTime = setTimeout(() => {
    resolve("Data loaded");
  }, 2000);
});

async function main() {
  const result = await myPromise;
  console.log(result);
}

main();

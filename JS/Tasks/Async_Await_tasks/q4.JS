let random = Math.random();

// console.log(random);


const myPromise = new Promise((resolve, reject)=> {

    if(random >0.5){
        resolve("Succeed")
    } else{
        reject("Fails")
    }
})


async function main(){
    try{
        const result = await myPromise;
        console.log(result);
        
    } catch(error){
        console.log(error);
        
    }
}

main()
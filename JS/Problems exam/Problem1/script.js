async function users() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
}

const searchFilter = document.getElementById("search");

searchFilter.addEventListener("keypress", (event) => {
  console.log(event.key);
});

async function search() {
  const result = await users();

  const searchFilter = document.getElementById("search");
  searchFilter.addEventListener("input", (event) => {
    console.log(event.target.value);

    const searchResult = result.filter((user) =>
      user.name.toLowerCase().includes(event.target.value.toLowerCase()),
    );
    console.log(searchResult.length);
    document.getElementById("showData").innerHTML = "";
    searchResult.forEach((element) => {
      document.getElementById("showData").innerHTML += `
            <tr>
            <td>${element.name}</td>
            <td>${element.email}</td>
            <td>${element.phone}</td>
            <td>${element.website}</td>
            <td>${element.company.name}</td>
            <td>loaded</td>
            </tr>
    `;
    });
    if(searchResult.length === 0){
      document.getElementsByTagName("h3")[0].innerText = "No search found"
    } else {
      document.getElementsByTagName("h3")[0].innerText = ""
    }

  });


  
}
search();
async function main(event) {
  try {
    event.preventDefault();
    const result = await users();
    console.log(result[0].name);
    document.getElementById("showData").innerHTML = "";
    for (let i = 0; i < result.length; i++) {
      document.getElementById("showData").innerHTML += `
            <tr>
            <td>${result[i].name}</td>
            <td>${result[i].email}</td>
            <td>${result[i].phone}</td>
            <td>${result[i].website}</td>
            <td>${result[i].company.name}</td>
            <td>loaded</td>
            </tr>
    `;
    }
  } catch (error) {
    console.log(error);

    document.getElementsByTagName("h1")[0].innerText =
      `Unable to load users. ${error.message}`;
  }
}

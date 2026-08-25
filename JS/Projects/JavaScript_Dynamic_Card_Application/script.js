let editKey = null;

class card {
  constructor(dataObject) {
    this.dataObject = dataObject;
  }

  cardData() {
    const data = JSON.parse(localStorage.getItem(1)) || [];

    data.push(this.dataObject);
    localStorage.setItem(1, JSON.stringify(data));
  }
}

function cardRender(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const image = document.getElementById("image").value;
  const course = document.getElementById("course").value;

  if (!name || !email || !phone || !image || !course) {
    document.getElementById("validation").innerHTML =
      `<h3>Fields cannpt be empty.</h3>`
    return
  }

  if (editKey === null) {
    const showCard = new card({
      name: name,
      email: email,
      phone: phone,
      url: image,
      course: course,
    });
    showCard.cardData();
    document.getElementById("validation").innerHTML = ""
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("image").value = "";
    document.getElementById("course").value = "";
    renderDisplay();
  } else {
    const newObj = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      url: document.getElementById("image").value,
      course: document.getElementById("course").value,
    };

    console.log("newObject", newObj);
    const data = JSON.parse(localStorage.getItem(1)) || [];
    data[editKey] = newObj;
    console.log("final data: ", data);
    localStorage.setItem(1, JSON.stringify(data));

    renderDisplay();

    editKey = null;
    document.getElementById("validation").innerHTML = ""
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("image").value = "";
    document.getElementById("course").value = "";
    document.getElementById("btnChange").innerText = "Create Card";
  }
}

function renderDisplay() {
  const data = JSON.parse(localStorage.getItem(1)) || [];
  console.log("data: ", data);

  document.getElementById("cardContainer").innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    document.getElementById("cardContainer").innerHTML += `<div class="card">
            <img src= ${data[i].url} alt="profileimg">
            <p>Name: ${data[i].name}</p>
            <p>Phone: ${data[i].phone}</p>
            <p>Email address: ${data[i].email}</p>
            <p>Course: ${data[i].course}</p>
            <button onclick="deletebtn(${i})" >Delete</button>
            <button onclick="editbtn(${i})" > Edit </button>
        </div>`;
  }
}

function deletebtn(key) {
  const data = JSON.parse(localStorage.getItem(1)) || [];
  if (confirm("Are you sure?")) {
    data.splice(key, 1);
    localStorage.setItem(1, JSON.stringify(data));
  }


  renderDisplay();
}

function editbtn(key) {
  const data = JSON.parse(localStorage.getItem(1)) || [];
  console.log(data[key]);
  editKey = key;

  document.getElementById("name").value = data[key].name;
  document.getElementById("email").value = data[key].email;
  document.getElementById("phone").value = data[key].phone;
  document.getElementById("image").value = data[key].url;
  document.getElementById("course").value = data[key].course;

  document.getElementById("btnChange").innerText = " Edit ";
}

window.onload = renderDisplay;

let editBtn = null;

function subData(event) {
  event.preventDefault();
  const user = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const course = document.getElementById("course").value;

  let submitData = {
    name: user,
    age: age,
    course: course,
  };

  //   console.log(submitData);

  if (editBtn === null && submitData.age > 0) {
    const keys = Object.keys(localStorage).sort((a, b) => a - b);

    console.log(keys);

    const newKey = keys.length > 0 ? Number(keys[keys.length - 1]) + 1 : 1;

    localStorage.setItem(newKey, JSON.stringify(submitData));
  } else if (editBtn !== null && submitData.age > 0) {
    localStorage.setItem(editBtn, JSON.stringify(submitData));
    document.getElementById("btnChange").innerText = "Save";
    editBtn = null;
  } else {
    alert("Put a valid age");
    return
  }

  display();
}

function display() {
  const student = document.getElementById("studentList");
  student.innerHTML = "";
  const keys = Object.keys(localStorage).sort((a, b) => a - b);
  for (key of keys) {
    const localData = JSON.parse(localStorage.getItem(key));
    if (localData) {
      student.innerHTML += `
              <tr>
                  <td>${key}</td>
                  <td>${localData.name}</td>
                  <td>${localData.age}</td>
                  <td>${localData.course}</td>
                  <td><button data-edit= ${key}>Edit</button></td>
                  <td><button data-key= ${key}>Delete</button></td>

              </tr>
          `;
    }
  }
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("course").value = "";
}

display();
function del() {
  const studentList = document.getElementById("studentList");

  studentList.addEventListener("click", (event) => {
    const btnKey = event.target.dataset.key;

    // console.log(btnKey);
    if (btnKey) {
      localStorage.removeItem(btnKey);
      display();
    } else {
      const editKey = event.target.dataset.edit;
      editBtn = editKey;
      console.log(editBtn);
      const localData = JSON.parse(localStorage.getItem(editKey));
      console.log(localData);

      document.getElementById("name").value = `${localData.name}`;
      document.getElementById("age").value = `${localData.age}`;
      document.getElementById("course").value = `${localData.course}`;
      document.getElementById("btnChange").innerText = "Update";
    }
  });
}

del();

console.log("connected");

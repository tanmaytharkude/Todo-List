let btn = document.querySelector("button");
let ul = document.querySelector("ul");
let inp = document.querySelector("input");

btn.addEventListener("click", function () {
  let item = document.createElement("li");
  item.innerText = inp.value;

  let delbtn = document.createElement("button");
  delbtn.innerText = "Delete";
  delbtn.classList.add("delete");

  let donebtn = document.createElement("button");
  donebtn.innerText = "Done";
  donebtn.classList.add("done");

  item.appendChild(delbtn);
  item.appendChild(donebtn);
  ul.appendChild(item);
  inp.value = "";
});

ul.addEventListener("click", function (event) {
  let listItem = event.target.parentElement;
  if (event.target.classList.contains("delete")) {
    listItem.remove();
  } else if (event.target.classList.contains("done")) {
    listItem.classList.toggle("done");
  }
});

// Initialize app
function init() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function renderTasks() {
    ul.innerHTML = "";
    tasks.forEach((task) => {
      if (task.text) {
        let item = document.createElement("li");
        item.innerText = task.text;

        let delbtn = document.createElement("button");
        delbtn.innerText = "Delete";
        delbtn.classList.add("delete");

        let donebtn = document.createElement("button");
        donebtn.innerText = "Done";
        donebtn.classList.add("done");

        item.appendChild(delbtn);
        item.appendChild(donebtn);
        ul.appendChild(item);
      }
    });
  }

  function addTask() {
    let taskText = inp.value.trim();
    if (taskText) {
      tasks.push({ text: taskText });
      saveTasks();
      renderTasks();
      inp.value = "";
    }
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  btn.addEventListener("click", addTask);

  renderTasks();
}

init();

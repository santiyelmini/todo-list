let tasks = [];

class Task {
  constructor(name) {
    this.name = name;
    this.status = "pending";
    this.id = null;
  }
}

const taskName = document.querySelector(".taskName");
const taskInput = document.querySelector(".taskInput");
const tasksContainer = document.querySelector(".tasksContainer");
const addBtn = document.querySelector(".btnAdd");
addBtn.addEventListener("click", createTask);

function createTask() {
  const name = taskInput.value;
  const taskExists = tasks.some((task) => task.name === name);
  if (taskExists) {
    alert("That task already exists!")
    return;
  }
  if(name === "") {
    alert("Please insert a name!")
    return;
  }
  const task = new Task(name);
  tasks.push(task);
  const id = tasks.indexOf(task);
  task.id = id;
  const div = document.createElement("div");
  div.classList.add("taskItem");
  div.innerHTML = `
    <span class="taskName">${name}</span>
    <i class='bx bx-trash deleteBtn' data-id="${id}"></i>`;
  tasksContainer.append(div);
  const deleteBtn = div.querySelector(".deleteBtn");
  deleteBtn.addEventListener("click", deleteTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  if (tasks.length > 0) {
    const emptyMsg = document.querySelector(".emptyMsg");
    if (emptyMsg) {
      emptyMsg.remove();
    }
  }
  taskInput.value = "";
}

function deleteTask(event) {
  const id = Number(event.target.getAttribute("data-id"));
  const parentElement = event.target.parentNode;
  parentElement.remove();
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
  }
}

function showTasks() {
  tasksContainer.innerHTML = "";
  if (tasks.length === 0) {
    const div = document.createElement("div");
    div.textContent = "Your task list is empty.";
    div.classList.add("emptyMsg")
    tasksContainer.append(div);
  } else {
    tasks.forEach((task) => {
      const div = document.createElement("div");
      div.classList.add("taskItem");
      div.innerHTML = `
        <span class="taskName">${task.name}</span>
        <i class='bx bx-trash deleteBtn' data-id="${task.id}"></i>`;
      tasksContainer.append(div);
      const deleteBtn = div.querySelector(".deleteBtn");
      deleteBtn.addEventListener("click", deleteTask);
    });
  }
}


let tasksLs = JSON.parse(localStorage.getItem("tasks"));
if (tasksLs) {
  tasks = tasksLs;
} else {
  tasksLs = [];
}



showTasks();


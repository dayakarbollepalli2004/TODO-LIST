let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedTasks) {
    tasks = storedTasks;
    updateTasksList();
    updateStats();
  }
});

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
  const taskInput = document.getElementById("taskinput");
  const text = taskInput.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });
    taskInput.value = "";
    updateTasksList();
    updateStats();
    saveTasks();
  }
};

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTasksList();
  updateStats();
  saveTasks();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveTasks();
};

const editTask = (index) => {
  const taskInput = document.getElementById("taskinput");
  taskInput.value = tasks[index].text;
  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveTasks();
};

const updateStats = () => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

  const progressBar = document.getElementById("progress");
  progressBar.style.width = `${progress}%`;

  document.getElementById("numbers").innerHTML = `${completedTasks}/${totalTasks}`;
};

const updateTasksList = () => {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
      <div class="taskitem">
        <div class="task ${task.completed ? 'completed' : ''}">
          <input type="checkbox" ${task.completed ? "checked" : ""}/>
          <p>${task.text}</p>
        </div>
        <div class="icons">
          <img src="./img/edit.png" onclick="editTask(${index})" />
          <img src="./img/bin.png" onclick="deleteTask(${index})"/>
        </div>
      </div>
    `;

    listItem.querySelector("input[type='checkbox']").addEventListener("change", () => toggleTaskComplete(index));
    taskList.appendChild(listItem);
  });
};

document.getElementById("newtask").addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});

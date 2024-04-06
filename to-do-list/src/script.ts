const inputBox = document.getElementById("input-box") as HTMLInputElement;
const listContainer = document.getElementById(
  "list-container"
) as HTMLInputElement;
const completedCounter = document.getElementById(
  "completed-counter"
) as HTMLInputElement;
const uncompletedCounter = document.getElementById(
  "uncompleted-counter"
) as HTMLInputElement;

function updateCounters() {
  const completedTasks = document.querySelectorAll(".completed").length;
  const uncompletedTasks =
    document.querySelectorAll("li:not(.completed)").length;

  completedCounter.textContent = completedTasks.toString();
  uncompletedCounter.textContent = uncompletedTasks.toString();
}

function addTask() {
  const task = inputBox.value.trim();
  if (!task) {
    alert("Please write down a task");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <label>
      <input type="checkbox">
      <span>${task}</span>
    </label>
    <span class="edit-btn">Edit</span>
    <span class="delete-btn">Delete</span>
    `;

  listContainer.appendChild(li);

  inputBox.value = " ";

  const checkbox = li.querySelector("input") as HTMLInputElement;
  const editBtn = li.querySelector(".edit-btn") as HTMLInputElement;
  const taskSpan = li.querySelector("span") as HTMLInputElement;
  const deleteBtn = li.querySelector(".delete-btn") as HTMLInputElement;

  checkbox.addEventListener("click", function () {
    li.classList.toggle("completed", checkbox.checked);
    updateCounters();
  });

  editBtn.addEventListener("click", function () {
    const update = prompt("Edit task:");
    if (update !== null) {
      taskSpan.textContent = update;
      li.classList.remove("completed");
      checkbox.checked = false;
      updateCounters();
    }
  });

  deleteBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete this task?")) {
      li.remove();
      updateCounters();
    }
  });
  updateCounters();
}

inputBox.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

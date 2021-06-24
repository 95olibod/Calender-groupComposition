function initTodos() {
  fetchTodosFromLocalStorage();
  addClickEventOnAddButton();
  addEventListenerForMobileCalendar();
}

function addEventListenerForMobileCalendar() {
  const mobileCalender = document.getElementById("date-for-mobile");
  console.log(mobileCalender);

  mobileCalender.addEventListener("input", (event) => {
    state.selectedDate = new Date(event.target.value);
    renderTodos();
    selectDateForMiniCalendar(mobileCalender.value);
  });
}

function fetchTodosFromLocalStorage() {
  const todosString = localStorage.getItem("todos");
  state.todos = JSON.parse(todosString || "[]", dateReviver);
  renderTodos();
}

function renderTodos() {
  const mobileCalender = document.getElementById("date-for-mobile");
  console.log(mobileCalender);

  //event för när man klickat? - till Linn
  mobileCalender.addEventListener("input", (event) => {
    state.selectedDate = new Date(mobileCalender.value);
  });

  const ul = document.getElementById("todoList");
  const template = document.getElementById("todo-item-template");
  ul.innerHTML = "";

  const todoList = state.todos;
  state.filteredTodoList.length = 0;

  for (const todo of todoList) {
    const todoDateString = todo.date.toLocaleDateString();

    const todoSelectedDateString = state.selectedDate.toLocaleDateString();

    if (todoDateString == todoSelectedDateString) {
      state.filteredTodoList.push(todo);
    }
  }

  for (const todo of state.filteredTodoList) {
    const listItem = template.content.cloneNode(true);
    const removeBtn = listItem.getElementById("remove-btn");

    const span = listItem.querySelector("span");
    span.innerText = todo.text;

    removeBtn.addEventListener("click", () => removeTodoItem(todo));

    ul.append(listItem);
  }
}

function addClickEventOnAddButton() {
  const button = document.getElementById("s-add-btn");
  button.disabled = false;
  button.addEventListener("click", displayTodoForm);
}

function displayTodoForm() {
  const todoForm = document.getElementById("todo-form-div");
  todoForm.classList.remove("dis-none");
  todoForm.classList.add("flex");

  var currentDate = document.querySelector('input[type="date"]');
  currentDate.value = new Date().toLocaleDateString();

  blurBackground();

  const close = document.getElementById("close-button");
  close.addEventListener("click", closeTodoForm);

  const submit = document.getElementById("todo-form");
  submit.addEventListener("submit", saveFromSubmit);
}

/**
 *
 * @param {Event} event
 */
function saveFromSubmit(event) {
  event.preventDefault();
  const inputText = event.target.querySelector("#todo-text");

  const inputDate = event.target.querySelector("#date");
  const todoItem = {
    text: inputText.value,
    date: new Date(inputDate.value),
  };

  state.todos.push(todoItem);
  const todoDateString = todoItem.date.toLocaleDateString();
  const todoSelectedDateString = state.selectedDate.toLocaleDateString();

  if (todoDateString == todoSelectedDateString) {
    state.filteredTodoList.push(todoItem);
  }

  inputText.value = ""; // clear input text field
  closeTodoForm();
  saveTodosListToLocalStorage();
  renderTodos();
  renderCalender();
}

function saveTodosListToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(state.todos));
}

function dateReviver(key, value) {
  if (key === "date") {
    return new Date(value);
  }

  return value;
}

function closeTodoForm() {
  const todoForm = document.getElementById("todo-form-div");
  todoForm.classList.remove("flex");
  todoForm.classList.add("dis-none");
  unblurBackground();
}

function blurBackground() {
  //Get all elements to be blured
  const body = document.getElementById("main-container");
  const footer = document.querySelectorAll("footer");
  const header = document.querySelector("header");

  //Add blurr-class to elements

  body.classList.add("blur");
  footer[0].classList.add("blur");
  footer[1].classList.add("blur");
  header.classList.add("blur");
}

function unblurBackground() {
  //Get all elements to be blured
  const body = document.getElementById("main-container");
  const footer = document.querySelectorAll("footer");
  const header = document.querySelector("header");

  //Remove blurr-class to elements
  body.classList.remove("blur");
  footer[0].classList.remove("blur");
  footer[1].classList.remove("blur");
  header.classList.remove("blur");
}

function removeTodoItem(todo) {
  const index = state.todos.indexOf(todo);
  state.todos.splice(index, 1);

  if (todo.date == state.selectedDate) {
    const index = state.filteredTodoList.indexOf(todo);
    state.filteredTodoList.splice(index, 1);
  }
  saveTodosListToLocalStorage();
  renderTodos();
  renderCalender();
}

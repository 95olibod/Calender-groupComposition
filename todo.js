function initTodos() {
  fetchTodosFromLocalStorage();
  addClickEventOnAddButton();
}

function fetchTodosFromLocalStorage() {
  const todosString = localStorage.getItem("todos");
  state.todos = JSON.parse(todosString || "[]");
  renderTodos();
}

function renderTodos() {
  const ul = document.getElementById("todoList");
  const template = document.getElementById("todo-item-template");
  ul.innerText = "";

  for (const todo of state.todos) {
    const listItem = template.content.cloneNode(true);
    const removeButton = template.content.getElementById("remove-btn").cloneNode(true);
    const span = listItem.querySelector("span");
    span.innerText = todo.text;

    removeButton.addEventListener("click", () => removeTodoItem(todo));

    ul.append(removeButton);
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
  currentDate.value = new Date().toISOString().slice(0, 10);

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
    date: inputDate.value,
  };

  state.todos.push(todoItem);
  inputText.value = ""; // clear input text field
  closeTodoForm();
  renderTodos();
  saveTodosListToLocalStorage();
}

function saveTodosListToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(state.todos));
  location.reload();
  // clearCalender();
  // renderCalender();
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
  saveTodosListToLocalStorage();
  renderTodos();
}

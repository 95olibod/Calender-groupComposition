function initTodos() {
  fetchTodosFromLocalStorage();
  addClickEventOnAddButton();
  addEventListenerForMobileCalendar();
}

//Mini calendar for mobile size (only visible on screens <= 480px)

function addEventListenerForMobileCalendar() {
  const mobileCalender = document.getElementById("calendar-for-mobile");
  mobileCalender.addEventListener("input", (event) => {
    state.selectedDate = new Date(event.target.value);
    renderTodos();
    selectDateForMiniCalendar(mobileCalender.value);
  });
}

//Fetches todos saved in local storage

function fetchTodosFromLocalStorage() {
  const todosString = localStorage.getItem("todos");
  state.todos = JSON.parse(todosString || "[]", dateReviver);
  renderTodos();
}

//Render li elements - todos based on either current date by default or selected date.

function renderTodos() {
  const ul = document.getElementById("todoList");
  const template = document.getElementById("todo-item-template");
  ul.innerHTML = "";

  state.filteredTodoList = [];

  filterTodosByDate();

  for (const todoItem of state.filteredTodoList) {
    const listItem = template.content.cloneNode(true);
    const removeBtn = listItem.getElementById("remove-btn");
    const editBtn = listItem.getElementById("edit-btn");
    const todoItemText = listItem.querySelector("#todo-item-text");
    todoItemText.innerText = todoItem.text;

    removeBtn.addEventListener("click", () => removeTodoItem(todoItem));
    editBtn.addEventListener("click", () => displayTodoForm(todoItem));

    ul.append(listItem);
  }
}

// Filters todos so they match selected date

function filterTodosByDate() {
  const todoList = state.todos;

  for (const todoItem of todoList) {
    const todoDateString = todoItem.date.toLocaleDateString();
    const todoSelectedDateString = state.selectedDate.toLocaleDateString();

    if (todoDateString == todoSelectedDateString) {
      state.filteredTodoList.push(todoItem);
    }
  }
}

// Trigger click-event when add button is clicked

function addClickEventOnAddButton() {
  const button = document.getElementById("add-btn");
  button.disabled = false;
  button.addEventListener("click", () => displayTodoForm());
}

// Displays form for adding todos

function displayTodoForm(todoItem) {
  const todoForm = document.getElementById("todo-form-container");
  todoForm.classList.remove("dis-none");
  todoForm.classList.add("flex");

  setDefaultValuesOnTodoForm(todoItem);
  blurBackground();

  const close = document.getElementById("close-btn");
  close.addEventListener("click", closeTodoForm);

  const form = document.getElementById("todo-form");
  form.onsubmit = (event) => saveFromSubmit(event, todoItem);
}

// Sets default date in calendar and default text in text area when using form

function setDefaultValuesOnTodoForm(todoItem) {
  var currentDate = document.querySelector('input[type="date"]');
  var currentText = document.querySelector("#todo-text");

  if (todoItem) {
    currentDate.value = todoItem.date.toLocaleDateString();
    currentText.value = todoItem.text;
  } else currentDate.value = state.selectedDate.toLocaleDateString();
}

// Saves or edits todos depending on type of submit (edit or save)
/**
 *
 * @param {Event} event
 */
function saveFromSubmit(event, todoItem) {
  event.preventDefault();
  const inputText = event.target.querySelector("#todo-text");
  const inputDate = event.target.querySelector("#todo-date");

  if (todoItem) {
    todoItem.text = inputText.value;
    todoItem.date = new Date(inputDate.value);
  } else {
    const newTodoItem = {
      text: inputText.value,
      date: new Date(inputDate.value),
    };

    state.todos.push(newTodoItem);
  }

  inputText.value = ""; // clear input text field
  closeTodoForm();
  saveTodosListToLocalStorage();
  renderTodos();
  renderCalender();
}

// Saves todos to localStorage with key and value of state.todos as a string

function saveTodosListToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(state.todos));
}

// Parses string to date if key is "date"

function dateReviver(key, value) {
  if (key === "date") {
    return new Date(value);
  }

  return value;
}

// Closes the todo form

function closeTodoForm() {
  const todoForm = document.getElementById("todo-form-container");
  todoForm.classList.remove("flex");
  todoForm.classList.add("dis-none");
  unblurBackground();
}

// Blur background when form is visible

function blurBackground() {
  const elementArray = fetchElementsForBlurEffect();
  for (const element of elementArray) {
    element.classList.add("blur");
  }
}

// Unblur background when form is closed

function unblurBackground() {
  const elementArray = fetchElementsForBlurEffect();
  console.log(elementArray);

  for (const element of elementArray) {
    element.classList.remove("blur");
  }
}

// Fetches the elements to be blurred/unblurred 

function fetchElementsForBlurEffect() {
  const main = document.getElementById("main-container");
  const footerBack = document.getElementById("footer-back");
  const footerFront = document.getElementById("footer-front")
  const header = document.getElementById("header");

  return [main, footerBack, footerFront, header];
}

// Removes a todo item 

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

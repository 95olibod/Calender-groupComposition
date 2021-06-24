function initTodos() {
  fetchTodosFromLocalStorage();
  addClickEventOnAddButton();
  addEventListenerForMobileCalendar()
}

function addEventListenerForMobileCalendar() {
  const mobileCalender = document.getElementById("date-for-mobile");
  mobileCalender.addEventListener("input", (event) => {
    console.log(mobileCalender.value);
    state.selectedDate = new Date(event.target.value);
    renderTodos();
    // renderCurrentDate(state.selectedDate);
  });
}

function fetchTodosFromLocalStorage() {
  const todosString = localStorage.getItem("todos");
  state.todos = JSON.parse(todosString || "[]", dateReviver);
  renderTodos();
}

function renderTodos() {
  const ul = document.getElementById("todoList");
  const template = document.getElementById("todo-item-template");
  
  const todoList = state.todos;
  state.filteredTodoList = [];
  
  ul.innerHTML = "";

  for (const todoItem of todoList) {
      const todoDateString = todoItem.date.toLocaleDateString();

      const todoSelectedDateString = state.selectedDate.toLocaleDateString();

      if (todoDateString == todoSelectedDateString) {
          state.filteredTodoList.push(todoItem);
      }
  }
  
  for (const todoItem of state.filteredTodoList) {
    const listItem = template.content.cloneNode(true);
    const removeBtn = listItem.getElementById("remove-btn");
    const editBtn = listItem.getElementById("edit-btn");

    const span = listItem.querySelector("span");
    span.innerText = todoItem.text;

    removeBtn.addEventListener("click", () => removeTodoItem(todoItem));
    editBtn.addEventListener("click", () => displayTodoForm(todoItem));

    ul.append(listItem);
  }
}

function addClickEventOnAddButton() {
  const button = document.getElementById("s-add-btn");
  button.disabled = false;
  button.addEventListener("click", () => displayTodoForm());
}

function displayTodoForm(todoItem) {
  const todoForm = document.getElementById("todo-form-div");
  todoForm.classList.remove("dis-none");
  todoForm.classList.add("flex");

  var currentDate = document.querySelector('input[type="date"]');
  var currentText = document.querySelector("#todo-text");

  if(todoItem)
  {
    currentDate.value = todoItem.date.toLocaleDateString();
    currentText.value = todoItem.text;
  } else currentDate.value = state.selectedDate.toLocaleDateString();

  blurBackground();

  const close = document.getElementById("close-button");
  close.addEventListener("click", closeTodoForm);

  const form = document.getElementById("todo-form");
  
  form.onsubmit = (event) => saveFromSubmit(event, todoItem);
}

/**
 *
 * @param {Event} event
 */
function saveFromSubmit(event, todoItem) {
  console.log("todoitem.text = " + todoItem);
  event.preventDefault();
  const inputText = event.target.querySelector("#todo-text");
  const inputDate = event.target.querySelector("#date");

  if (todoItem) {
    console.log("inne i if");

    todoItem.text = inputText.value;
    todoItem.date = new Date(inputDate.value);
    console.log(todoItem.text);
  }
  else {
    console.log("inne i else");

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

function saveTodosListToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(state.todos));
}

function dateReviver(key, value) {
  if (key === 'date') {
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
  
  if (todo.date == state.selectedDate)
  {
      const index = state.filteredTodoList.indexOf(todo);
  state.filteredTodoList.splice(index, 1);
  }
  saveTodosListToLocalStorage();
  renderTodos();
  renderCalender();
}

// function editTodoItem(todoItem) {
//   displayTodoForm(todoItem);
// }

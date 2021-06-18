function initTodo() {
  // renderTodoList();
  // addFormFromClickEvent();
  addClickEventOnButton();
}

function addClickEventOnButton() {
  const button = document.getElementById("s-add-btn");
  button.disabled = false;
  button.addEventListener("click", displayTodoForm);
}

function displayTodoForm() {
  const todoForm = document.getElementById("todo-form");
  todoForm.classList.remove("dis-none");
  todoForm.classList.add("flex");

  var currentDate = document.querySelector('input[type="date"]');
  currentDate.value = new Date().toISOString().slice(0, 10);

  blurBackground();

  const close = document.getElementById("close-button");
  close.addEventListener("click", closeTodoForm);
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

function closeTodoForm() {
  const todoForm = document.getElementById("todo-form");
  todoForm.classList.remove("flex");
  todoForm.classList.add("dis-none");
  unblurBackground();
}

function unblurBackground() {
  //Get all elements to be blured
  const body = document.getElementById("main-container");
  const footer = document.querySelectorAll("footer");
  const header = document.querySelector("header");

  //Add blurr-class to elements
  body.classList.remove("blur");
  footer[0].classList.remove("blur");
  footer[1].classList.remove("blur");
  header.classList.remove("blur");
}
// function renderInputForm() {}

// function openForm() {

//   //Disable button so it can't be clicked more than once.

//   document.getElementById("s-add-btn").disabled = true;

//   //create form

//   form = document.createElement("form");
//   form.setAttribute("name", "myForm")
//   form.setAttribute("method", "post");
//   form.setAttribute("placeholder", "Todo...")
//   form.setAttribute("action", "submit.php");
//   form.classList.add("todo-form");

//   //create input for form
//   const input = document.createElement("input"); //input element, text
//   input.setAttribute("type", "text");
//   input.setAttribute("value", "Lägg till todo..")
//   input.classList.add("todo-input");

//   //Remove welcometext when input clicked
//   input.addEventListener("click", () =>{
//     input.value ="";
//   });

//   //create submit button for form
//   const submit = document.createElement("input"); //input element, Submit button
//   submit.setAttribute("type", "submit");
//   submit.setAttribute("value", "O");
//   submit.classList.add("s-btn-round", "s-btn-onLine", "s-small-btn");

//   //   const close = document.createElement("input");
//   //   close.setAttribute("type", "submit");
//   //   close.setAttribute("value", "X");
//   //   close.classList.add("s-btn-round", "s-btn-onLine", "s-small-btn");

//   //add elements to form
//   form.appendChild(input);
//   form.appendChild(submit);
//   //   form.appendChild(close);

//   //add elements to aside
//   document.getElementById("aside-content-wrapper").appendChild(form);
//   form.addEventListener("submit", createTodo);
// }

// /**
//  *
//  * @param {Event} event
//  */
// function createTodo(){
//     const todo = {
//       text: input.value,
//       date: new Date().getDay()
//     };

//     console.log(todo);

//     // state.push(todo);
// }

// function renderTodoList() {
//     const ul = document.querySelector("ul");
//     ul.innerText = ""; /* för att inte skriva om todos fler gånger än en. */

//     for(const todo of todos){
//         const li = document.createElement("li");
//         li.innerText = todo;
//         ul.append(li);
//     }
// }

// function addFormFromClickEvent() {
//     const form = document.querySelector("form");
//     form.addEventListener("submit", handleFormSubmit)
// }

//  /**
//   *
//   * @param {Event} event
//   */
// function handleFormSubmit(event) {
//     event.preventDefault();
//     const input = event.target.querySelector("input");
//     todos.push(input.value);
//     input.value = "";
// }

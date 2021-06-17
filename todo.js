function createTodo() {
  // renderTodoList();
  // addFormFromClickEvent();
  createInputEventOnButton();
}

function createInputEventOnButton() {
  const button = document.getElementById("s-add-btn");

  //   if (document.getElementById("test"))
  //   console.log(form);
  // {
  //   button.setAttribute("disable", true);
  // }
  document.getElementById("s-add-btn").disabled = false;
  button.addEventListener("click", openForm);
}

function renderInputForm() {}

function openForm() {
  console.log("du har tryckt på knappen");
  document.getElementById("s-add-btn").disabled = true;
  form = document.createElement("form");
  form.setAttribute("id", "test")
  form.setAttribute("method", "post");
  form.setAttribute("placeholder", "Todo...")
  form.setAttribute("action", "submit.php");
  form.classList.add("todo-form");


  const input = document.createElement("input"); //input element, text
  input.setAttribute("type", "text");
  input.setAttribute("date", "undefined");
  input.classList.add("todo-input");

  const submit = document.createElement("input"); //input element, Submit button
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "O");
  submit.classList.add("s-btn-round", "s-btn-onLine", "s-small-btn");
  
  //   const close = document.createElement("input");
  //   close.setAttribute("type", "submit");
  //   close.setAttribute("value", "X");
  //   close.classList.add("s-btn-round", "s-btn-onLine", "s-small-btn");
  
  form.appendChild(input);
  form.appendChild(submit);
  //   form.appendChild(close);
  
  document.getElementById("aside-content-wrapper").appendChild(form); 

  form.addEventListener("submit", addTodoToArray);
}

/**
 * 
 * @param {Event} event 
 */
function addTodoToArray(event){
    const todo = event.target.querySelector("input");

    
}












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

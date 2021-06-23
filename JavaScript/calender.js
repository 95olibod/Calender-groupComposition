function initCalender() {
  setCurrentMonthAndYear();
  renderCalender();
}

function setCurrentMonthAndYear() {
  state.selectedDate = new Date();
  state.currentMonth = new Date().getMonth();
  state.currentYear = new Date().getFullYear();
}

async function renderCalender() {
  renderTitle(state.currentMonth, state.currentYear);
  let selectedMonthData = await getSelectedMonthData(
    state.currentYear,
    state.currentMonth
  );
  let firstDayOfweek = getDayOfWeekForFirstOfMonth(selectedMonthData);
  // let numberOfDaysInMonth = getNumberOfDaysInSelectedMonth(selectedMonthData);
  // let previousMonthDays = await previousMonthNumberOfDays(selectedMonthData);
  let container = document.querySelector(".m-calender-container");
  container.innerHTML = "";

  // ********************************************
  // bryt ut fler functioner nedan!!
  // ********************************************

  // Skippa de först dagarna
  //   for (let i = 0; i < firstDayOfweek - 1; i++) {
  //     const emptyDiv = document.createElement("div");
  //     container.append(emptyDiv);
  //     container.append(box);
  // }

  const numberPrevious = await getNumberOfDaysInPreviousMonth(
    state.currentYear,
    state.currentMonth
  );

  for (let i = numberPrevious - (firstDayOfweek - 1); i < numberPrevious; i++) {
    const emptyDiv = createLastDaysOfPreviousMonthBox(i);
    emptyDiv.className =
      "empty-box flex col ali-center m-todo-margin-r m-todo-margin-b";
    container.append(emptyDiv);
  }

  // Ritar alla boxar
  for (const day of selectedMonthData) {
    const div = createDayBox(day);
    container.append(div);
  }

  // Ritar ut första dagarna i kommande månad
  const numberNext = await getNumberOfDaysIncommingMonth(
    state.currentYear,
    state.currentMonth
  );
  const totalDays =
    numberNext + getNumberOfDaysInSelectedMonth(selectedMonthData);
  console.log(totalDays);
  const lastWeekDay = getLastWeekDayInMonth(selectedMonthData);
  const numbersInNextMonth = 7 - lastWeekDay;
  console.log(numbersInNextMonth);
  for (let i = 0; i < numbersInNextMonth; i++) {
    const emptyDiv = createLastDaysOfPreviousMonthBox(
      i + 1
    ); /*fel funktion? alt. byt namn*/
    emptyDiv.className =
      "empty-box flex col ali-center m-todo-margin-r m-todo-margin-b";

    container.append(emptyDiv);
  }
}

function createLastDaysOfPreviousMonthBox(day) {
  const emptyDiv = document.getElementById("calendar-day-box");
  const box = emptyDiv.content.firstElementChild.cloneNode(true);
  const emptyDayDate = box.querySelector(".p-date");
  emptyDayDate.innerText = day;
  return box;
}

function createFirstDaysOfCommingMonth(day) {
  // omvänd ovan function-ish
}

function createDayBox(day) {
  const template = document.getElementById("calendar-day-box");
  const box = template.content.firstElementChild.cloneNode(true);

  const redDayText = getRedDayText(day);

  
  const redDayBox = box.querySelector(".p-red-day-box");
  //redDayBox.innerText = redDayText; SES ÖVER. Är null****************************************************

  const dayParagraph = box.querySelector(".p-date");
  dayParagraph.innerText = new Date(day.datum).getDate();
  const numberOfTodos = box.querySelector(".todos");

  const todos = getNumberOfTodos(day);
  if (todos > 0) {
    // const color = document.querySelector(".m-todo-box"); // VART SKA DETTA LIGGA???????????????????????????
    // color.className = "color";
    numberOfTodos.innerText = todos;
  }

  box.addEventListener("click", () => selectDate(day));

  return box;
}

// Kontrollerar om dagen i fråga innehåller propertyn helgdag eller
function getRedDayText(day) {
  const test = day.hasOwnProperty("helgdag");
  const test2 = day.hasOwnProperty("helgdagsafton");
  if (test == true) {
    const redDayText = day.helgdag;
    return redDayText;
  } else if (test2 == true) {
    const redDayText = day.helgdagsafton;
    return redDayText;
  } else {
    return " ";
  }
}

function selectDate(day) {
  state.selectedDate = day.datum;

  renderTodos();
}

function getNumberOfTodos(day) {
  let newTodoList = [];
  const todoList = state.todos;

  for (const todo of todoList) {
    if (todo.date == day.datum) {
      newTodoList.push(todo);
    }
  }

  //Returnerar antal
  return newTodoList.length;
}

function renderTitle(currentMonthByNumber, currentYear) {
  const monthsByName = [
    "Januari",
    "Februari",
    "Mars",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "Augusti",
    "September",
    "November",
    "December",
  ];
  const activeMonthByName = monthsByName[currentMonthByNumber];
  createMonthTitle(activeMonthByName, currentYear);
}

function createMonthTitle(activeMonthByName, currentYear) {
  console.log(activeMonthByName, currentYear);
  let h1 = (document.querySelector(".m-title").innerText =
    activeMonthByName + " " + currentYear);
  console.log(h1);
}

async function changeMonthForwards(monthCount, currentYear, currentMonth) {
  monthCount++;
  calculateTimeShift(monthCount, currentYear, currentMonth);
  return monthCount;
}

async function changeMonthBackwards(monthCount, currentYear, currentMonth) {
  monthCount--;
  calculateTimeShift(monthCount, currentYear, currentMonth);
}

async function calculateTimeShift(monthCount, currentYear, currentMonth) {
  const numberOfMonths = calculateMonths(monthCount);

  const numberOfYears = calculateYears(monthCount, numberOfMonths);

  const chosenYear = currentYear - numberOfYears;
  const chosenMonth = currentMonth - numberOfMonths;

  getSelectedMonthData(chosenYear, chosenMonth);
}

async function calculateMonths(monthCount) {
  const numberOfMonths = monthCount % 12;
  return numberOfMonths;
}

async function calculateYears(monthCount, numberOfMonths) {
  if (monthCount < 12) {
    const numberOfYears = 0;
  } else {
    const numberOfYears = (monthCount - numberOfMonths) / 12;
    return numberOfYears;
  }
}

// Hämtar vald månads data
// se över variabelnamn!!
async function getSelectedMonthData(chosenYear, chosenMonth) {
  const response = await fetch(
    `https://api.dryg.net/dagar/v2.1/${chosenYear}/${chosenMonth + 1}`
  );
  const data = await response.json();
  const allDays = data.dagar;

  return allDays;
}

// ger oss antal dagar i innevarande månad
function getNumberOfDaysInSelectedMonth(selectedMonthData) {
  const lastDateInMonth = selectedMonthData[selectedMonthData.length - 1];
  const numberOfDaysInMonth = parseInt(
    lastDateInMonth.datum.substr(lastDateInMonth.datum.length - 2, 2)
  );
  return numberOfDaysInMonth;
}

//ger oss veckodag för månadens första dag
// indata behövs
function getDayOfWeekForFirstOfMonth(selectedMonth) {
  const firstDayOfweek = selectedMonth[0]["dag i vecka"];
  return firstDayOfweek;
}

// Ger oss antal dagar i föregående månad
async function getNumberOfDaysInPreviousMonth(chosenYear, chosenMonth) {
  //korrigera för årsskifte
  const response = await fetch(
    `https://api.dryg.net/dagar/v2.1/${chosenYear}/${chosenMonth}`
  );
  const selectedMonth = await response.json();

  const lastDateInMonth = selectedMonth.dagar[selectedMonth.dagar.length - 1];

  const numberOfDaysInPreviousMonth = parseInt(
    lastDateInMonth.datum.substr(lastDateInMonth.datum.length - 2, 2)
  );

  return numberOfDaysInPreviousMonth;
}

async function getNumberOfDaysIncommingMonth(chosenYear, chosenMonth) {
  //korrigera för årsskifte
  const response = await fetch(
    `https://api.dryg.net/dagar/v2.1/${chosenYear}/${chosenMonth + 2}`
  );
  const selectedMonth = await response.json();

  //   const numberOfDaysInMonth = selectedMonth.dagar[selectedMonth.dagar.length - 1];
  //   console.log(numberOfDaysInMonth);
  const firstDayOfMonth = selectedMonth.dagar[0]["dag i vecka"];
  console.log(firstDayOfMonth);

  const numberOfDayscommingMonth = parseInt(firstDayOfMonth);
  console.log(numberOfDayscommingMonth);

  return numberOfDayscommingMonth;
}

// returnerar inskickat datum till korrekt format
async function getCorrectDateFormat(date) {
  const fullDateFormat = date.datum;
  let correctDateFormat;
  const partDateFormat = fullDateFormat.substr(fullDateFormat.length - 2, 2);

  if (partDateFormat.substr(0, 1) == 0) {
    correctDateFormat = partDateFormat.substr(1, 1);
  } else {
    correctDateFormat = partDateFormat;
  }
  return correctDateFormat;
}

function getLastWeekDayInMonth(selectedMonthData) {
  const lastDayInMonth = selectedMonthData.length - 1;
  const lastWeekDayInMonth = selectedMonthData[lastDayInMonth]["dag i vecka"];

  return lastWeekDayInMonth;
}

// const type = document.createElement("p"); // Create a <li> node
// var textnode = document.createTextNode(secondCut);
// //const fullDate = document.createTextNode(days.datum); // Create a text node
// type.append(textnode); // Append the text to <li>
// document.getElementById("myList").append(type); // Append <li> to <ul> with id="myList"

//  const firstDayOfMonth = data.dagar.find((day) => day.veckodag[0]);
//  const firstDayOfMonth2 = data.dagar[0].veckodag;

// Massa skit bara...
//getDateNumber()
// ***********************************************************************************************

// let secondCut = "";
// for (const days of allDays) {
//   const fullDate = days.datum;
//   // console.log(fullDate);
//   const dateFirstCut = fullDate.substr(fullDate.length - 2, 2);
//   // console.log(dateFirstCut);

//   if (dateFirstCut.substr(0, 1) == 0) {
//     secondCut = dateFirstCut.substr(1, 1);
//     //console.log("tjoho " + secondCut);

//     //metod för att trycka in data i p
//   } else {
//     secondCut = dateFirstCut;
//   }
// }
// return secondCut;

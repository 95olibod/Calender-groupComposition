function initCalender() {
  setCurrentMonthAndYear();
  renderCalender();
}

function setCurrentMonthAndYear() {
  state.selectedDate = new Date();
  state.currentMonth = new Date().getMonth();
  state.currentYear = new Date().getFullYear();
}
// olibods ninjafunction...
function clearCalender() {

  //GÖR OM


// const clear = document.getElementById("calendar-day-box");
// console.log(clear);
// clear.innerText = "";

  // const mainDiv = document.getElementById("main");
  // mainDiv.innerText = "";
}

async function renderCalender() {
  renderTitle(state.currentMonth, state.currentYear);
  let selectedMonthData = await getSelectedMonthData(
    state.currentYear,
    state.currentMonth
  );
  let firstDayOfweek = getDayOfWeekForFirstOfMonth(selectedMonthData);
  // let numberOfDaysInMonth = await getNumberOfDaysInSelectedMonth(selectedMonthData);
  // let previousMonthDays = await previousMonthNumberOfDays(selectedMonthData);

  //let container = clearCalender();
  let container = document.querySelector(".m-calender-container");

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
    container.append(emptyDiv);
  }

  // Ritar alla boxar
  for (const day of selectedMonthData) {
    const div = createDayBox(day);
    container.append(div);
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
  const dayParagraph = box.querySelector(".p-date");
  dayParagraph.innerText = new Date(day.datum).getDate();
  const numberOfTodos = box.querySelector(".todos");
    
  const todos = getNumberOfTodos(day);
  if (todos > 0) {
    numberOfTodos.innerText = todos;
  } 

  box.addEventListener("click", () => selectDate(day));

  return box;
}

function selectDate(day) {
  //console.log(day.datum);
}

function getNumberOfTodos(day) {
  let newTodoList = [];

  const todoList = state.todos;
  for (const todo of todoList) {
    if (todo.date == day.datum) {
      newTodoList.push(todo);
    }
   // console.log(todo.date + day.datum);
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

  let h1 = document.querySelector(".h1-test").innerText = activeMonthByName + " " + currentYear;
  h1.className = "m-title";
  
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
async function getNumberOfDaysInSelectedMonth(selectedMonthData) {
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

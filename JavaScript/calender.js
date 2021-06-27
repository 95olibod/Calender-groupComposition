function initCalender() {
  setCurrentMonthAndYear();
  renderCalender();
  renderCurrentDate();
  previousMonth();
  nextMonth();
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

  let container = document.querySelector(".m-calender-container");
  container.innerHTML = "";

  await createEmptyBoxesPreviosMonth(firstDayOfweek, container);
  createBoxes(selectedMonthData, container);
  createEmptyBoxesNextMonth(selectedMonthData, container);
}

// Create boxes
function createBoxes(selectedMonthData, container) {
  for (const day of selectedMonthData) {
    const div = createDayBox(day);
    container.append(div);
  }
}

// Create empty boxes previous month
async function createEmptyBoxesPreviosMonth(firstDayOfweek, container) {
  const numberPrevious = await getNumberOfDaysInPreviousMonth();

  for (let i = numberPrevious - (firstDayOfweek - 1); i < numberPrevious; i++) {
    const emptyDiv = createEmptyDays(i);
    emptyDiv.className =
      "empty-box flex col ali-center m-todo-margin-r m-todo-margin-b";
    container.append(emptyDiv);
  }
}

// Create empty boxes next month
function createEmptyBoxesNextMonth(selectedMonthData, container) {
  const lastWeekDay = getLastWeekDayInMonth(selectedMonthData);

  const numbersInNextMonth = 7 - lastWeekDay;

  for (let i = 0; i < numbersInNextMonth; i++) {
    const emptyDiv = createEmptyDays(i + 1);
    emptyDiv.className =
      "empty-box flex col ali-center m-todo-margin-r m-todo-margin-b";
    container.append(emptyDiv);
  }
}

// Get all days of selected month
async function getSelectedMonthData(chosenYear, chosenMonth) {
  const response = await fetch(
    `https://api.dryg.net/dagar/v2.1/${chosenYear}/${chosenMonth + 1}`
  );
  const data = await response.json();
  const allDays = data.dagar;

  return allDays;
}

function previousMonth() {
  const button = document.getElementById("left-arrow");
  button.addEventListener("click", () => getPreviousMonth());
}

async function getPreviousMonth() {
  if (state.currentMonth == 0) {
    state.currentYear--;
    state.currentMonth = 11;
  } else {
    state.currentMonth--;
  }

  await fetch(
    `https://api.dryg.net/dagar/v2.1/${state.currentYear}/${
      state.currentMonth + 1
    }`
  );

  renderCalender();
}

function nextMonth() {
  const button = document.getElementById("right-arrow");
  button.addEventListener("click", () => getNextMonth());
}

async function getNextMonth() {
  if (state.currentMonth == 11) {
    state.currentYear++;
    state.currentMonth = 0;
  } else {
    state.currentMonth++;
  }

  await fetch(
    `https://api.dryg.net/dagar/v2.1/${state.currentYear}/${
      state.currentMonth + 1
    }`
  );

  renderCalender();
}

//Render box
function createEmptyDays(day) {
  const emptyDiv = document.getElementById("calendar-day-box");
  const box = emptyDiv.content.firstElementChild.cloneNode(true);
  let emptyDayDate = box.querySelector(".p-date");

  if (day < 15) {
    emptyDayDate.innerText = day;
  } else {
    emptyDayDate.innerText = day + 1;
  }

  return box;
}

function createDayBox(day) {
  const template = document.getElementById("calendar-day-box");
  const box = template.content.firstElementChild.cloneNode(true);
  const redDayText = getRedDayText(day);
  const dayParagraph = box.querySelector(".p-date");

  if (redDayText != "") {
    dayParagraph.className = "p-red-day";
    dayParagraph.innerText = new Date(day.datum).getDate();
  }

  dayParagraph.innerText = new Date(day.datum).getDate();
  const numberOfTodos = box.querySelector(".todos");

  const todos = getNumberOfTodos(day);

  if (todos > 0) {
    numberOfTodos.className =
      "todo-markup round-badge flex jus-center ali-center";
    numberOfTodos.innerText = todos;
  }

  box.addEventListener("click", () => selectDate(day, box));

  return box;
}

// Check if day is a holiday
function getRedDayText(day) {
  const holiday = day.hasOwnProperty("helgdag");
  const holidayevening = day.hasOwnProperty("helgdagsafton");

  if (holiday == true) {
    const redDayText = day.helgdag;
    return redDayText;
  } else if (holidayevening == true) {
    const redDayText = day.helgdagsafton;
    return redDayText;
  } else {
    return "";
  }
}

function selectDate(day, box) {
  state.selectedDate = new Date(day.datum);
  renderCurrentDate(day);
  renderTodos();
}

async function selectDateForMiniCalendar(selectedDayValue) {
  const asideWeekday = document.getElementById("aside-weekday");

  const dayDate = getDay(selectedDayValue);
  const monthNumber = selectedDayValue.substr(5, 2);
  const monthName = getMonth(selectedDayValue);
  const year = getYear(selectedDayValue);
  const day = await getDayOfWeek(dayDate, monthNumber, year);

  const correctCurrentDateFormat =
    day["veckodag"] + " " + dayDate + " " + monthName;

  asideWeekday.innerText = correctCurrentDateFormat;
  const asideDate = document.getElementById("aside-date");
  showHoliday(day);
}

function getDay(selectedDayValue) {
  const substringDate = selectedDayValue.substr(8, 2);
  const date = checkdateLength(substringDate);

  return date;
}

function getYear(selectedYearValue) {
  const year = selectedYearValue.substr(0, 4);

  return year;
}

function getMonth(selectedDayValue) {
  const substringMonth = selectedDayValue.substr(6, 1);
  const monthNumber = parseInt(substringMonth);
  const monthByName = getMonthsByName(monthNumber - 1);
  return monthByName;
}

async function getDayOfWeek(day, month, year) {
  const response = await fetch(
    `https://api.dryg.net/dagar/v2.1/${year}/${month}/${day}`
  );
  const data = await response.json();
  const currentDate = data.dagar[0];

  return currentDate;
}

function showHoliday(day) {
  const holiday = document.getElementById("holiday");
  holidayText = getRedDayText(day);
  holiday.innerText = holidayText;
}

async function renderCurrentDay() {
  const currentDay = new Date().getDate();

  const response = await fetch(
    `https://api.dryg.net/dagar/v2.1/${state.currentYear}/${
      state.currentMonth + 1
    }/${currentDay}`
  );
  const data = await response.json();
  const currentDate = data.dagar[0];

  return currentDate;
}

async function renderCurrentDate(day) {
  if (typeof day === "undefined") {
    const currentDay = await renderCurrentDay();
    day = currentDay;
  }

  const asideWeekday = document.getElementById("aside-weekday");
  const monthByName = getMonthText(day);
  const date = getDayText(day);
  const correctCurrentDateFormat =
    day["veckodag"] + " " + date + " " + monthByName;

  asideWeekday.innerText = correctCurrentDateFormat;
  const asideDate = document.getElementById("aside-date");
  showHoliday(day);
}

function getDayText(day) {
  let substringDate = day["datum"].substr(8, 2);
  const date = checkdateLength(substringDate);

  return date;
}

function getMonthText(day) {
  const substringMonth = day["datum"].substr(6, 1);
  const monthNumber = parseInt(substringMonth);
  const monthByName = getMonthsByName(monthNumber - 1);
  return monthByName;
}

function checkdateLength(subStringDate) {
  let correctSubStringDate = subStringDate;

  if (subStringDate.charAt(0) == 0) {
    correctSubStringDate = subStringDate.substr(1, 1);
  }
  return correctSubStringDate;
}

// Returns number of todos in a new array
function getNumberOfTodos(day) {
  let newTodoList = [];
  const todoList = state.todos;

  for (const todo of todoList) {
    if (todo.date.toLocaleDateString() == day.datum) {
      newTodoList.push(todo);
    }
  }

  return newTodoList.length;
}

function getMonthsByName(currentMonthByNumber) {
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
    "Oktober",
    "November",
    "December",
  ];

  const activeMonthByName = monthsByName[currentMonthByNumber];
  return activeMonthByName;
}
function renderTitle(currentMonthByNumber, currentYear) {
  const monthsByName = getMonthsByName(currentMonthByNumber);
  createMonthTitle(monthsByName, currentYear);
}

function createMonthTitle(activeMonthByName, currentYear) {
  let h1 = (document.querySelector(".m-title").innerText =
    activeMonthByName + " " + currentYear);
}

// Return first day of month
function getDayOfWeekForFirstOfMonth(selectedMonth) {
  const firstDayOfweek = selectedMonth[0]["dag i vecka"];
  return firstDayOfweek;
}

async function getNumberOfDaysInPreviousMonth() {
  let chosenMonth = state.currentMonth;
  let chosenYear = state.currentYear;

  if (state.currentMonth == 0) {
    chosenYear--;
    chosenMonth = 11;
  }

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

function getLastWeekDayInMonth(selectedMonthData) {
  const lastDayInMonth = selectedMonthData.length - 1;
  const lastWeekDayInMonth = selectedMonthData[lastDayInMonth]["dag i vecka"];

  return lastWeekDayInMonth;
}

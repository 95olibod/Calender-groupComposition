function initCalender() {
  startView();
}

async function startView() {
  // JUSTERA!!! kräver input LET? CONST? BYT NAMN FÖR FAN!!!
  let currentYear = new Date().getFullYear();
  console.log(currentYear);
  let currentMonthByNumber = new Date().getMonth() + 1;
  let currentDay = new Date().getDate();

  console.log(currentMonthByNumber)
  
  let monthCount = 0;
  
  //   använda istället?
  let activeMonth
  
  
  
  //   changeMounth(innevarande månad)
  
  //   let bla (number)
  
  let selectedMonthData = await getSelectedMonthData(currentYear, currentMonthByNumber);
  
  let numberOfDaysInMonth = await getNumberOfDaysInSelectedMonth(selectedMonthData);
  let firstDayOfweek = await getDayOfWeekForFirstOfMonth(selectedMonthData);
  let previousMonthDays = await previousMonthNumberOfDays(selectedMonthData);
  
  
  
  
  
  anotherName(selectedMonthData);
  getCurrentMonthByName(currentMonthByNumber, currentYear);
}


function getCurrentMonthByName(currentMonthByNumber,currentYear) {
  
const monthsByName = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "November","December"]

const activeMonthByName = monthsByName[currentMonthByNumber - 1];

createTitle(activeMonthByName, currentYear);
}

function createTitle(activeMonthByName, currentYear) {
  const type = document.createElement("h1"); // Create a <li> node
  var textnode = document.createTextNode(`${activeMonthByName} ${currentYear}`); // Create a text node
  type.append(textnode); // Append the text to <li>
  document.getElementById("currentMonth").append(type); // Append <li> to <ul> with id="myList"
  
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
    if (monthCount < 12)
    {
        const numberOfYears = 0;
    }
    else
    {
        const numberOfYears = (monthCount - numberOfMonths) / 12;
        return numberOfYears;
    }
}



// Hämtar vald månads data
// se över variabelnamn!!
async function getSelectedMonthData(chosenYear, chosenMonth) {
  const response = await fetch(
    `https://api.dryg.net/dagar/v2.1/${chosenYear}/${chosenMonth}`
  );
  const data = await response.json();
  const allDays = data.dagar;

  return allDays;
}

// ger oss antal dagar i innevarande månad
async function getNumberOfDaysInSelectedMonth(currentMonth) {
  const lastDateInMonth = currentMonth[currentMonth.length - 1];
  const numberOfDaysInMonth = parseInt(
    lastDateInMonth.datum.substr(lastDateInMonth.datum.length - 2, 2)
  );
  return numberOfDaysInMonth;
}

//ger oss veckodag för månadens första dag
// indata behövs
async function getDayOfWeekForFirstOfMonth(selectedMonth) {
  const firstDayOfweek = selectedMonth[0]["dag i vecka"];

  return firstDayOfweek;
}

// Ger oss antal dagar i föregående månad
async function previousMonthNumberOfDays(selectedMonth) {
  const lastDateInMonth = selectedMonth[selectedMonth.length - 1];

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

async function anotherName(selectedMonth) {
  
  for(let days of selectedMonth)
  {
    let date = await getCorrectDateFormat(days);
    await create(date);
  }

}

async function create(day) {
const type = document.createElement("li"); // Create a <li> node
var textnode = document.createTextNode(day); // Create a text node
type.append(textnode); // Append the text to <li>
document.getElementById("myList").append(type); // Append <li> to <ul> with id="myList"
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

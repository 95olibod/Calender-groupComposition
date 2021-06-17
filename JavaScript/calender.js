function initCalender() {
  renderDate();
}

function renderDate() {  
  getAllDays();
  previousMonthNumberOfDays();
  getNumberOfDaysInCurrentMonth();
  getDayOfWeekForFirstOfMonth();
  getDateNumber();
}

// Hämtar vald månads data
// month,year inparameter **********************************************
async function getAllDays() {
  const response = await fetch("https://api.dryg.net/dagar/v2.1/2021/06");
  const data = await response.json();

  const allDays = data.dagar;
//   console.log(allDays);
  return allDays;
}

  
// ger oss antal dagar i innevarande månad
// indata behövs
async function getNumberOfDaysInCurrentMonth(){

    const lastDateInMonth = data.dagar[data.dagar.length - 1];
    const numberOfDaysInMonth = parseInt(
        lastDateInMonth.datum.substr(lastDateInMonth.datum.length - 2, 2)
        );
}

//ger oss veckodag för månadens första dag
// indata behövs
async function getDayOfWeekForFirstOfMonth() {

    const firstDayOfweek = data.dagar[0]["dag i vecka"];
}


  //console.log(lastDateInMonth);
  //console.log(" sista dagen i månaden: " + numberOfDaysInMonth);
  //   console.log(allDays);

  //   console.log(firstDayOfMonth2);
  //   console.log(firstDayOfweek);


//   Hämtar ut 
 async function getDateNumber() {

  const response = await fetch("https://api.dryg.net/dagar/v2.1/2021/06");
  const data = await response.json();

  const allDays = data.dagar;
    let secondCut ="";
     for (const days of allDays) {
       const fullDate = days.datum;
       // console.log(fullDate);
       const dateFirstCut = fullDate.substr(fullDate.length - 2, 2);
       // console.log(dateFirstCut);

       if (dateFirstCut.substr(0, 1) == 0) {
         secondCut = dateFirstCut.substr(1, 1);
         console.log("tjoho " + secondCut);

         //metod för att trycka in data i p
       } 
       else {
         secondCut = dateFirstCut;
        }
    }
    return secondCut;
}











const type = document.createElement("p"); // Create a <li> node
var textnode = document.createTextNode(secondCut);
//const fullDate = document.createTextNode(days.datum); // Create a text node
type.append(textnode); // Append the text to <li>
document.getElementById("myList").append(type); // Append <li> to <ul> with id="myList"



// Ger oss antal dagar i föregående månad
async function previousMonthNumberOfDays() {
  const response = await fetch("https://api.dryg.net/dagar/v2.1/2021/05");
  const data = await response.json();

  const lastDateInMonth = data.dagar[data.dagar.length - 1];
  const numberOfDaysInMonth = parseInt(
    lastDateInMonth.datum.substr(lastDateInMonth.datum.length - 2, 2)
  );
  return numberOfDaysInMonth;
}

//  const firstDayOfMonth = data.dagar.find((day) => day.veckodag[0]);
//  const firstDayOfMonth2 = data.dagar[0].veckodag;

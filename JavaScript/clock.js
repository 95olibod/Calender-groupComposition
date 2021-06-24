
function initClock() {
  displayClock();
}

function displayClock() {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  const clock = date + " " + time;
  const header = document.querySelector(".h-date");
  header.innerText = clock;
  setTimeout(displayClock, 1000);
}

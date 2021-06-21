window.addEventListener('load', main);

const state = {
    todos: [],
    selectedDate: undefined,
    currentMonth: undefined,
    currentYear: undefined
}

function main () {
    initTodos();
    initClock();
    initCalender();
}

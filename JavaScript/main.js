window.addEventListener('load', main);

const state = {
    todos: [],
    filteredTodoList: [],
    selectedDate: new Date(),
    currentMonth: undefined,
    currentYear: undefined
}

function main () {
    initTodos();
    initClock();
    initCalender();
}

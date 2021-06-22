window.addEventListener('load', main);

const state = {
    todos: [],
    filteredTodoList: [],
    selectedDate: undefined,
    currentMonth: undefined,
    currentYear: undefined
}

function main () {
    initTodos();
    initClock();
    initCalender();
}

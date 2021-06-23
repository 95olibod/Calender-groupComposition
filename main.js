window.addEventListener('load', main);

const state = {
    todos: [],
    filteredTodoList: [],
    selectedDate: null,
    currentMonth: undefined,
    currentYear: undefined
}

function main () {
    initTodos();
    initClock();
    initCalender();
}

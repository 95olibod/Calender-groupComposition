window.addEventListener('load', main);

const state = {
    todos: [],
    selectedDate: undefined
}

function main () {
    initTodos();
    initClock();
}
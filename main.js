window.addEventListener('load', main);

const state = {
    todos: [{
        text: "stääääääääda",
        date: new Date("2021-06-17")
    }, {
        text: "stääääääääda",
        date: new Date("2021-06-17")
        
    }, {
        text: "stääääääääda",
        date: new Date("2021-06-17")
    }],
    selectedDate: undefined
}

function main () {
    //createTodo();
    initCalender();
}
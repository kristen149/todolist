
// IMPORT
import { ToDo } from "./todo.js";
import { ToDoList } from "./todoList.js";

const DomID = (id) => {
    return document.getElementById(id);
};

let todolist = new ToDoList();
let completelist = new ToDoList();

// ADD TODO
const addTodo = () => {
    let txtTodo = DomID("newTask").value;

    if (txtTodo != "") {
        let todoAdded = new ToDo(txtTodo, "todo");
        todolist.addTodo(todoAdded);
    }
    //Show ToDo List
    showTodoList();
    DomID("newTask").value = "";

}

// REMOVE TODO
const removeTodo = (event) => {

    let tdIndex = event.currentTarget.getAttribute("data-index");
    let tdStatus = event.currentTarget.getAttribute("data-status");

    if (tdStatus == "todo") {
        todolist.removeTodo(tdIndex);
        showTodoList();
    } else if (tdStatus =="completed") {
        completelist.removeTodo(tdIndex);
        showCompletedList();
    }



}

// COMPLETE TODO
const completeTodo = (event) => {

    let tdIndex = event.currentTarget.getAttribute("data-index");
    let tdStatus = event.currentTarget.getAttribute("data-status");
    if (tdStatus == "todo") {
        let completedItem = todolist.todoListARR.slice(tdIndex, tdIndex + 1);
        let objectTodo = new ToDo(completedItem[0].textTodo, "completed");
        moveTodo(todolist, completelist, tdIndex, objectTodo);
        showTodoList();
        showCompletedList();
    } else if (tdStatus == "completed") {
        let undoItem = completelist.todoListARR.slice(tdIndex, tdIndex + 1);
        let objectTodo = new ToDo(undoItem[0].textTodo, "todo");
        moveTodo(completelist, todolist, tdIndex, objectTodo);
        showTodoList();
        showCompletedList();

    } else {
        alert("Cannot move todo");
    }
}

// MOVE TODO
const moveTodo = (departure, arrival, tdIndex, objectTodo) => {
    // Remove todo from departure
    departure.removeTodo(tdIndex);
    // Add todo to arrival
    arrival.addTodo(objectTodo);


}

// ----------------------SHOW-------------------//

const showTodoList = () => {
    let ulTodo = DomID("todo");
    ulTodo.innerHTML = todolist.renderTodo();
    ulTodo.style.display= "block";


}

const showCompletedList = () => {
    let ulCompleted = DomID("completed");
    ulCompleted.innerHTML = completelist.renderTodo();
    ulCompleted.style.display= "block";


}

// SHOW ONLY COMPLETED TASKS
const showOnlyCompletedTasks = () =>{
    let ulTodo = DomID("todo");

    ulTodo.style.display = "none";
    showCompletedList();
}

// SHOW ALL
const showAll = () => {
    showTodoList();
    showCompletedList();
}


// SORT ASC

const sortASC = () => {
    todolist.sortToDo(true);
    completelist.sortToDo(true);
    showTodoList();
    showCompletedList();

}


// SORT DES
const sortDES = () => {
    todolist.sortToDo(false);
    completelist.sortToDo(false);
    showTodoList();
    showCompletedList();


}


 

//  -------------------------------------------------//

// SAVE STORAGE 

const SaveStorage = () => {
    let jsonList_todo = JSON.stringify(todolist.todoListARR);
    localStorage.setItem("JSONlistTodo", jsonList_todo);
}

const GetStorage = () => {
    let jsonList_todo = localStorage.getItem("JSONlistTodo");
    let arrayList_todo = JSON.parse(jsonList_todo);
    todolist.todoListARR = arrayList_todo;
    showTodoList();

}
// add date and time





DomID("addItem").addEventListener("click", () => {
    addTodo();

});

window.removeTodo = removeTodo;
window.completeTodo = completeTodo;
window.sortASC = sortASC;
window.sortDES = sortDES;
window.showOnlyCompletedTasks = showOnlyCompletedTasks;
window.SaveStorage=SaveStorage;
window.GetStorage = GetStorage;
window.showAll = showAll;

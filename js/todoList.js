export class ToDoList{
    constructor() {
        this.todoListARR = [];

    }
    addTodo(todo) {
        this.todoListARR.push(todo);

    }

    removeTodo (index) {
        this.todoListARR.splice(index, 1);


    }
    renderTodo() {
        let content = "";
        content = this.todoListARR.reduceRight((tdContent, item, index) => {
                tdContent += `
                    <li>
                        <span>${item.textTodo} </span>
                        <div class="buttons">
                            <button class="remove" data-index = "${index}" data-status = "${item.status}" onclick = "removeTodo(event)"> 
                                 <i class="fa fa-trash-alt"></i>
                            </button>

                            <button class="complete" data-index = "${index}" data-status = "${item.status}" onclick = "completeTodo(event)"> 
                                 <i class="fa fa-check-circle"></i>
                            </button>
                        </div>
                    </li>
                `;
                return tdContent;
        },'');
        return content;
    }

    sortToDo (isASC) {
        this.todoListARR.sort((todo, nextToDo) =>{
            const textA = todo.textTodo.toLowerCase();
            const textB = nextToDo.textTodo.toLowerCase();
            // ASC
            return textB.localeCompare(textA);
        });
        if (!isASC) {
            this.todoListARR.reverse();
        }

    }

}
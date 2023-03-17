let todoItems = [];
const addButton = document.querySelector('.add');
const newTask = document.querySelector('#new-task');
let inputTask = document.querySelector('#input-task');
// check if input field is empty
addButton.addEventListener('click', checkEmptyInputField);
function checkEmptyInputField() {
    let inputValue = inputTask.value.trim();
    if (inputValue !== '') {
        appendList(inputValue);
        inputTask.value = "";
        newTask.focus();
    } else {
        alert('Field cannot be blank. Enter a task.');
        inputTask.focus();
    }
}
// render the added task to the screen
function renderTodoList(todo) {
    localStorage.setItem('todoItemsRef', JSON.stringify(todoItems));
    const taskList = document.querySelector('#all-lists');
    const item = document.querySelector(`[data-key='${todo.id}']`);
    if (todo.deleted  || todo.edited) {
        item.remove();
        return
    }
    const node = document.createElement("li");
    node.setAttribute('class', 'todo-items');
    node.setAttribute('data-key', todo.id);
    node.innerHTML = `
    <span class="list-span">${todo.inputValue}</span>
    <button class="icon-button delete-button">Delete</button>
    <button class="icon-button edit-button">Edit</button>
   
    `;
    taskList.prepend(node);
}
// add tasks to the list
function appendList(inputValue) {
    const todo = {
        inputValue,
        checked: false,
        id: Date.now(),
    };
    todoItems.push(todo);
    renderTodoList(todo);
}
// delete task from the list
function deleteTodo(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    const todo = {
        deleted: true,
        ...todoItems[index]
    };
    todoItems = todoItems.filter(item => item.id !== Number(key));
    renderTodoList(todo);
}

function editTodo(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    const todo = {
        edited: true,
        ...todoItems[index]
    };
    inputTask.value = todoItems[index].inputValue;
    todoItems = todoItems.filter(item => item.id !== Number(key));
    renderTodoList(todo);
    inputTask.focus();
}
// events
const taskList = document.querySelector('#all-lists');
taskList.addEventListener('click', event => {
    if (event.target.classList.contains('delete-button')) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }
    if (event.target.classList.contains('edit-button')) {
        const itemKey = event.target.parentElement.dataset.key;
        editTodo(itemKey);
    }
});
newTask.addEventListener('focus', function () {
    newTask.style.backgroundColor = "purple";
});
newTask.addEventListener('click', function () {
    newTask.style.backgroundColor = "#8a2be2";
    inputTask.value = "";
    inputTask.focus();
});
inputTask.addEventListener('focus', function () {
    newTask.style.backgroundColor = "#8a2be2";
    inputTask.style.outlineColor = "purple";
});
inputTask.addEventListener('keypress', function (event) {
   if (event.key === "Enter") {
    alert('click on the + button to enter');
   }
});


// retain tasks on the list after reloading
document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('todoItemsRef');
    if (ref) {
      todoItems = JSON.parse(ref);
      todoItems.forEach(t => {
        renderTodoList(t);
      });
    }
  });










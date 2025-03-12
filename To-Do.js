const todoList = document.getElementById('todo-list');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoInput = document.getElementById('todo-input');
const clearCompletedBtn = document.getElementById('clear-completed');
let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodoList() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.className = "fade-in";
        todoItem.innerHTML = `
            <div class="flex justify-between items-center py-3 border-b border-gray-300">
                <div class="flex items-center">
                    <input type="checkbox" id="todo-${index}" class="mr-3" ${todo.completed ? 'checked' : ''}>
                    <span class="todo-text ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'}">${todo.text}</span>
                </div>
                <button class="text-red-500 hover:text-red-700 delete-todo" data-index="${index}">✖</button>
            </div>
        `;
        todoList.appendChild(todoItem);
    });
}

renderTodoList();

addTodoBtn.addEventListener('click', addTask);
todoInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTask(); });

function addTask() {
    const todoText = todoInput.value.trim();
    if (todoText) {
        todos.push({ text: todoText, completed: false });
        localStorage.setItem('todos', JSON.stringify(todos));
        todoInput.value = '';
        renderTodoList();
    }
}

todoList.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
        const index = parseInt(e.target.id.split('-')[1]);
        todos[index].completed = e.target.checked;
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodoList();
    }
});

todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-todo')) {
        const index = parseInt(e.target.dataset.index);
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodoList();
    }
});

clearCompletedBtn.addEventListener('click', () => {
    todos = todos.filter(todo => !todo.completed);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodoList();
});

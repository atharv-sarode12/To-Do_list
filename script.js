let tasks = [];

document.getElementById('addTaskBtn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {
        const task = { id: Date.now(), text: taskText, done: false };
        tasks.push(task);
        renderTasks();
        taskInput.value = '';
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.done ? 'done' : '';

        const span = document.createElement('span');
        span.textContent = task.text;

        const doneBtn = document.createElement('button');
        doneBtn.textContent = task.done ? 'Undo' : 'Done';
        doneBtn.onclick = () => toggleTaskDone(task.id);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit';
        editBtn.onclick = () => editTask(task.id);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete';
        deleteBtn.onclick = () => deleteTask(task.id);

        li.appendChild(span);
        li.appendChild(doneBtn);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function toggleTaskDone(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.done = !task.done;
        renderTasks();
    }
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        const newText = prompt('Edit your task:', task.text);
        if (newText !== null && newText.trim() !== '') {
            task.text = newText.trim();
            renderTasks();
        }
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

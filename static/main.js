document.addEventListener('DOMContentLoaded', function() {
    fetchTasks();
});

function fetchTasks() {
    fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '';
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task[1];
                taskList.appendChild(li);
            });
        });
}

function addTask() {
    const newTaskInput = document.getElementById('new-task');
    const newTask = newTaskInput.value;
    if (newTask) {
        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task: newTask })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                fetchTasks();
                newTaskInput.value = '';
            }
        });
    }
}
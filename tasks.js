document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Display tasks
    tasks.forEach((task) => {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('completed');
        }

        // Task text and date/time
        const taskContent = document.createElement('span');
        taskContent.textContent = `${task.text} (${new Date(task.dateTime).toLocaleString()})`;
        li.appendChild(taskContent);

        // Complete button
        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
        completeBtn.classList.add('complete-btn');
        completeBtn.addEventListener('click', () => {
            task.completed = !task.completed;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
            li.classList.toggle('completed');
        });

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            tasks.splice(tasks.indexOf(task), 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskList.removeChild(li);
        });

        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
});
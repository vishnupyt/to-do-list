document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const taskDateTime = document.getElementById('taskDateTime');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const warning = document.getElementById('warning');

    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to check if a task already exists
    function isTaskAlreadyAdded(taskText, dateTime) {
        return tasks.some(
            (task) => task.text === taskText && task.dateTime === dateTime
        );
    }

    // Function to validate the year (4 digits)
    function isValidYear(dateTime) {
        const year = new Date(dateTime).getFullYear();
        return year >= 1000 && year <= 9999;
    }

    // Function to add a new task
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        const dateTime = taskDateTime.value;

        if (taskText === '' || dateTime === '') {
            warning.textContent = 'Please enter both a task and a date/time.';
            return;
        }

        // Validate the year
        if (!isValidYear(dateTime)) {
            warning.textContent = 'Please enter a valid 4-digit year.';
            return;
        }

        // Check if the task already exists
        if (isTaskAlreadyAdded(taskText, dateTime)) {
            warning.textContent = 'Task already added.';
            return;
        }

        warning.textContent = '';

        const task = {
            id: Date.now(),
            text: taskText,
            dateTime: dateTime,
            completed: false,
        };

        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        taskInput.value = '';
        taskDateTime.value = '';
    });
});
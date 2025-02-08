document.addEventListener("DOMContentLoaded", () => {
    const newTaskBtn = document.getElementById("newTaskBtn"); 
    const taskList = document.getElementById("taskList");
    const completedTasks = document.getElementById("completedTasks");
    const taskTitle = document.getElementById("taskTitle");
    const taskDescription = document.getElementById("taskDescription");
    const showCompletedBtn = document.getElementById("showCompletedBtn");

    let tasks = []; // Масив для активних завдань
    let completed = []; // Масив для виконаних завдань
    let currentTaskId = null; // Поточне активне завдання

    // Додати нове завдання
    newTaskBtn.addEventListener("click", () => {
        const taskId = tasks.length; 
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task-item");
        taskDiv.textContent = `Завдання ${taskId + 1}`;
        taskDiv.dataset.id = taskId;

        // Кнопка "Complete"
        const completeBtn = document.createElement("button");
        completeBtn.classList.add("complete-btn");
        completeBtn.textContent = "Complete";
        completeBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            completeTask(taskId);
        });

        taskDiv.appendChild(completeBtn);
        taskDiv.addEventListener("click", () => openTask(taskId));

        taskList.appendChild(taskDiv);
        tasks.push({ title: `Завдання ${taskId + 1}`, description: "" });

        openTask(taskId);
    });

    // Відкрити завдання для редагування
    function openTask(id) {
        currentTaskId = id;
        taskTitle.value = tasks[id].title;
        taskDescription.value = tasks[id].description;
    }

    // Оновлення заголовка завдання
    taskTitle.addEventListener("input", () => {
        if (currentTaskId !== null) {
            tasks[currentTaskId].title = taskTitle.value;
            document.querySelector(`[data-id="${currentTaskId}"]`).childNodes[0].textContent = taskTitle.value;
        }
    });

    // Оновлення опису завдання
    taskDescription.addEventListener("input", () => {
        if (currentTaskId !== null) {
            tasks[currentTaskId].description = taskDescription.value;
        }
    });

    // Перемістити завдання до виконаних
    function completeTask(id) {
        const taskDiv = document.querySelector(`[data-id="${id}"]`);
        if (taskDiv) {
            taskDiv.remove(); // Видаляємо з лівого блоку

            // Додаємо у виконані завдання
            const completedDiv = document.createElement("div");
            completedDiv.classList.add("completed-task");
            completedDiv.textContent = tasks[id].title;

            completed.push(tasks[id]); // Переміщуємо завдання в масив виконаних

            completedTasks.appendChild(completedDiv);
        }
    }

    // Показати/приховати список виконаних завдань
    showCompletedBtn.addEventListener("click", () => {
        const isCompletedVisible = completedTasks.style.display === "block";

        // Перемикаємо відображення
        completedTasks.style.display = isCompletedVisible ? "none" : "block";
        taskList.style.display = isCompletedVisible ? "block" : "none";

        // Додаємо або прибираємо клас "active"
        showCompletedBtn.classList.toggle("active", !isCompletedVisible);
    });
});

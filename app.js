document.addEventListener('DOMContentLoaded', ()=>{
    const storedtasks = JSON.parse(localStorage.getItem('tasks'))
    if(storedtasks){
        storedtasks.forEach((task)=> tasks.push('tasks'))
        updateTasks();
        updateStats();
    }
})

let tasks = [];

const save = () => {
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

const addTask = () => {
    const input = document.getElementById('input');
    const text = input.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        input.value = "";  // Clear input field
        updateTasks();
        updateStats();
        save();
    }
};

const updateTasks = () => {
    const tasksList = document.getElementById('task_List');  // Corrected ID reference
    tasksList.innerHTML = "";  // Clear the list

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                <p>${task.text}</p>
            </div>
            <div class="icons">
               <img src="https://cdn-icons-png.flaticon.com/128/1160/1160515.png" onClick="editTask(${index})" alt="Edit" />
               <img src="https://cdn-icons-png.flaticon.com/128/3096/3096687.png" onClick="deleteTask(${index})" alt="Delete" />
            </div>
        </div>
        `;
        listItem.querySelector('.checkbox').addEventListener("change", () => toggleTaskComplete(index));
        tasksList.append(listItem);
    });
};

document.getElementById('taskForm').addEventListener('submit', function (e) {
    e.preventDefault();
    addTask();
});

// Toggle task completion
const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasks();
    updateStats();
    save();
};

// Delete a task
const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasks();
    updateStats();
    save();
};

// Edit a task
const editTask = (index) => {
    const input = document.getElementById('input');
    input.value = tasks[index].text;  // Set the task text in input field
    tasks.splice(index, 1);  // Remove the task for editing
    updateTasks();
    updateStats();
    
};

// Update task stats and progress bar
const updateStats = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    // Update progress bar width
    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`;

    // Update task count
    const num = document.getElementById('num');
    num.textContent = `${completedTasks}/${totalTasks}`;

    if(tasks.length && completedTasks === totalTasks){
        blastConfetti();
    }
};

const blastConfetti = () => {
    const end = Date.now() + 15 * 1000;

// go Buckeyes!
const colors = ["#bb0000", "#ffffff"];

(function frame() {
  confetti({
    particleCount: 2,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors,
  });

  confetti({
    particleCount: 2,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors,
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
})();
}

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${task.text} - ${task.time}
      <button class="delete" onclick="deleteTask(${index})">Excluir</button>
    `;
    list.appendChild(li);
  });
}

function addTask() {
  const text = document.getElementById('taskInput').value.trim();
  const time = document.getElementById('timeInput').value;
  if (!text || !time) {
    alert('Preencha a tarefa e o horário.');
    return;
  }
  tasks.push({ text, time, triggered: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  document.getElementById('taskInput').value = '';
  document.getElementById('timeInput').value = '';
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function checkAlarms() {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0,5); // HH:MM

  tasks.forEach((task, index) => {
    if (task.time === currentTime && !task.triggered) {
      alert(`⏰ Hora da tarefa: ${task.text}`);
      document.getElementById('alarmSound').play();
      task.triggered = true;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });
}

// Verificação de alarme a cada 30 segundos
setInterval(() => {
  tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  checkAlarms();
}, 30000);

renderTasks();

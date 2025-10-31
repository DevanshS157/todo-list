
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
render();

function addTask() {
    const val = document.getElementById('taskInput').value.trim();
    if (!val) return;
    
    tasks.push({ text: val, done: false });
    save();
    document.getElementById('taskInput').value = '';
    render();
}

function toggleDone(i) {
    tasks[i].done = !tasks[i].done;
    save();
    render();
}

function deleteTask(i) {
    tasks.splice(i, 1);
    save();
    render();
}

function save() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function render() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    
    tasks.forEach((t, i) => {
        const li = document.createElement('li');
        li.className = t.done ? 'done' : '';
        li.innerHTML = `
            <span onclick="toggleDone(${i})">${t.text}</span>
            <button class="close" onclick="deleteTask(${i})">&times;</button>
        `;
        list.appendChild(li);
    });
}

function filterTasks(type) {
    document.querySelectorAll('.filter button').forEach(b => 
        b.classList.remove('active')
    );
    event.target.classList.add('active');
    
    document.querySelectorAll('#taskList li').forEach(li => {
        const show = type === 'all' ||
            (type === 'done' && li.classList.contains('done')) ||
            (type === 'pending' && !li.classList.contains('done'));
        li.style.display = show ? 'flex' : 'none';
    });
}
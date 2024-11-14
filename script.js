let lists = {};

async function fetchLists() {
    const response = await fetch('/api/lists');
    lists = await response.json();
    updateListDropdown();
    renderLists();
}

function createList() {
    const listName = document.getElementById("list-name").value;
    if (!listName) return alert("Please enter a list name.");

    fetch('/api/lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: listName })
    }).then(fetchLists);
}

function updateListDropdown() {
    const listSelect = document.getElementById("list-select");
    listSelect.innerHTML = '<option value="" disabled selected>Select a list</option>';

    for (let list in lists) {
        const option = document.createElement("option");
        option.value = list;
        option.innerText = list;
        listSelect.appendChild(option);
    }
}

function addTask() {
    const taskName = document.getElementById("task-input").value;
    const taskDate = document.getElementById("task-date").value;
    const taskTime = document.getElementById("task-time").value;
    const selectedList = document.getElementById("list-select").value;

    if (!taskName || !selectedList) return alert("Please enter task details and select a list.");

    fetch(`/api/lists/${selectedList}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: taskName,
            date: taskDate,
            time: taskTime,
            completed: false
        })
    }).then(fetchLists);
}

function renderLists() {
    const taskLists = document.getElementById("task-lists");
    taskLists.innerHTML = "";
}
    for (let listName in lists) {
        const listDiv = document.createElement("div");
        listDiv.className = "list";
        listDiv.innerHTML = `<h3>${listName}</h3>`;

        lists[listName].forEach(task)
    }

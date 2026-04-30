const buttonTask = document.querySelector('#button');
const newTask = document.querySelector('#input-task');
const body = document.body;

buttonTask.addEventListener('click', handleClick);

function handleClick(e) {
    console.log('Ajout d\'une nouvelle tâche');
    e.preventDefault();
    addTask(newTask.value);
}

function addTask(newTask) {
    if (!newTask) { return }
    createList();
    const ul = document.querySelector('#ul-task');
    const li = document.createElement('li');
    const checkbox = document.createElement('button');
    checkbox.setAttribute('class', 'checkbox-task');
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'button-delete');
    deleteButton.textContent = 'Supprimer la tâche';
    li.textContent = newTask;
    ul.append(li);
    li.prepend(checkbox);
    li.append(deleteButton);
}

function createList() {
    if (!document.querySelector('#ul-task')) {
        const ul = document.createElement('ul');
        ul.setAttribute('id', 'ul-task');
        body.appendChild(ul);
    }
}
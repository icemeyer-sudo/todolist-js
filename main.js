/* // Permet de connaitre le nombre d'eventListener en cours -- Code à mettre dans la console

    Array.from(document.querySelectorAll('*'))
        .reduce(function(pre, dom){
        var clks = getEventListeners(dom).click;
        pre += clks ? clks.length || 0 : 0;
        return pre
    }, 0)

*/

const buttonAddTask = document.querySelector('#button');
const newTask = document.querySelector('#input-task');
const body = document.body;
let id = 0;

buttonAddTask.addEventListener('click', handleClickAdd);
function handleClickAdd(e) {
    console.log('Ajout d\'une nouvelle tâche');
    e.preventDefault();
    addTask(newTask);
}

function addTask(newTask) {
    if (!newTask.value) { return }
    createList();
    const ul = document.querySelector('#ul-task');
    const li = document.createElement('li');
    li.setAttribute('data-id', id)
    const checkbox = document.createElement('button');
    checkbox.setAttribute('class', 'checkbox-task');
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'button-delete');
    deleteButton.setAttribute('data-id', id);
    deleteButton.textContent = 'Supprimer la tâche';
    li.textContent = newTask.value;
    ul.append(li);
    li.prepend(checkbox);
    li.append(deleteButton);
    id++;
    newTask.value = '';
}

function handleClickDelete(e) {
    const ul = document.querySelector('#ul-task');
    deleteTask(e);
    if (!ul.querySelector('li')) {
        const btnDeleteAll = document.querySelector('#btn-delete-all');
        ul.remove();
        btnDeleteAll.remove();
    }
}

function deleteTask(e) {
    const taskId = e.target.getAttribute('data-id');
    const ul = document.querySelector('#ul-task');
    const li = ul.querySelector(`li[data-id='${taskId}']`);
    li.remove();
}

function createList() {
    if (!document.querySelector('#ul-task')) {
        createUl();
        createEventListener();
        createBtnDeleteAll();
    }
}

function createUl() {
    const ul = document.createElement('ul');
    ul.setAttribute('id', 'ul-task');
    body.appendChild(ul);
}

function createEventListener() {
    const ul = document.querySelector('#ul-task');
    ul.addEventListener('click', (e) => {
        if(e.target.classList.contains("button-delete")) {
            handleClickDelete(e);
        }
    });
}

function createBtnDeleteAll() {
    const btnAdd = document.querySelector('#button');
    const btnDeleteAll = document.createElement('button');
    btnDeleteAll.addEventListener('click', (e) => {
        handleDeleteAll(e);
    })
    btnDeleteAll.setAttribute('id', 'btn-delete-all');
    btnDeleteAll.textContent = 'Supprimer toutes les tâches';
    btnAdd.after(btnDeleteAll);
}

function handleDeleteAll() {
    const ul = document.querySelector('#ul-task');
    const btnDeleteAll = document.querySelector('#btn-delete-all');
    // Supprimer les eventListeners ici n'est pas obligatoire
    // La suppression du DOM netoie automatiquement les eventListeners
    ul.removeEventListener('click', handleClickDelete);
    btnDeleteAll.removeEventListener('click', handleDeleteAll);
    ul.remove();
    btnDeleteAll.remove();
}
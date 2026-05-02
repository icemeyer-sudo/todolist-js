/* Permet de connaitre le nombre d'eventListener en cours -- Code à mettre dans la console

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
let id = 1;
let tasks = [];

buttonAddTask.addEventListener('click', (e) => {
    e.preventDefault();
    addTask(newTask);
});

function addTask(newTask) {
    if (!newTask.value) { return }
    createList();

    const ul = document.querySelector('#ul-task-in-progress');
    const content = newTask.value[0].toUpperCase() + newTask.value.slice(1);

    const li = document.createElement('li');
    li.setAttribute('data-id', id)

    const checkbox = document.createElement('img');
    checkbox.setAttribute('class', 'checkbox-task');
    checkbox.setAttribute('src', './public/images/check.svg');

    const spanId = document.createElement('span');
    spanId.setAttribute('class', 'span-id');
    spanId.textContent = id;

    const span = document.createElement('span');
    span.setAttribute('class', 'span-task');
    span.textContent = content;

    const deleteButton = document.createElement('img');
    deleteButton.setAttribute('src', './public/images/trash.svg');
    deleteButton.setAttribute('class', 'button-delete');
    deleteButton.textContent = 'Supprimer la tâche';

    ul.append(li);
    li.append(checkbox);
    li.append(spanId);
    li.append(span);
    li.append(deleteButton);

    task = {
        id,
        task: content,
        checked: false
    };

    tasks.push(task);
    newTask.value = '';
    id++;
}

function handleClickDelete(e) {
    const divTask = document.querySelector('.div-task');
    const divTaskInProgress = document.querySelector('.div-task-in-progress');
    const divTaskDone = document.querySelector('.div-task-done');
    const btnDeleteAll = document.querySelector('#btn-delete-all');

    deleteTask(e);

    console.log(!divTaskInProgress.querySelector('li'))
    console.log(!divTaskDone.querySelector('li'))

    if ((!divTaskInProgress.querySelector('li')) && (!divTaskDone.querySelector('li'))) {
        divTask.remove();
    }
    if (!divTaskInProgress.querySelector('li')) {
        divTaskInProgress.remove();
        btnDeleteAll.remove();
    }
    if (!divTaskDone.querySelector('li')) {
        divTaskDone.remove();
        btnDeleteAll.remove();
    }
}

function deleteTask(e) {
    const li = e.target.parentNode;
    li.remove();
}

function createList() {
    if (!document.querySelector('#ul-task-in-progress')) {
        createUlTaskInProgress();
        createEventListener();
        createBtnDeleteAll();
    }
}

function createUlTaskInProgress() {
    const divTodo = document.querySelector('#div-todo-list');

    const divTask = document.createElement('div');
    divTask.setAttribute('class', 'div-task');

    const divTaskInProgress = document.createElement('div');
    divTaskInProgress.setAttribute('class', 'div-task-in-progress');

    const titleTaskInProgress = document.createElement('h2');
    titleTaskInProgress.setAttribute('class', 'title-task-in-progress');
    titleTaskInProgress.textContent = 'Tâches en cours';

    const ul = document.createElement('ul');
    ul.setAttribute('id', 'ul-task-in-progress');

    divTodo.appendChild(divTask);
    divTask.appendChild(divTaskInProgress)
    divTaskInProgress.appendChild(titleTaskInProgress);
    divTaskInProgress.appendChild(ul);
}

function createEventListener() {
    const div = document.querySelector('#div-todo-list');
    div.addEventListener('click', (e) => {
        if(e.target.classList.contains("button-delete")) {
            handleClickDelete(e);
        }
        if(e.target.classList.contains("checkbox-task")) {
            handleCheck(e);
        }
    });
}

function handleCheck(e) {
    const checkBox = e.target;
    const task = e.target.parentNode;

    if(task.getAttribute('class') === 'checked') {
        const ul = document.querySelector('#ul-task-in-progress');
        task.classList.remove('checked');
        checkBox.removeAttribute('src');
        checkBox.setAttribute('src', './public/images/check.svg');
        ul.append(task);
    } else {
        task.setAttribute('class', 'checked');
        checkBox.removeAttribute('src');
        checkBox.setAttribute('src', './public/images/uncheck.svg');
        const TitleTaskDone = document.querySelector('.title-task-done');

        if(!TitleTaskDone) {
            const divTask = document.querySelector('.div-task');

            const divTaskInProgress = document.createElement('div');
            divTaskInProgress.setAttribute('class', 'div-task-done');

            const titleTaskDone = document.createElement('h2');
            titleTaskDone.setAttribute('class', 'title-task-done');
            titleTaskDone.textContent = 'Tâches terminées';

            const ulTaskDone = document.createElement('ul');
            ulTaskDone.setAttribute('class', 'ul-task-done');

            divTask.append(divTaskInProgress);
            divTaskInProgress.append(titleTaskDone);
            titleTaskDone.after(ulTaskDone);
        }

        const titleTaskDone = document.querySelector('.title-task-done');
        const ulTaskDone = document.querySelector('.ul-task-done');
        ulTaskDone.append(task);
    }
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
    const ulTaskInProgress = document.querySelector('#ul-task-in-progress'); // ul task in progress
    const ulTaskDone = document.querySelector('.ul-task-done'); // ul task done
    const titleTaskInProgress = document.querySelector('.title-task-in-progress'); // h2
    const titleTaskDone = document.querySelector('.title-task-done'); // h2
    const btnDeleteAll = document.querySelector('#btn-delete-all'); // btn
    // Supprimer les eventListeners ici n'est pas obligatoire
    // La suppression du DOM netoie automatiquement les eventListeners
    ulTaskInProgress.removeEventListener('click', handleClickDelete);
    btnDeleteAll.removeEventListener('click', handleDeleteAll);
    if(ulTaskInProgress) {
        ulTaskInProgress.remove();
        titleTaskInProgress.remove();
    }
    if(ulTaskDone) {
        ulTaskDone.remove();
        titleTaskDone.remove();
    }
    btnDeleteAll.remove();

}
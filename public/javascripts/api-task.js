window.addEventListener('DOMContentLoaded', (event) => {
    addCreateFunction()
    const buttons = document.querySelectorAll('.delete-task-btn')
    buttons.forEach(button => addDeleteFunction(button));
})

const addCreateFunction = () => {
    const addTaskButton = document.getElementById('new-button')

    addTaskButton.addEventListener('click', async (ev) => {
        ev.preventDefault();
        const textBox = document.getElementById('new-textbox');
        const description = textBox.value;
        const dueDateBox = document.getElementById('dueDate');
        const dueDate = dueDateBox.value;
        const minutesBox = document.getElementById('minutes');
        const minutesValue = minutesBox.value
        const hoursBox = document.getElementById('hours');
        const hoursValue = hoursBox.value;
        const estimatedTime = hoursValue * 60 + minutesValue;
        const priorityBox = document.getElementById('importance')
        const importance = priorityBox.value;

        const listId = window.location.href.split('/')[4]

        const res = await fetch('/tasks', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ listId, description, dueDate, estimatedTime, importance })
        })

        const data = await res.json();

        if (data.errors) {

            //add error handling

        } else {

            const ul = document.getElementById('task-list-render');

            const container = document.createElement('div');
            container.id = `task-container-${data.id}`;

            const li = document.createElement('li');
            li.id = `task-list-${data.id}`;
            li.innerText = data.description;

            const updateBtn = document.createElement('button');
            updateBtn.id = `update-${data.id}`;
            updateBtn.classList.add('update-task-btn');
            updateBtn.innerText = 'Update';

            const deleteBtn = document.createElement('button');
            deleteBtn.id = `delete-${data.id}`;
            deleteBtn.classList.add('delete-task-btn');
            deleteBtn.innerText = 'Delete';

            container.appendChild(li);
            container.appendChild(updateBtn);
            container.appendChild(deleteBtn);
            ul.appendChild(container);

            console.log(ul);

            addDeleteFunction(deleteBtn);
        }

        textBox.value = null;
        dueDateBox.value = null;
        minutesBox.value = null;
        hoursBox.value = null;
        priorityBox.innerHTML = `
        <select name=importance id=importance>
            <option value=""> -- Select Priority -- </option>
            <option value=0> None </option>
            <option value=3> High </option>
            <option value=2> Medium </option>
            <option value=1> Low </option>
        </select>

        `
    })
}

const addDeleteFunction = (button) => {
    button.addEventListener('click', async (ev) => {
        const taskId = ev.target.id.split('-')[1]

        const res = await fetch(`/tasks/${taskId}`, {
            method: "DELETE"
        })

        const data = await res.json();
        if (data.message === "Task successfully deleted") {
            const container = document.getElementById(`task-container-${taskId}`)

            container.remove()
        }
    })
}

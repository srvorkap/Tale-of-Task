window.addEventListener('DOMContentLoaded', (event) => {
    addCreateFunction()

    const updateButtons = document.querySelectorAll('.update-task-btn')
    updateButtons.forEach(button => addUpdateFunction(button))
    const deleteButtons = document.querySelectorAll('.delete-task-btn')
    deleteButtons.forEach(button => addDeleteFunction(button));
})

const addCreateFunction = () => {
    const addTaskButton = document.getElementById('new-button')

    addTaskButton.addEventListener('click', async (ev) => {
        ev.preventDefault();

        // Errors flicker when spamming add without proper info
        const errorsDisplay = document.getElementById('add-errors-display');
        if (errorsDisplay.firstChild) {
            errorsDisplay.childNodes.forEach(c => c.remove());
        }

        const textBox = document.getElementById('new-textbox');
        const dueDateBox = document.getElementById('dueDate');
        const hoursBox = document.getElementById('hours');
        const minutesBox = document.getElementById('minutes');
        const priorityBox = document.getElementById('importance')

        const description = textBox.value;
        const dueDate = dueDateBox.value;

        console.log(dueDate);

        const hoursValue = hoursBox.value;
        const minutesValue = minutesBox.value;
        const estimatedTime = parseInt(hoursValue, 10) * 60 + parseInt(minutesValue, 10);

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

            data.errors.forEach(msg => {
                if (errorsDisplay.firstChild) {
                    errorsDisplay.childNodes.forEach(c => c.remove());
                }
                const li = document.createElement('li');
                li.innerText = msg;
                errorsDisplay.append(li);
            })

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

            // console.log(ul);

            addDeleteFunction(deleteBtn);
            addUpdateFunction(updateBtn)
        }

        textBox.value = null;
        dueDateBox.value = null;
        minutesBox.value = null;
        hoursBox.value = null;
        priorityBox.innerHTML = `
        <select name=importance id=importance>
            <option value=""> ~ Priority ~ </option>
            <option value=0> None </option>
            <option value=3> High </option>
            <option value=2> Medium </option>
            <option value=1> Low </option>
        </select>
        `;
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

const addSaveFunction = (button, form) => {
    button.addEventListener('click', async (ev) => {
        ev.preventDefault();

        // Need error handling
        // Make the other buttons visible again

        const taskId = ev.target.id.split('-')[1]
        const taskListDiv = document.getElementById(`task-container-${taskId}`);
        const updateForm = document.getElementById(`update-form-${taskId}`);
        const divKids = taskListDiv.children;

        const updateDate = new FormData(form);
        const dataObj = {};
        for (let pair of updateDate.entries()) {
            dataObj[pair[0]] = pair[1];
        }
        // console.log(dataObj);

        dataObj.estimatedTime = parseInt(dataObj.hours, 10) * 60 + parseInt(dataObj.minutes, 10);

        const res = await fetch(`/tasks/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataObj)
        })

        const data = await res.json();
        // console.log(data.errors);

        if (data.errors) {
            const errorsDisplay = document.getElementById(`errors-${taskId}`);
            data.errors.forEach(msg => {
                if (errorsDisplay.firstChild) {
                    errorsDisplay.childNodes.forEach(c => c.remove());
                }
                const li = document.createElement('li');
                li.innerText = msg;
                errorsDisplay.append(li);
            });
        } else {
            for (let el of divKids) {
                el.style.display = '';
            }
            const li = document.getElementById(`task-list-${taskId}`);
            li.innerText = dataObj.description;
            updateForm.remove();
        }
    })
};

const addOption = (text, value, importance) => {
    const opt = document.createElement('option');
    opt.innerText = text;
    opt.value = value;
    if (value === importance) {
        opt.selected = 'selected';
    };
    return opt;
};

const addUpdateFunction = (button) => {
    button.addEventListener('click', async (ev) => {
        ev.preventDefault();

        const taskId = ev.target.id.split('-')[1];
        // console.log(taskId);
        const taskListDiv = document.getElementById(`task-container-${taskId}`);
        const divKids = taskListDiv.children;
        for (let el of divKids) {
            el.style.display = 'none';
        }

        const res = await fetch(`/tasks/${taskId}`, {
            method: "GET"
        });

        const data = await res.json()

        const { description, dueDate, estimatedTime, importance } = data;

        const minutes = estimatedTime % 60;
        const hours = Math.floor(estimatedTime / 60);

        const form = document.createElement('form');
        const textDiv = document.createElement('div');
        const dataDiv = document.createElement('div');
        const errorsDiv = document.createElement('div');
        const dueDateLabel = document.createElement('label');
        const timeLabel = document.createElement('label');
        const hoursLabel = document.createElement('label');
        const minutesLabel = document.createElement('label');
        const textInput = document.createElement('input');
        const dueDateInput = document.createElement('input');
        const hoursInput = document.createElement('input');
        const minutesInput = document.createElement('input');
        const select = document.createElement('select');
        const optionSelect = document.createElement('option');
        const optionNone = addOption('None', 0, importance)
        const optionHigh = addOption('High', 3, importance)
        const optionMed = addOption('Med', 2, importance)
        const optionLow = addOption('Low', 1, importance)
        const errorsDisplay = document.createElement('ul')
        const saveButton = document.createElement('button');

        form.id = `update-form-${taskId}`;
        // form.classList.add('entry');

        textInput.type = 'text';
        textInput.name = 'description';
        textInput.id = `text-box-${taskId}`;
        textInput.classList.add('update-text-input');
        textInput.value = description;

        dueDateLabel.for = 'dueDate';
        dueDateLabel.innerText = 'Due Date';
        dueDateInput.type = 'date';
        dueDateInput.id = `dueDate-${taskId}`;
        dueDateInput.value = dueDate;

        timeLabel.innerText = 'Estimated Time:';

        hoursLabel.for = 'hours';
        hoursLabel.innerText = "Hours";
        hoursInput.type = 'number';
        hoursInput.name = 'hours'
        hoursInput.id = `hours-${taskId}`
        hoursInput.value = hours;
        hoursInput.classList.add('update-time-input');

        minutesLabel.for = 'minutes';
        minutesLabel.innerText = "Minutes";
        minutesInput.type = 'number';
        minutesInput.name = 'minutes';
        minutesInput.id = `minutes-${taskId}`;
        minutesInput.value = minutes;
        minutesInput.classList.add('update-time-input');

        select.name = 'importance';
        select.id = `importance-${taskId}`;
        optionSelect.innerText = "~ Priority ~";

        saveButton.innerText = "Save";
        saveButton.id = `save-${taskId}`;
        saveButton.classList.add('update-save-btn')
        addSaveFunction(saveButton, form);

        errorsDisplay.id = `errors-${taskId}`;
        errorsDiv.appendChild(errorsDisplay);

        select.appendChild(optionSelect);
        select.appendChild(optionNone);
        select.appendChild(optionHigh);
        select.appendChild(optionMed);
        select.appendChild(optionLow);

        textDiv.appendChild(textInput);

        dataDiv.appendChild(dueDateLabel);
        dataDiv.appendChild(dueDateInput);
        dataDiv.appendChild(timeLabel);
        dataDiv.appendChild(hoursLabel);
        dataDiv.appendChild(hoursInput);
        dataDiv.appendChild(minutesLabel);
        dataDiv.appendChild(minutesInput);
        dataDiv.appendChild(select);
        dataDiv.appendChild(saveButton);

        form.appendChild(textDiv);
        form.appendChild(dataDiv);
        form.appendChild(errorsDiv);

        // console.log(form)
        taskListDiv.appendChild(form);
    })

}

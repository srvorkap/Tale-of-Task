window.addEventListener('DOMContentLoaded', (event) => {

    addTask()
    deleteTask()

})

const addTask = () => {
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

            const ul = document.getElementById('task-list-render')

            ul.innerHTML += `
        <div class=task-container-${data.id}>
            <li class-list-${data.id} task-list>${data.description}</li>
            <button id=update-${data.id} class=update-task-button>Update</button>
            <button id=delete-${data.id} class=delete-task-btn>Delete</button>
        </div>
        `
        }
        textBox.value = null;
        dueDateBox.value= null;
        minutesBox.value = null;
        hoursBox.value= null;
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





const deleteTask = () => {
    const buttons = document.querySelectorAll('.delete-task-btn')


    buttons.forEach(button => {
        button.addEventListener('click', async (ev) => {
            const taskId = ev.target.id.split('-')[1]
            console.log(ev.target.id)

            const res = await fetch(`/tasks/${taskId}`, {
                method: "DELETE"
            })

            const data = await res.json();
            if (data.message === "Task successfully deleted") {
                const container = document.querySelector(`.task-container-${taskId}`)

                container.remove()
            }
        })
    })
}



const addTask = document.getElementById('new-button')

addTask.addEventListener('click', async (ev) => {
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

    // const userId = user.id;
    const listId = window.location.href.split('/')[4]
    const user = await fetch(`/lists/${listId}`, {
        method: "GET"
    })
    console.log(description)
    const res = await fetch('/tasks', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, listId, description, dueDate, estimatedTime, importance })
    })

    const data = await res.json();
    if (data.errors) {
        console.log(errors)
        //add error handling
    } else {
        const ul = document.getElementById('task-list-render')
        const li = document.createElement('li');
        li.innerText = description
        ul.appendChild(li)
    }
})

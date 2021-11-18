// ADD LIST BUTTON AND POPUP
const addListForm = document.getElementById("add-list-form");
const addListButton = document.getElementById('add-list-button');

addListButton.addEventListener("click", e => {
    e.preventDefault();
    const addListPopup = document.getElementById('add-list-popup')
    addListPopup.classList.add('open')
})

const blockerAdd = document.querySelector('.blocker-add')

blockerAdd.addEventListener("click", e => {
    e.preventDefault();
    const addErrorUl = document.getElementById('add-error-ul');
    if (addErrorUl.firstChild) {
        addErrorUl.childNodes.forEach(c => c.remove());
    }
    const addListPopup = document.getElementById('add-list-popup')
    addListPopup.classList.remove('open')
})

addListForm.addEventListener("submit", async (e) => {
    const addListPopup = document.getElementById('#add-list-form');
    e.preventDefault();
    const formData = new FormData(addListForm);
    const name = formData.get("name");
    const csrfToken = document.getElementById("addCsrf").value
    const data = await fetch('/lists', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': csrfToken
        },
        credentials: 'include',
        body: JSON.stringify({
            name
        })
    })

    const dataJSON = await data.json();

    if (dataJSON.message) {
        window.location.href = `/lists/${dataJSON.message}`
    }

    if (!data.ok) {
        throw data;
    }

    if (dataJSON.errors) {
        const addErrorUl = document.getElementById('add-error-ul');

        // const addContent = document.getElementById('add-content')
        // const errorDiv = document.createElement("div");
        // const errorHeader = document.createElement("p");
        // errorHeader.setAttribute("id", "errorHeader")
        // const ul = document.createElement("ul")
        // errorHeader.innerHTML = "The following error(s) occurred:"
        // addContent.append(errorDiv);
        // errorDiv.append(errorHeader);
        // errorDiv.append(ul);

        dataJSON.errors.forEach(error => {
            const errorMessage = document.createElement("li");
            errorMessage.innerHTML = error;
            addErrorUl.append(errorMessage);
        })
    }

})

const cancelListButton = document.getElementById('cancel-add-list');
cancelListButton.addEventListener("click", () => {
    const addErrorUl = document.getElementById('add-error-ul');
    if (addErrorUl.firstChild) {
        addErrorUl.childNodes.forEach(c => c.remove());
    }
    const addListPopup = document.getElementById('add-list-popup');
    addListPopup.classList.remove('open')
})

// DELETE BUTTON
const deleteListButtons = document.getElementsByClassName("delete-list-buttons");

for (let i = 0; i < deleteListButtons.length; i++) {
    const deleteList = deleteListButtons[i];
    deleteList.addEventListener("click", async (e) => {
        let deleteListId = e.target.id.split('-')[2]
        const deleteId = parseInt(deleteListId, 10);
        const data = await fetch(`/lists/${deleteId}`, {
            method: "DELETE"
        });

        if (!data.ok) {
            throw data;
        }

        const dataJSON = await data.json();

        if (dataJSON.message) {
            window.location.href = `/lists/${dataJSON.message}`
        }
    })
}

// UPDATE BUTTON
const updateListButtons = document.getElementsByClassName("update-list-buttons");
const updateListForm = document.getElementById("update-list-form")
const updateListPopup = document.getElementById('update-list-popup');
let updateTarget;
let updateId;

for (let i = 0; i < updateListButtons.length; i++) {
    const updateListButton = updateListButtons[i];
    updateListButton.addEventListener("click", e => {
        updateListPopup.classList.add('open');
        updateTarget = e.target.id.split('-')[2];
        updateId = parseInt(updateTarget, 10);
    })
}

const blockerUpdate = document.querySelector('.blocker-update')

blockerUpdate.addEventListener("click", e => {
    e.preventDefault();
    const updateErrorUl = document.getElementById('update-error-ul');
        if (updateErrorUl.firstChild) {
            console.log(updateErrorUl.childNodes)
            updateErrorUl.childNodes.forEach(c => c.remove());
        }
    const updateListPopup = document.getElementById('update-list-popup')
    updateListPopup.classList.remove('open')
})

const submitUpdate = document.getElementById("submit-update-list");
submitUpdate.addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = new FormData(updateListForm);
    const name = formData.get("name");
    const csrfToken = document.getElementById("updateCsrf").value
    const data = await fetch(`/lists/${updateId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken
        },
        credentials: 'include',
        body: JSON.stringify({
            name
        })
    })

    if (!data.ok) {
        throw data;
    }

    const dataJSON = await data.json();



    if (dataJSON.errors) {
        const updateContent = document.getElementById('update-content')
        const updateErrorUl = document.getElementById('update-error-ul');
        dataJSON.errors.forEach(error => {
            const errorMessage = document.createElement("li");
            errorMessage.innerHTML = error;
            updateErrorUl.append(errorMessage);
        })
    }

    if (dataJSON.message) {
        window.location.href = `/lists/${dataJSON.message}`
    }
})

const cancelUpdateListButton = document.getElementById('cancel-update-list');
cancelUpdateListButton.addEventListener("click", () => {
    const updateErrorUl = document.getElementById('update-error-ul');
    if (updateErrorUl.firstChild) {
        console.log(updateErrorUl.childNodes)
        updateErrorUl.childNodes.forEach(c => c.remove());
    }
    const updateListPopup = document.getElementById('update-list-popup');
    updateListPopup.classList.remove('open')
})

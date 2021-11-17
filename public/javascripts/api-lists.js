// ADD LIST BUTTON AND POPUP
const addListForm = document.getElementById("add-list-form");
const addListButton = document.getElementById('add-list-button');

addListButton.addEventListener("click", e => {
    e.preventDefault();
    const addListPopup = document.getElementById('add-list-popup');
    addListPopup.style.display = 'block';
})

addListForm.addEventListener("submit", async (e) => {
    const addListPopup = document.getElementById('add-list-popup');
    e.preventDefault();
    const formData = new FormData(addListForm);
    const name = formData.get("name");
    const data = await fetch('/lists', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
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
        const errorDiv = document.createElement("div");
        const errorHeader = document.createElement("p");
        const ul = document.createElement("ul")
        errorHeader.innerHTML = "The following error(s) occurred:"
        addListPopup.append(errorDiv);
        errorDiv.append(errorHeader);
        errorDiv.append(ul);

        dataJSON.errors.forEach(error => {
            const errorMessage = document.createElement("li");
            errorMessage.innerHTML = error;
            ul.append(errorMessage);
        })
    }

})

const cancelListButton = document.getElementById('cancel-add-list');
cancelListButton.addEventListener("click", () => {
    const addListPopup = document.getElementById('add-list-popup');
    addListPopup.style.display = 'none';
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

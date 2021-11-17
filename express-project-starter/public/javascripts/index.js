window.addEventListener("load", (event) => {
    // Add-list pop-up
    const addListButton = document.getElementById('add-list-button');
    addListButton.addEventListener("click", () => {
        const addListPopup = document.getElementById('add-list-popup');
        addListPopup.style.display = 'block';
        const submitAddList = document.getElementById('submit-add-list');
        submitAddList.addEventListener("click", e => {
            const errorListItem = document.getElementById('error-list-item');
            console.log(errorListItem)
            if (errorListItem) {
                e.preventDefault();
            }
        })

    })

    const cancelListButton = document.getElementById('cancel-add-list');
    cancelListButton.addEventListener("click", () => {
        const addListPopup = document.getElementById('add-list-popup');
        addListPopup.style.display = 'none';
    })
})

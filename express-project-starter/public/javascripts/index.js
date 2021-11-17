window.addEventListener("load", (event)=>{
    // Add-list pop-up
    const addListButton = document.getElementById('add-list-button');
    addListButton.addEventListener("click", () => {
        const addListPopup = document.getElementById('add-list-popup');
        addListPopup.style.display = 'block';
    })

    const cancelListButton = document.getElementById('cancel-add-list');
    cancelListButton.addEventListener("click", () => {
        const addListPopup = document.getElementById('add-list-popup');
        addListPopup.style.display = 'none';
    })
})

// window.addEventListener("load", (event) => {
    console.log("script loaded")
    // Add-list pop-up
    const addListForm = document.getElementById("add-list-form");
    console.log(addListForm)
    const addListButton = document.getElementById('add-list-button');

    addListButton.addEventListener("click", e => {
        e.preventDefault();
        const addListPopup = document.getElementById('add-list-popup');
        addListPopup.style.display = 'block';
    })

    addListForm.addEventListener("submit", async(e) => {
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


    // const addListPopup = document.getElementById("add-list-popup");
    // const submitAddList = document.getElementById('submit-add-list');
    // submitAddList.addEventListener("click", e => {
    //     const errorDiv = document.createElement("div");
    //     const errorHeader = document.createElement("p");
    //     const ul = document.createElement("ul")
    //     errorHeader.innerHTML = "The following error(s) occurred:"
    //     addListPopup.append(errorDiv);
    //     errorDiv.append(errorHeader);
    //     errorDiv.append(ul);

    //     errors.forEach(error => {
    //         const errorMessage = document.createElement("li");
    //         li.innerHTML = error;
    //         ul.append(li);
    //     })

    //     e.preventDefault();
    // })



    const cancelListButton = document.getElementById('cancel-add-list');
    cancelListButton.addEventListener("click", () => {
        const addListPopup = document.getElementById('add-list-popup');
        addListPopup.style.display = 'none';
    })
// })

function storeClass(className) {
    window.localStorage.setItem("class", className)
}


function restoreClass() {
    const prevClass = window.localStorage.getItem("class")

    if (prevClass) {
        let classElement = document.getElementById('current-class-name');
        if (prevClass === 'WhiteMage') {
            classElement.innerText = 'White Mage';
        } else if (prevClass === 'BlackMage') {
            classElement.innerText = 'Black Mage';
        } else if (prevClass === 'RedMage') {
            classElement.innerText = 'Red Mage';
        } else if (prevClass === 'DarkKnight') {
            classElement.innerText = 'Dark Knight';
        } else {
            classElement.innerText = prevClass;
        }

        let profileClassImage = document.getElementById('profile-sprite');
        profileClassImage.src = `../images/${prevClass}.png`

        let selectedClassIcon = document.getElementById(prevClass);
        selectedClassIcon?.classList.add('class-selected');
        let sidebar = document.getElementById('sidebar');
        sidebar.classList.add(prevClass)
        let profileClassIcon = document.getElementById('profile-job-icon');
        profileClassIcon.src = `../images/${prevClass}Icon.png`
    }
}


function setClass(className, unlocked) {
    let selectedClassIcon = document.getElementById(className);

    if (unlocked && !unlocked.includes(className)) {
        let lockedMessage = selectedClassIcon.previousElementSibling;
        lockedMessage.style.opacity = 1;
        setTimeout(() => {
            lockedMessage.style.opacity = 0;
        }, 2000)
    }

    if (unlocked && unlocked.includes(className)) {
        let prevClass = window.localStorage.getItem("class")
        let prevSelectedClassIcon = document.getElementById(prevClass);
        if (prevSelectedClassIcon) {
            prevSelectedClassIcon.classList.remove('class-selected');
        }

        storeClass(className);
        let classElement = document.getElementById('current-class-name');
        if (className === 'WhiteMage') {
            classElement.innerText = 'White Mage';
        } else if (className === 'BlackMage') {
            classElement.innerText = 'Black Mage';
        } else if (className === 'RedMage') {
            classElement.innerText = 'Red Mage';
        } else if (className === 'DarkKnight') {
            classElement.innerText = 'Dark Knight';
        } else {
            classElement.innerText = className;
        }

        selectedClassIcon.classList.add('class-selected');

        let sidebar = document.getElementById('sidebar');
        sidebar.classList.remove(prevClass)
        sidebar.classList.add(className)

        let profileClassImage = document.getElementById('profile-sprite');
        profileClassImage.src = `../images/${className}.png`;

        let profileClassIcon = document.getElementById('profile-job-icon');
        profileClassIcon.src = `../images/${className}Icon.png`
    }
}


function addClassEventListeners(unlocked) {
    const classes = ['Paladin', 'Warrior', 'Dragoon', 'Monk', 'Bard',
        'BlackMage', 'Summoner', 'Scholar', 'WhiteMage',
        'Ninja', 'Machinist', 'DarkKnight', 'Astrologian',
        'RedMage', 'Samurai', 'Dancer', 'Gunbreaker', 'Sage',
        'Reaper'];
    classes.forEach(className => {
        const toggleClass = document.getElementById(className);
        toggleClass.addEventListener('click', () => setClass(className, unlocked))
    })
}

function checkLockedClasses() {
    let currentLevel = parseInt(document.getElementById('user-level').innerText);
    let unlocked = ['Paladin', 'Warrior', 'Dragoon', 'Monk', 'Bard',
        'BlackMage', 'Summoner', 'Scholar', 'WhiteMage'];

    if (currentLevel >= 5) unlocked.push('Ninja');
    if (currentLevel >= 8) unlocked.push('Machinist', 'DarkKnight', 'Astrologian');
    if (currentLevel >= 10) unlocked.push('RedMage', 'Samurai');
    if (currentLevel >= 15) unlocked.push('Dancer', 'Gunbreaker');
    if (currentLevel >= 20) unlocked.push('Sage', 'Reaper');

    unlocked.forEach(className => {
        let element = document.getElementById(className)
        element.classList.remove('class-locked');
        element.classList.add('class-unlocked')
    })

    return unlocked;
}

function addCancelMoogleEvent() {
    const moogleDiv = document.getElementById('moogle-info-container');
    const moogleButton = document.getElementById('close-button');
    moogleButton.addEventListener('click', () => {
        moogleDiv.style.display = 'none';
        storeMooglePopup();
    })
}

function storeMooglePopup() {
    window.localStorage.setItem("moogle", false);
}

function restoreMooglePopup() {
    const isOpen = window.localStorage.getItem("moogle");
    const moogleDiv = document.getElementById('moogle-info-container');
    if (!isOpen) {
        moogleDiv.style.display = 'flex';
    }
}


function initializePage() {
    restoreClass();
    const unlocked = checkLockedClasses();
    addClassEventListeners(unlocked);
    restoreMooglePopup();
    addCancelMoogleEvent();
}


window.addEventListener('DOMContentLoaded', initializePage);

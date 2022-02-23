function storeClass(className) {
    window.localStorage.setItem("class", className)
}

function restoreClass() {
    const prevClass = window.localStorage.getItem("class")
    if (prevClass) {
        setClass(prevClass)
    } else {
        setClass("Paladin")
    }
}


function setClass(className, unlocked) {
    let selectedClassIcon = document.getElementById(className);

    if (unlocked && !unlocked.includes(className)) {
        let lockedMessage = selectedClassIcon.previousElementSibling;
        lockedMessage.classList.remove('class-locked-hidden')
        lockedMessage.classList.add('class-locked-notice')
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

        let profileClassImage = document.getElementById('profile-sprite');
        profileClassImage.src = `../images/${className}.png`
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


function initializePage() {
    restoreClass();
    const unlocked = checkLockedClasses();
    console.log(unlocked)
    addClassEventListeners(unlocked);
}


window.addEventListener('DOMContentLoaded', initializePage);

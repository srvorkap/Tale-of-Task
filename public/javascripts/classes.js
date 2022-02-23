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


function setClass(className) {
    console.log('IN EVENT LISTENER', className)
    let prevClass = window.localStorage.getItem("class")
    let prevSelectedClassIcon = document.getElementById(prevClass);
    if (prevSelectedClassIcon) {
        prevSelectedClassIcon.classList.remove('class-selected');
    }

    storeClass(className);
    let classElement = document.getElementById('current-class-name');
    classElement.innerText = className;

    let selectedClassIcon = document.getElementById(className);
    selectedClassIcon.classList.add('class-selected');

    let profileClassImage = document.getElementById('profile-sprite');
    profileClassImage.src = `../images/${className}.png`

}


function addClassEventListeners() {
    const classes = ['Paladin', 'Warrior', 'Dragoon', 'Monk', 'Bard',
                    'BlackMage', 'Summoner', 'Scholar', 'WhiteMage',
                    'Ninja', 'Machinist', 'DarkKnight', 'Astrologian',
                    'RedMage', 'Samurai', 'Dancer', 'Gunbreaker', 'Sage',
                    'Reaper'];
    classes.forEach(className => {
        const toggleClass = document.getElementById(className);
        console.log(className)
        toggleClass.addEventListener('click', () => setClass(className))
    })
}


function initializePage() {
    restoreClass();
    addClassEventListeners();
}


window.addEventListener('DOMContentLoaded', initializePage);

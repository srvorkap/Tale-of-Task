const sprites = {
    paladin: {
        name: 'Paladin',
        url: '../images/Paladin.png'
    },
    monk: {
        name: 'Monk',
        url: '../images/Monk.png'
    },
    warrior: {
        name: 'Warrior',
        url: '../images/Warrior.png'
    },
    dragoon: {
        name: 'Dragoon',
        url: '../images/Dragoon.png'
    },
    bard: {
        name: 'Bard',
        url: '../images/Bard.png'
    },
    whiteMage: {
        name: 'White Mage',
        url: '../images/WhiteMage.png'
    },
    blackMage: {
        name: 'Black Mage',
        url: '../images/BlackMage.png'
    },
    summoner: {
        name: 'Summoner',
        url: '../images/Summoner.png'
    },
    scholar: {
        name: 'Scholar',
        url: '../images/Scholar.png'
    },
    ninja: {
        name: 'Ninja',
        url: '../images/Ninja.png'
    },
    machinist: {
        name: 'Machinist',
        url: '../images/Machinist.png'
    },
    darkKnight: {
        name: 'Dark Knight',
        url: '../images/DarkKnight.png'
    },
    astrologian: {
        name: 'Astrologian',
        url: '../images/Astrologian.png'
    },
    dancer: {
        name: 'Dancer',
        url: '../images/Dancer.png'
    },
    gunbreaker: {
        name: 'Gunbreaker',
        url: '../images/Gunbreaker.png'
    },
    reaper: {
        name: 'Reaper',
        url: '../images/Reaper.png'
    },
    sage: {
        name: 'Sage',
        url: '../images/Sage.png'
    },
    samurai: {
        name: 'Samurai',
        url: '../images/Samurai.png'
    },
    redMage: {
        name: 'Red Mage',
        url: '../images/RedMage.png'
    },
}

const data = [];
for (let job in sprites) {
    data.push([sprites[job]['name'], sprites[job]['url']])
}

const spriteDisplay = document.getElementById('login-sprites');

window.addEventListener('DOMContentLoaded', (e) => {

    const nums = [];
    while (nums.length < 4) {
        const r = Math.floor(Math.random() * 18);
        if (nums.indexOf(r) === -1) nums.push(r);
    }

    const html = nums.map(n => {
        return `<img class="sprite" src="${data[n][1]}" alt="Pixel sprite of ${data[n][0]}">`;
    })

    spriteDisplay.innerHTML = html.join('');
    const allSprites = spriteDisplay.children;
    for (let i = 0; i < 4; i++) {
        allSprites[i].style.opacity = 0;
    }
    setTimeout(() => {
        for (let i = 0; i < 4; i++) {
            allSprites[i].style.opacity = 1;
        }
    }, 100)
})

spriteDisplay.addEventListener('click', (e) => {

    const nums = [];
    while (nums.length < 4) {
        const r = Math.floor(Math.random() * 18);
        if (nums.indexOf(r) === -1) nums.push(r);
    }

    const html = nums.map(n => {
        return `<img class="sprite" src="${data[n][1]}" alt="Pixel sprite of ${data[n][0]}">`;
    })

    spriteDisplay.innerHTML = html.join('');
    const allSprites = spriteDisplay.children;
    for (let i = 0; i < 4; i++) {
        allSprites[i].style.opacity = 0;
    }
    setTimeout(() => {
        for (let i = 0; i < 4; i++) {
            allSprites[i].style.opacity = 1;
        }
    }, 100);
})

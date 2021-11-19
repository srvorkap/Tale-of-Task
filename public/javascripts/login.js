const sprites = {
    paladin: {
        name: 'Paladin',
        url: 'http://www.finalfantasyxiv.com/fankit_patch335/51Dyfvhz/ffxiv_twi05001.png'
    },
    monk: {
        name: 'Monk',
        url: 'http://www.finalfantasyxiv.com/fankit_patch335/51Dyfvhz/ffxiv_twi05002.png'
    },
    warrior: {
        name: 'Warrior',
        url: 'http://www.finalfantasyxiv.com/fankit_patch335/51Dyfvhz/ffxiv_twi05003.png'
    },
    dragoon: {
        name: 'Dragoon',
        url: 'http://www.finalfantasyxiv.com/fankit_patch335/51Dyfvhz/ffxiv_twi05004.png'
    },
    bard: {
        name: 'Bard',
        url: 'http://www.finalfantasyxiv.com/fankit_patch335/51Dyfvhz/ffxiv_twi05005.png'
    },
    whiteMage: {
        name: 'White Mage',
        url: 'http://www.finalfantasyxiv.com/fankit_patch335/51Dyfvhz/ffxiv_twi05006.png'
    },
    blackMage: {
        name: 'Black Mage',
        url: 'http://www.finalfantasyxiv.com/fankit_patch335/51Dyfvhz/ffxiv_twi05007.png'
    },
    summoner: {
        name: 'Summoner',
        url: 'http://www.finalfantasyxiv.com/fankit_patch335/51Dyfvhz/ffxiv_twi05008.png'
    },
    scholar: {
        name: 'Scholar',
        url: 'http://www.finalfantasyxiv.com/fankit_patch335/51Dyfvhz/ffxiv_twi05009.png'
    },
    ninja: {
        name: 'Ninja',
        url: 'http://www.finalfantasyxiv.com/fankit_patch335/51Dyfvhz/ffxiv_twi05010.png'
    },
    machinist: {
        name: 'Machinist',
        url: 'http://www.finalfantasyxiv.com/fankit_patch335/51Dyfvhz/ffxiv_twi05011.png'
    },
    darkKnight: {
        name: 'Dark Knight',
        url: 'http://www.finalfantasyxiv.com/fankit_patch335/51Dyfvhz/ffxiv_twi05012.png'
    },
    astrologian: {
        name: 'Astrologian',
        url: 'http://www.finalfantasyxiv.com/fankit_patch335/51Dyfvhz/ffxiv_twi05013.png'
    }
}

const data = [];
for (let job in sprites) {
    data.push([sprites[job]['name'], sprites[job]['url']])
}

const spriteDisplay = document.getElementById('login-sprites');

window.addEventListener('DOMContentLoaded', (e) => {

    const nums = [];
    while (nums.length < 4) {
        const r = Math.floor(Math.random() * 12);
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
        const r = Math.floor(Math.random() * 12);
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

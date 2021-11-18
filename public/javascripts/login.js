const sprites = {
    paladin: 'http://www.finalfantasyxiv.com/fankit_patch335/51Dyfvhz/ffxiv_twi05001.png',
    monk: 'http://www.finalfantasyxiv.com/fankit_patch335/51Dyfvhz/ffxiv_twi05002.png',
    warrior: 'http://www.finalfantasyxiv.com/fankit_patch335/51Dyfvhz/ffxiv_twi05003.png',
    dragoon: 'http://www.finalfantasyxiv.com/fankit_patch335/51Dyfvhz/ffxiv_twi05004.png',
    bard: 'http://www.finalfantasyxiv.com/fankit_patch335/51Dyfvhz/ffxiv_twi05005.png',
    whiteMage: 'http://www.finalfantasyxiv.com/fankit_patch335/51Dyfvhz/ffxiv_twi05006.png',
    blackMage: 'http://www.finalfantasyxiv.com/fankit_patch335/51Dyfvhz/ffxiv_twi05007.png',
    summoner: 'http://www.finalfantasyxiv.com/fankit_patch335/51Dyfvhz/ffxiv_twi05008.png',
    scholar: 'http://www.finalfantasyxiv.com/fankit_patch335/51Dyfvhz/ffxiv_twi05009.png',
    ninja: 'http://www.finalfantasyxiv.com/fankit_patch335/51Dyfvhz/ffxiv_twi05010.png',
    machinist: 'http://www.finalfantasyxiv.com/fankit_patch335/51Dyfvhz/ffxiv_twi05011.png',
    darkKnight: 'http://www.finalfantasyxiv.com/fankit_patch335/51Dyfvhz/ffxiv_twi05012.png',
    astrologian: 'http://www.finalfantasyxiv.com/fankit_patch335/51Dyfvhz/ffxiv_twi05013.png'
}

const urls = [];
for (const job in sprites) {
    urls.push(sprites[job])
}

const spriteDisplay = document.getElementById('login-sprites');

window.addEventListener('DOMContentLoaded', (e) => {

    const nums = [];
    while (nums.length < 4) {
        const r = Math.floor(Math.random() * 12);
        if (nums.indexOf(r) === -1) nums.push(r);
    }

    const html = nums.map(n => {
        return `<img class="sprite" src="${urls[n]}">`
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

spriteDisplay.addEventListener('click', (e) => {

    const nums = [];
    while (nums.length < 4) {
        const r = Math.floor(Math.random() * 12);
        if (nums.indexOf(r) === -1) nums.push(r);
    }

    const html = nums.map(n => {
        return `<img class="sprite" src="${urls[n]}">`
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

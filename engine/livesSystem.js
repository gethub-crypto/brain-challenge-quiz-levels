const MAX_LIVES = 3;
const LIFE_REGEN_TIME = 30 * 60 * 1000;

let lives = MAX_LIVES;
let lastLifeTime = Date.now();

function recoverOfflineLives() {

    const now = Date.now();
    const passedMs = now - lastLifeTime;

    const livesToAdd = Math.floor(passedMs / LIFE_REGEN_TIME);

    if (livesToAdd > 0 && lives < MAX_LIVES) {

        lives = Math.min(lives + livesToAdd, MAX_LIVES);
        lastLifeTime = now - (passedMs % LIFE_REGEN_TIME);

        saveGame();
    }
}

function getTimeToNextLife(){

    if(lives >= MAX_LIVES) return "";

    let remaining = LIFE_REGEN_TIME - (Date.now() - lastLifeTime);

    let sec = Math.floor(remaining / 1000);
    let min = Math.floor(sec / 60);

    sec = sec % 60;

    return `${min}:${sec.toString().padStart(2,"0")}`;
}

setInterval(() => {

    if (lives < MAX_LIVES) {

        lives++;
        lastLifeTime = Date.now();
        updateUI();
    }

}, LIFE_REGEN_TIME);

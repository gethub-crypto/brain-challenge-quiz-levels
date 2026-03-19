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

setInterval(() => {

    if (lives < MAX_LIVES) {

        lives++;
        lastLifeTime = Date.now();

        updateUI();
    }

}, LIFE_REGEN_TIME);

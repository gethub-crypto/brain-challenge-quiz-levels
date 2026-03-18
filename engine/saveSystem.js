let playerProgress = {};

function saveGame() {
    localStorage.setItem("quiz_lives", lives);
    localStorage.setItem("quiz_coins", coins);
    localStorage.setItem("quiz_lastLifeTime", lastLifeTime);
    localStorage.setItem("quiz_progress", JSON.stringify(playerProgress));
}

function loadGame() {
    let savedLives = localStorage.getItem("quiz_lives");
    let savedCoins = localStorage.getItem("quiz_coins");
    let savedTime  = localStorage.getItem("quiz_lastLifeTime");
    let savedProgress = localStorage.getItem("quiz_progress");

    if (savedLives) lives = parseInt(savedLives);
    if (savedCoins) coins = parseInt(savedCoins);
    if (savedTime)  lastLifeTime = parseInt(savedTime);

    if (savedProgress) playerProgress = JSON.parse(savedProgress);

    recoverOfflineLives();
        }

// ====== ГЛОБАЛЬНЫЕ ДАННЫЕ ======

let coins = 500; // стартовое количество монет

let boosters = {
    removeTwo: 0,
    skip: 0,
    hint: 0
};

// ====== ЗАГРУЗКА ======

function loadGame(){

    const savedCoins = localStorage.getItem("coins");
    if (savedCoins !== null){
        coins = parseInt(savedCoins);
    }

    const savedBoosters = localStorage.getItem("boosters");
    if (savedBoosters){
        boosters = JSON.parse(savedBoosters);
    }
}

// ====== СОХРАНЕНИЕ ======

function saveGame(){
    localStorage.setItem("coins", coins);
    localStorage.setItem("boosters", JSON.stringify(boosters));
}

// ====== СБРОС (опционально) ======

function resetGame(){
    coins = 500;

    boosters = {
        removeTwo: 0,
        skip: 0,
        hint: 0
    };

    saveGame();
            }

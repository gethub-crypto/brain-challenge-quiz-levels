// =======================
// ГЛОБАЛЬНЫЕ ДАННЫЕ
// =======================

let coins = parseInt(localStorage.getItem("coins")) || 100;
let lives = parseInt(localStorage.getItem("lives")) || 5;
let unlockedLevel = parseInt(localStorage.getItem("unlockedLevel")) || 1;

let questionIndex = 0;
let currentLevel = 1;
let streak = 0;

let currentQuestions = [];


// =======================
// СОХРАНЕНИЕ
// =======================

function saveGame(){
    localStorage.setItem("coins", coins);
    localStorage.setItem("lives", lives);
    localStorage.setItem("unlockedLevel", unlockedLevel);
}


// =======================
// UI ОБНОВЛЕНИЕ
// =======================

function updateUI(){
    const coinsEl = document.getElementById("coins");
    const livesEl = document.getElementById("lives");

    if (coinsEl) coinsEl.innerText = coins;
    if (livesEl) livesEl.innerText = lives;

    saveGame();
}


// =======================
// POPUP
// =======================

function notEnoughCoins(){
    alert("Недостаточно монет!"); // можно потом заменить на красивый popup
}


// =======================
// ЖИЗНИ
// =======================

function loseLife(){
    lives--;

    if (lives < 0) lives = 0;

    updateUI();

    if (lives === 0){
        showGameOver();
    }
}


// =======================
// РЕКЛАМА (заглушка)
// =======================

function rewardAd(){
    coins += 50;
    lives += 1;

    updateUI();
}


// =======================
// ЗАПУСК УРОВНЯ
// =======================

function startLevel(level, questions){
    if (level > unlockedLevel){
        return;
    }

    currentLevel = level;
    currentQuestions = questions;

    questionIndex = 0;
    streak = 0;

    ScreenManager.show("gameScreen");
    loadQuestion();
}


// =======================
// ЗАГРУЗКА ВОПРОСА
// =======================

function loadQuestion(){

    if (questionIndex >= currentQuestions.length){
        finishLevel();
        return;
    }

    const q = currentQuestions[questionIndex];

    document.getElementById("question").innerText = q.question;

    const answersEl = document.getElementById("answers");
    answersEl.innerHTML = "";

    q.answers.forEach((answer, i) => {

        const btn = document.createElement("button");
        btn.innerText = answer;

        btn.onclick = () => handleAnswer(btn, i, q.correct);

        answersEl.appendChild(btn);
    });

    updateProgress();
}


// =======================
// ПРОГРЕСС
// =======================

function updateProgress(){
    const el = document.getElementById("progress");
    if (!el) return;

    el.innerText = (questionIndex + 1) + " / " + currentQuestions.length;
}


// =======================
// ОБРАБОТКА ОТВЕТА
// =======================

function handleAnswer(button, selectedIndex, correctIndex){

    const buttons = document.querySelectorAll("#answers button");

    buttons.forEach(btn => btn.disabled = true);

    if (selectedIndex === correctIndex){

        button.style.background = "green";

        streak++;
        coins += 5 + streak;

        updateUI();

        setTimeout(() => {
            questionIndex++;
            loadQuestion();
        }, 500);

    } else {

        button.style.background = "red";

        buttons[correctIndex].style.background = "green";

        streak = 0;

        loseLife();

        setTimeout(() => {
            ScreenManager.show("continueScreen");
        }, 700);
    }
}


// =======================
// CONTINUE
// =======================

function continueGame(){
    ScreenManager.show("gameScreen");
    loadQuestion();
}

function watchAdContinue(){
    rewardAd();
    continueGame();
}


// =======================
// ФИНИШ УРОВНЯ
// =======================

function finishLevel(){

    coins += 50;

    if (currentLevel >= unlockedLevel){
        unlockedLevel++;
    }

    updateUI();

    ScreenManager.show("winScreen");
}


// =======================
// GAME OVER
// =======================

function showGameOver(){
    ScreenManager.show("gameOverScreen");
}


// =======================
// ПОКУПКИ
// =======================

function buyLife(){

    if (coins < 50){
        notEnoughCoins();
        return;
    }

    coins -= 50;
    lives++;

    updateUI();
}

function buyCoinsPack(){

    // заглушка под реальные покупки
    coins += 200;

    updateUI();
}


// =======================
// ВОССТАНОВЛЕНИЕ ЖИЗНЕЙ
// =======================

setInterval(() => {

    if (lives < 5){
        lives++;
        updateUI();
    }

}, 300000); // 5 минут


// =======================
// INIT
// =======================

updateUI();

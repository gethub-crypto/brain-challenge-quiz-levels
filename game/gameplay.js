let currentLevel = 1;
let questionIndex = 0;
let mistakes = 0;
let currentQuestionData = null;

/* UI */
const livesUI = document.getElementById("lives");
const coinsUI = document.getElementById("coins");
const lifeTimerUI = document.getElementById("lifeTimer");

/* ========================= */
/* UI ОБНОВЛЕНИЕ */
/* ========================= */

function updateUI(){
    if(livesUI) livesUI.innerText = lives;
    if(coinsUI) coinsUI.innerText = coins;

    if(lifeTimerUI && typeof getTimeToNextLife === "function"){
        lifeTimerUI.innerText = getTimeToNextLife();
    }

    if(typeof saveGame === "function"){
        saveGame();
    }
}

/* ========================= */
/* ПОКУПКА ЖИЗНИ */
/* ========================= */

function buyLife(){

    if(coins < 150){
        PopupManager.show({
            title:"Ошибка",
            text:"Недостаточно монет",
            buttons:[{text:"OK"}]
        });
        return;
    }

    coins -= 150;
    lives++;

    updateUI();
}

/* кнопка + */
function buyLifePopup(){
    PopupManager.show({
        title:"Купить жизнь",
        text:"Стоимость: 150 монет",
        buttons:[
            {text:"Купить", action: buyLife},
            {text:"Отмена"}
        ]
    });
}

/* ========================= */
/* МАГАЗИН */
/* ========================= */

function openShop(){

    // если мы в игре — показываем popup
    if(ScreenManager.current === "game"){

        PopupManager.show({
            title:"Магазин",
            text:"Выберите покупку",
            buttons:[
                {text:"Удалить 2 ответа (120)", action: buyRemoveTwo},
                {text:"Пропустить вопрос (100)", action: buySkip},
                {text:"Показать ответ (200)", action: buyHint},
                {text:"Купить жизнь (150)", action: buyLife},
                {text:"Закрыть"}
            ]
        });

    } else {
        // обычный экран магазина
        ScreenManager.show("shop");
    }
}

/* ========================= */
/* НАВИГАЦИЯ */
/* ========================= */

function startGame(){
    ScreenManager.show("map");
}

function goToMap(){
    ScreenManager.show("map");

    if(typeof createLevels === "function"){
        createLevels();
    }
}

/* ========================= */
/* УРОВЕНЬ */
/* ========================= */

function startLevel(level){

    currentLevel = parseInt(level);
    questionIndex = 0;
    mistakes = 0;

    ScreenManager.show("game");
    loadQuestion();
}

/* ========================= */
/* ВОПРОС */
/* ========================= */

function loadQuestion(){

    let totalQuestions = (currentLevel % 10 === 0) ? 5 : 1;

    let progressContainer = document.getElementById("progressContainer");
    let progressBar = document.getElementById("progressBar");

    /* ПРОГРЕСС ТОЛЬКО ДЛЯ 5 ВОПРОСОВ */
    if(totalQuestions === 5){
        if(progressContainer) progressContainer.style.display = "block";

        let progress = (questionIndex / totalQuestions) * 100;
        if(progressBar) progressBar.style.width = progress + "%";

    } else {
        if(progressContainer) progressContainer.style.display = "none";
    }

    if(questionIndex >= totalQuestions){
        finishLevel();
        return;
    }

    let q = generateQuestion();
    currentQuestionData = q;

    document.getElementById("question").innerText = q.question;

    let answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    q.answers.forEach((a, i)=>{

        let btn = document.createElement("button");
        btn.className = "answer";
        btn.innerText = a;

        btn.onclick = ()=>checkAnswer(i, q.correct);

        answersDiv.appendChild(btn);
    });
}

/* ========================= */
/* ОТВЕТ */
/* ========================= */

function checkAnswer(selectedIndex, correctIndex){

    if(selectedIndex === correctIndex){

        questionIndex++;
        loadQuestion();

    } else {

        mistakes++;

        PopupManager.show({
            title:"Ошибка",
            text:"Неверный ответ",
            buttons:[
                {
                    text:"📺 Смотреть рекламу",
                    action: ()=>{
                        AdManager.showRewardedAd((success)=>{
                            if(success){
                                loadQuestion();
                            }
                        });
                    }
                },
                {
                    text:"Потерять жизнь",
                    action: loseLife
                }
            ]
        });
    }
}

/* ========================= */
/* ЖИЗНИ */
/* ========================= */

function loseLife(){

    lives--;
    updateUI();

    if(lives <= 0){

        PopupManager.show({
            title:"Game Over",
            text:"Жизни закончились",
            buttons:[
                {text:"Начать заново", action: ()=>location.reload()}
            ]
        });

        return;
    }
}

/* ========================= */
/* ЗАВЕРШЕНИЕ УРОВНЯ */
/* ========================= */

function finishLevel(){

    let baseReward = (currentLevel % 10 === 0) ? 120 : 20;

    let stars = 3;
    if(mistakes === 1) stars = 2;
    if(mistakes >= 2) stars = 1;

    // сохранение прогресса
    if(typeof playerProgress !== "undefined"){
        playerProgress[currentLevel] = { stars };
    }

    if(typeof saveGame === "function"){
        saveGame();
    }

    PopupManager.show({
        title:"Уровень пройден",
        text:`Награда: ${baseReward} монет\nЗвезды: ${"⭐".repeat(stars)}`,
        buttons:[
            {
                text:"📺 x2 награда",
                action: ()=>{
                    AdManager.showRewardedAd((success)=>{

                        if(success){
                            coins += baseReward * 2;
                        } else {
                            coins += baseReward;
                        }

                        updateUI();
                        ScreenManager.show("map");
                    });
                }
            },
            {
                text:"Забрать",
                action: ()=>{
                    coins += baseReward;
                    updateUI();
                    ScreenManager.show("map");
                }
            }
        ]
    });
}

/* ========================= */
/* INIT */
/* ========================= */

if(typeof loadGame === "function"){
    loadGame();
}

if(typeof createLevels === "function"){
    createLevels();
}

updateUI();

if(typeof PopupManager !== "undefined"){
    PopupManager.init();
}

ScreenManager.show("startScreen");

/* обновление таймера */
setInterval(updateUI, 1000);

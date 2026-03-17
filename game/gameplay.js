let currentLevel = 1;
let questionIndex = 0;
let currentQuestionData = null;

const livesUI = document.getElementById("lives");
const coinsUI = document.getElementById("coins");

function updateUI() {
    livesUI.innerText = lives;
    coinsUI.innerText = coins;
    saveGame();
}

/* START */
function startGame(){
    ScreenManager.show("map");
}

function goToMap(){
    ScreenManager.show("map");
}

/* SHOP */
function openShop(){
    ScreenManager.show("shop");
}

/* LEVEL */
function startLevel(level){

    currentLevel = parseInt(level);
    questionIndex = 0;

    document.getElementById("levelTitle").innerText = "Level " + level;

    ScreenManager.show("game");

    loadQuestion();
}

/* QUESTION */
function loadQuestion(){

    let totalQuestions = (currentLevel % 10 === 0) ? 5 : 1;

    if (questionIndex >= totalQuestions){
        finishLevel();
        return;
    }

    let q = generateQuestion();
    currentQuestionData = q;

    document.getElementById("question").innerText = q.question;

    let answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    q.answers.forEach((a, i) => {

        let btn = document.createElement("button");

        btn.className = "answer";
        btn.innerText = a;

        btn.onclick = () => checkAnswer(i, q.correct);

        answersDiv.appendChild(btn);
    });
}

/* ANSWER */
function checkAnswer(selectedIndex, correctIndex){

    if (selectedIndex === correctIndex){

        questionIndex++;
        loadQuestion();

    } else {

        ScreenManager.show("continueScreen");

    }
}

/* CONTINUE */
function watchAd(){
    ScreenManager.show("game");
    loadQuestion();
}

function loseLife(){

    lives--;

    updateUI();

    if (lives <= 0){
        alert("Game Over");
        location.reload();
    }

    ScreenManager.show("game");
}

/* SHOP LOGIC */
function buyRemoveTwo(){

    if (coins < 120){
        alert("Недостаточно монет");
        return;
    }

    coins -= 120;
    updateUI();

    removeTwoAnswers();
}

function buySkip(){

    if (coins < 100){
        alert("Недостаточно монет");
        return;
    }

    coins -= 100;
    updateUI();

    questionIndex++;
    loadQuestion();
}

function buyHint(){

    if (coins < 200){
        alert("Недостаточно монет");
        return;
    }

    coins -= 200;
    updateUI();

    alert("Ответ: " + currentQuestionData.answers[currentQuestionData.correct]);
}

function removeTwoAnswers(){

    let buttons = document.querySelectorAll(".answer");
    let removed = 0;

    buttons.forEach((btn, i) => {

        if (i !== currentQuestionData.correct && removed < 2){

            btn.style.display = "none";
            removed++;

        }

    });
}

/* FINISH */
function finishLevel(){

    reward = (currentLevel % 10 === 0) ? 120 : 20;

    document.getElementById("rewardCoins").innerText = reward;

    ScreenManager.show("reward");
}

function nextLevel(){

    coins += reward;

    updateUI();

    ScreenManager.show("map");
}

/* INIT */
loadGame();
createLevels();
updateUI();
ScreenManager.show("startScreen");
  

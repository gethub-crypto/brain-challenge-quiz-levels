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

/* START GAME */
function startGame(){

    ScreenManager.show("map");

}

/* MAP BUTTON */
function goToMap(){

    ScreenManager.show("map");

}

/* START LEVEL */
function startLevel(level){

    currentLevel = parseInt(level);
    questionIndex = 0;

    document.getElementById("levelTitle").innerText = "Level " + level;

    ScreenManager.show("game");

    loadQuestion();
}

/* LOAD QUESTION */
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

/* CHECK ANSWER */
function checkAnswer(selectedIndex, correctIndex){

    if (selectedIndex === correctIndex){

        questionIndex++;
        loadQuestion();

    } else {

        ScreenManager.show("continueScreen");

    }
}

/* CONTINUE OPTIONS */
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

/* FINISH LEVEL */
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

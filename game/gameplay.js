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

function startLevel(level) {

    currentLevel = parseInt(level);
    questionIndex = 0;

    document.getElementById("map").style.display = "none";
    document.getElementById("reward").style.display = "none";
    document.getElementById("game").style.display = "block";

    document.getElementById("levelTitle").innerText = "Level " + level;

    loadQuestion();
}

function loadQuestion() {

    let totalQuestions = (currentLevel % 10 === 0) ? 5 : 1;

    if (questionIndex >= totalQuestions) {

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

function checkAnswer(selectedIndex, correctIndex) {

    if (selectedIndex === correctIndex) {

        questionIndex++;

        loadQuestion();

    } else {

        lives--;

        updateUI();

        if (lives <= 0) {

            alert("Game Over");

            location.reload();

        }

    }

}

function finishLevel() {

    document.getElementById("game").style.display = "none";

    document.getElementById("reward").style.display = "block";

    reward = (currentLevel % 10 === 0) ? 120 : 20;

    document.getElementById("rewardCoins").innerText = reward;

}

function nextLevel() {

    coins += reward;

    updateUI();

    document.getElementById("reward").style.display = "none";

    document.getElementById("map").style.display = "flex";

}

loadGame();
createLevels();
updateUI();

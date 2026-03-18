let currentLevel = 1;
let questionIndex = 0;
let mistakes = 0;
let currentQuestionData = null;

const livesUI = document.getElementById("lives");
const coinsUI = document.getElementById("coins");
const lifeTimerUI = document.getElementById("lifeTimer");

function updateUI() {
    livesUI.innerText = lives;
    coinsUI.innerText = coins;
    lifeTimerUI.innerText = getTimeToNextLife();
    saveGame();
}

/* LIFE */
function buyLifePopup(){
    PopupManager.show({
        title:"Купить жизнь?",
        text:"150 монет",
        buttons:[
            {text:"Купить", action: buyLife},
            {text:"Отмена"}
        ]
    });
}

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

/* START */
function startGame(){
    ScreenManager.show("map");
}

function goToMap(){
    ScreenManager.show("map");
    createLevels();
}

function openShop(){
    ScreenManager.show("shop");
}

/* LEVEL */
function startLevel(level){

    currentLevel = parseInt(level);
    questionIndex = 0;
    mistakes = 0;

    ScreenManager.show("game");
    loadQuestion();
}

/* QUESTION */
function loadQuestion(){

    let totalQuestions = (currentLevel % 10 === 0) ? 5 : 1;

    let progressContainer = document.getElementById("progressContainer");

    if(totalQuestions > 1){
        progressContainer.style.display = "block";
        let progress = (questionIndex / totalQuestions) * 100;
        document.getElementById("progressBar").style.width = progress + "%";
    } else {
        progressContainer.style.display = "none";
    }

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

        mistakes++;

        PopupManager.show({
            title:"Ошибка",
            text:"Неверный ответ",
            buttons:[
                {text:"📺 Реклама", action: watchAd},
                {text:"Потерять жизнь", action: loseLife}
            ]
        });
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

/* FINISH */
function finishLevel(){

    let baseReward = (currentLevel % 10 === 0) ? 120 : 20;

    let stars = 3;
    if(mistakes === 1) stars = 2;
    if(mistakes >= 2) stars = 1;

    playerProgress[currentLevel] = { stars };

    saveGame();

    PopupManager.show({
        title:"Уровень пройден",
        text:`Награда: ${baseReward} монет\nЗвезды: ${"⭐".repeat(stars)}`,
        buttons:[
            {
                text:"📺 x2 награда",
                action: ()=>{
                    coins += baseReward * 2;
                    updateUI();
                    ScreenManager.show("map");
                }
            },
            {
                text:"Далее",
                action: ()=>{
                    coins += baseReward;
                    updateUI();
                    ScreenManager.show("map");
                }
            }
        ]
    });
}

/* INIT */
loadGame();
createLevels();
updateUI();
PopupManager.init();
ScreenManager.show("startScreen");

/* TIMER */
setInterval(updateUI,1000);

let currentLevel = 1;
let questionIndex = 0;
let mistakes = 0;

const livesUI = document.getElementById("lives");
const coinsUI = document.getElementById("coins");

/* UI */
function updateUI(){
    livesUI.innerText = lives;
    coinsUI.innerText = coins;
    saveGame();
}

/* BUY LIFE */
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

/* SHOP POPUP (на уровне) */
function openShop(){

    PopupManager.show({
        title:"Магазин",
        text:"Выберите покупку",
        buttons:[
            {text:"Удалить 2 ответа (120)", action: buyRemoveTwo},
            {text:"Пропустить (100)", action: buySkip},
            {text:"Подсказка (200)", action: buyHint},
            {text:"Купить жизнь (150)", action: buyLife},
            {text:"Закрыть"}
        ]
    });
}

/* START */
function startGame(){
    ScreenManager.show("map");
}

/* LEVEL */
function startLevel(level){

    currentLevel = level;
    questionIndex = 0;
    mistakes = 0;

    ScreenManager.show("game");
    loadQuestion();
}

/* QUESTION */
function loadQuestion(){

    let total = (currentLevel % 10 === 0) ? 5 : 1;

    let progressContainer = document.getElementById("progressContainer");

    if(total === 5){
        progressContainer.style.display = "block";
        document.getElementById("progressBar").style.width =
            (questionIndex / total * 100) + "%";
    } else {
        progressContainer.style.display = "none";
    }

    if(questionIndex >= total){
        finishLevel();
        return;
    }

    let q = generateQuestion();

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

/* ANSWER */
function checkAnswer(i, correct){

    if(i === correct){
        questionIndex++;
        loadQuestion();
    } else {

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

/* LIFE */
function loseLife(){
    lives--;
    updateUI();

    if(lives <= 0){
        PopupManager.show({
            title:"Game Over",
            text:"Жизни закончились",
            buttons:[{text:"OK"}]
        });
    }
}

/* FINISH */
function finishLevel(){

    let reward = (currentLevel % 10 === 0) ? 120 : 20;

    PopupManager.show({
        title:"Уровень пройден",
        text:`Награда: ${reward}`,
        buttons:[
            {
                text:"📺 x2 за рекламу",
                action: ()=>{
                    AdManager.showRewardedAd((success)=>{
                        if(success){
                            coins += reward * 2;
                        } else {
                            coins += reward;
                        }
                        updateUI();
                        ScreenManager.show("map");
                    });
                }
            },
            {
                text:"Забрать",
                action: ()=>{
                    coins += reward;
                    updateUI();
                    ScreenManager.show("map");
                }
            }
        ]
    });
}

/* INIT */
loadGame();
updateUI();

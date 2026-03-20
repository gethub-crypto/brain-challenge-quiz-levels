// ====== ЗАГРУЗКА СОХРАНЕНИЯ ======
loadGame();

// ====== ПЕРЕМЕННЫЕ ======
let questionIndex = 0;
let currentQuestionData = null;

// ====== СТАРТ ======
function startGame(){
    questionIndex = 0;
    loadQuestion();
    updateUI();
}

// ====== ЗАГРУЗКА ВОПРОСА ======
function loadQuestion(){

    const buttons = document.querySelectorAll(".answer-btn");

    // вернуть кнопки если были скрыты
    buttons.forEach(btn => {
        btn.style.display = "block";
    });

    currentQuestionData = questions[questionIndex];

    document.getElementById("question").innerText = currentQuestionData.question;

    buttons.forEach((btn, i) => {
        btn.innerText = currentQuestionData.answers[i];
        btn.onclick = () => checkAnswer(i);
    });
}

// ====== ПРОВЕРКА ОТВЕТА ======
function checkAnswer(index){

    if (index === currentQuestionData.correct){
        coins += 10; // награда
        showPopup("Правильно!");
    } else {
        showPopup("Неправильно");
    }

    updateUI();

    setTimeout(() => {
        nextQuestion();
    }, 800);
}

// ====== СЛЕДУЮЩИЙ ВОПРОС ======
function nextQuestion(){
    questionIndex++;

    if (questionIndex >= questions.length){
        endGame();
        return;
    }

    loadQuestion();
}

// ====== КОНЕЦ ИГРЫ ======
function endGame(){
    showPopup("Уровень пройден!");
    questionIndex = 0;
}

// ====== ОБНОВЛЕНИЕ UI ======
function updateUI(){

    const coinsEl = document.getElementById("coins");
    if (coinsEl){
        coinsEl.innerText = coins;
    }

    const r = document.getElementById("booster-removeTwo");
    const s = document.getElementById("booster-skip");
    const h = document.getElementById("booster-hint");

    if (r) r.innerText = boosters.removeTwo;
    if (s) s.innerText = boosters.skip;
    if (h) h.innerText = boosters.hint;

    saveGame();
}

// ====== ПОКУПКА БУСТЕРОВ ======
function buyBooster(type, price){

    if (coins < price){
        showPopup("Недостаточно монет");
        return;
    }

    coins -= price;
    boosters[type]++;

    updateUI();

    showPopup("Куплено!");
}

// ====== ИСПОЛЬЗОВАНИЕ ======

function useRemoveTwo(){

    if (boosters.removeTwo <= 0){
        showBuyPopup("removeTwo", 120);
        return;
    }

    boosters.removeTwo--;
    updateUI();

    removeTwoAnswers();
}

function useSkip(){

    if (boosters.skip <= 0){
        showBuyPopup("skip", 200);
        return;
    }

    boosters.skip--;
    updateUI();

    nextQuestion();
}

function useHint(){

    if (boosters.hint <= 0){
        showBuyPopup("hint", 100);
        return;
    }

    boosters.hint--;
    updateUI();

    showHint();
}

// ====== ЛОГИКА БУСТЕРОВ ======

function removeTwoAnswers(){

    const buttons = document.querySelectorAll(".answer-btn");
    let wrongIndexes = [];

    buttons.forEach((btn, i) => {
        if (i !== currentQuestionData.correct){
            wrongIndexes.push(i);
        }
    });

    wrongIndexes.sort(() => Math.random() - 0.5);

    for (let i = 0; i < 2; i++){
        buttons[wrongIndexes[i]].style.display = "none";
    }
}

function showHint(){
    showPopup("Подумай ещё 🤔");
}

// ====== POPUP ПОКУПКИ ======

function showBuyPopup(type, price){

    const popup = document.getElementById("buyPopup");

    popup.innerHTML = `
        <div class="popup-box">
            <p>Купить за ${price} монет?</p>
            <button onclick="confirmBuy('${type}', ${price})">Купить</button>
            <button onclick="closeBuyPopup()">Отмена</button>
        </div>
    `;

    popup.style.display = "flex";
}

function confirmBuy(type, price){
    closeBuyPopup();
    buyBooster(type, price);
}

function closeBuyPopup(){
    document.getElementById("buyPopup").style.display = "none";
                    }

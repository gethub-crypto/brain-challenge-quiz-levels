// ====== ПРОСТОЙ POPUP (замена alert) ======

function showPopup(text){

    let popup = document.getElementById("popup");

    // если нет — создаём
    if (!popup){
        popup = document.createElement("div");
        popup.id = "popup";
        document.body.appendChild(popup);
    }

    popup.innerText = text;
    popup.style.display = "block";

    // анимация появления
    popup.style.opacity = "1";

    setTimeout(() => {
        popup.style.opacity = "0";
    }, 1200);

    setTimeout(() => {
        popup.style.display = "none";
    }, 1500);
}


// ====== POPUP ПОКУПКИ ======

function showBuyPopup(type, price){

    let popup = document.getElementById("buyPopup");

    // если нет — создаём
    if (!popup){
        popup = document.createElement("div");
        popup.id = "buyPopup";
        document.body.appendChild(popup);
    }

    popup.innerHTML = `
        <div class="popup-overlay">
            <div class="popup-box">
                <p>Купить за ${price} монет?</p>
                <button onclick="confirmBuy('${type}', ${price})">Купить</button>
                <button onclick="closeBuyPopup()">Отмена</button>
            </div>
        </div>
    `;

    popup.style.display = "block";
}


// ====== ПОДТВЕРЖДЕНИЕ ======

function confirmBuy(type, price){
    closeBuyPopup();

    // вызываем из gameplay.js
    if (typeof buyBooster === "function"){
        buyBooster(type, price);
    }
}


// ====== ЗАКРЫТИЕ ======

function closeBuyPopup(){
    const popup = document.getElementById("buyPopup");

    if (popup){
        popup.style.display = "none";
    }
      }

let coins = 0;
let reward = 0;

function doubleReward() {

    reward *= 2;
    coins += reward;

    reward = 0;

    updateUI();
}

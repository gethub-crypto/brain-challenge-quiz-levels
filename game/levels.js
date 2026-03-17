function createLevels() {

    const map = document.getElementById("map");

    for (let i = 1; i <= 50; i++) {

        let btn = document.createElement("button");

        btn.className = "levelBtn";

        if (i % 10 === 0) btn.classList.add("super");

        btn.innerText = i;

        btn.onclick = () => startLevel(i);

        map.appendChild(btn);
    }
}

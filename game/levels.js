function createLevels() {

    const map = document.getElementById("map");
    map.innerHTML = "";

    for (let i = 1; i <= 50; i++) {

        let btn = document.createElement("button");
        btn.className = "levelBtn";

        if (i % 10 === 0) btn.classList.add("super");

        let stars = playerProgress[i]?.stars || 0;

        btn.innerHTML = `${i}<br>${"⭐".repeat(stars)}`;

        btn.onclick = () => startLevel(i);

        map.appendChild(btn);
    }
            }

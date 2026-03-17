const PopupManager = {

    init(){

        this.popup = document.getElementById("popup");
        this.title = document.getElementById("popupTitle");
        this.text = document.getElementById("popupText");
        this.buttons = document.getElementById("popupButtons");

    },

    show({title = "", text = "", buttons = []}){

        this.title.innerText = title;
        this.text.innerText = text;

        this.buttons.innerHTML = "";

        buttons.forEach(btn => {

            let button = document.createElement("button");
            button.innerText = btn.text;

            button.onclick = () => {

                if(btn.action) btn.action();
                this.hide();

            };

            this.buttons.appendChild(button);

        });

        this.popup.style.display = "flex";

    },

    hide(){
        this.popup.style.display = "none";
    }

};

const ScreenManager = {

    screens: [
        "startScreen",
        "map",
        "game",
        "reward",
        "continueScreen"
    ],

    show(screenId){

        this.screens.forEach(id => {

            const el = document.getElementById(id);

            if(el){
                el.style.display = (id === screenId) ? "block" : "none";
            }

        });

    }

}

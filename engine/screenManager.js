const ScreenManager = {

    screens: [
        "startScreen",
        "map",
        "game",
        "reward",
        "continueScreen",
        "shop"
    ],

    show(screenId){

        this.screens.forEach(id => {

            const el = document.getElementById(id);

            if(el){

                if(id === screenId){

                    el.style.display = "block";
                    el.style.opacity = 0;

                    setTimeout(()=>{
                        el.style.transition = "0.3s";
                        el.style.opacity = 1;
                    },10);

                }else{

                    el.style.display = "none";

                }

            }

        });

    }

                        }

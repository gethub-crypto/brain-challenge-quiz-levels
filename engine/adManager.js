const AdManager = {

    showRewardedAd(callback){

        console.log("Реклама показана (заглушка)");

        // имитация просмотра рекламы
        setTimeout(() => {

            let watched = true; // можно менять для теста

            if(watched){
                callback(true);
            } else {
                callback(false);
            }

        }, 1000);
    }

};

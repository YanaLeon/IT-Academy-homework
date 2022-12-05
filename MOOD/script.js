"use strict";

    function randomDiap(n,m) {
            return Math.floor(Math.random()*(m-n+1))+n;
    }

    function mood(colorsCount) {
        var colors = [ '', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый' ];
        let obj = {};
        console.log( 'цветов: ' + colorsCount );
        for ( var i = 1; i <= colorsCount; i++ ) {
            let check = true;
            while(check === true){
                var n = randomDiap(1,7);
                var colorName = colors[n];
                if(!(colorName in obj)){
                    obj[colorName] = 1;
                    check = false;
                }
            }
        }
        for (let key in obj){
            console.log(key);
        }
    }

    mood(3);

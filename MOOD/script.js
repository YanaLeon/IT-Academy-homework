"use strict";

    function randomDiap(n,m) {
            return Math.floor(Math.random()*(m-n+1))+n;
    }

    function mood(colorsCount) {
        var colors = [ '', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый' ];
        let obj = {};
        console.log( 'цветов: ' + colorsCount );
        for ( var i = 1; i <= colorsCount; i++ ) {
            var n = randomDiap;
            var colorName = colors[n(1,7)];
            if ( !(colorName in obj) ){
                obj[colorName] = true;
            } else {
                while((colorName in obj)){
                    colorName = colors[n(1,7)];
                    if (!(colorName in obj)){
                        obj[colorName] = true;
                        break;
                    }
                }
            }
        }
        for (let key in obj){
            console.log(key)
        }
    }

    mood(3);
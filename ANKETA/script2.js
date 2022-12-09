"use strict";

let phrase = prompt ("Напишите здесь свой текст")

function redactorForPhraseNew (str){
    let countLeft = 0;
    let countRight = 0;
    for (let i = 0; i < str.length; i++){
        if(str[i] === ' '){
            countLeft += 1;
        } else {
            break;
        }
    }
    if(countLeft === str.length){
        console.log('Здесь только пробелы');
        return str = '';
    }

    for (let i = str.length - 1; i >= 0; i--){
        if(str[i] === ' '){
            countRight += 1;
        } else {
            break;
        }
    }

    if(countRight === 0 && countLeft === 0){
        console.log(countRight, countLeft, 'нет пробелов');
        return str;
    } else {
        str = str.slice(countLeft, str.length - countRight);
        console.log(str.length);
        return str;
    }
}

let phraseResult = alert(`*${redactorForPhraseNew (phrase)}*`);
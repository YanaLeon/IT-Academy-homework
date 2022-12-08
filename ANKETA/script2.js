let phrase = prompt ("Напишите здесь свой текст")

function redactorForPhraseNew (str){
    let countRight = 0;
    let countLeft = 0;
    let result = true;
    for (let i = 0; i < str.length; i++){
        if(str[i] === ' '){
            countRight += 1;
        } else {
            result = false;
            break;
        }
    }
    if(result === true){
        console.log(result, 'Здесь только пробелы');
        return str = str.slice(countRight);
    }

    for (let i = str.length - 1; i >= 0; i--){
        if(str[i] === ' '){
            countLeft += 1;
        } else {
            break;
        }
    }

    if(countRight === 0 && countLeft === 0){
        console.log(countRight, countLeft, 'нет пробелов');
        return str;
    } else {
        str = str.slice(countRight, str.length - countLeft);
        console.log(str.length);
        return str;
    }
}

let phraseResult = alert(`*${redactorForPhraseNew (phrase)}*`);
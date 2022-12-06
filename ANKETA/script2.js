let phrase = prompt ("Напишите здесь свой текст")

function redactorForPhraseNew (str){
    let countRight = 0;
    let countLeft = 0;
    for (let i = 0; i < str.length; i++){
        if(str[i] === ' '){
            countRight += 1;
        } else {
            break;
        }
    }
    for (let i = str.length - 1; i >= 0; i--){
        if(str[i] === ' '){
            countLeft += 1;
        } else {
            break;
        }
    }
    str = str.slice(countRight, str.length - countLeft);
    console.log(str.length);
    return `*${str}*`;
}

let phraseResult = alert(redactorForPhraseNew (phrase));
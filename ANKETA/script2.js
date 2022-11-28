let phrase = prompt ("Напишите здесь свой текст")

function redactorForPhraseNew (phrase){
    let countRight = 0;
    let countLeft = 0;
    for (let i = 0; i < phrase.length; i++){
        if(phrase[i] === ' '){
            countRight += 1;
        } else {
            break;
        }
    }
    for (let i = phrase.length - 1; i >= 0; i--){
        if(phrase[i] === ' '){
            countLeft += 1;
        } else {
            break;
        }
    }
    phrase = phrase.slice(countRight, phrase.length - countLeft);
    console.log(phrase.length);
    return `*${phrase}*`;
}

let phraseResult = alert(redactorForPhraseNew (phrase));


function redactorForPhrase (phrase){
    let phraseNew = '';
    for (let i = 0; i < phrase.length; i++){
        if(phrase[i] === ' '){
            continue;
        } else {
            phraseNew += phrase[i];
        }
    }
    console.log(phraseNew.length);
    return alert (`*${phraseNew}*`);
}

// redactorForPhrase (phrase)
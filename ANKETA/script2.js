let phrase = prompt ("Напишите здесь свой текст")

function redactorForPhrase (phrase){
    for (let i = 0; i < phrase.length; i++){
        if (phrase[0] === ' '){
            let right = phrase.slice(1);
            phrase = `${phrase[0] = '*'}${right}`
        }
        if (phrase[phrase.length - 1] === ' '){
            let left = phrase.slice(0, -1);
            phrase = `${left}${phrase[phrase.length - 1] = '*'}`
        }
        console.log(phrase[i]);
    }
        return alert (phrase);
}

redactorForPhrase (phrase)
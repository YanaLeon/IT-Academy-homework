"use strict";

let phrase = prompt("Введите текст для проверки");
let cleanPhrase = phrase.toLowerCase().replace(/\s|[!,."'?]/g, '');

function isPalindrom (str){
    let result = true;
    if(str.length === 1){
        return result;
    }
    if(str[0] === str[str.length - 1]){
        str = str.slice(1, str.length - 1);
        result = isPalindrom(str);
    } else {
        return result = false;
    }
    return result;
}
console.log(isPalindrom (cleanPhrase))

let result = () => {
    if (isPalindrom (cleanPhrase)){
        return alert('Это палиндром!');
    } else {
        return alert('Увы, это не палиндром!');
    }
}
result()
"use strict";

let phrase = prompt("Введите текст для проверки");

function isPalindrom (str){
    let result = true;
    str = str.toLowerCase().replace(/\s|[!,."'?]/g, '');
    let length = Math.floor(str.length/2);
    for (let i = 0; i < length; i++){
        if(str[i] === str[str.length - i - 1]){
            continue;
        } else {
            return result = false;
        }
    }
    return result;
}
console.log(isPalindrom (phrase))

let result = () => {
    if (isPalindrom (phrase)){
        return alert('Это палиндром!');
    } else {
        return alert('Увы, это не палиндром!');
    }
}
result()


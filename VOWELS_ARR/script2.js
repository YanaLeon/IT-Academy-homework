"use strict";

let phrase = prompt("Введите текст для проверки").toLowerCase();

function isPalindrom (str){
    if(str.length === 0){
        return true;
    }
    if (str[0] === ' ' || str[0] === ',' || str[0] === '.' || str[0] === '!' || str[0] === '?' || str[0] === '"' || str[0] === '\'') {
        str = str.slice(1);
    }
    if (str[str.length - 1] === ' ' || str[str.length - 1] === ',' || str[str.length - 1] === '.' || str[str.length - 1] === '!' || str[str.length - 1] === '?' || str[str.length - 1] === '"' || str[str.length - 1] === '\'') {
        str = str.slice(0, str.length - 1)
    }
    if(str[0] === str[str.length - 1]){
        str = str.slice(1, str.length - 1);
        isPalindrom(str);
    } else {
        return false;
    }
    return true;
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
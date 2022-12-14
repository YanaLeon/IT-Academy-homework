"use strict";

let phrase = prompt("Введите текст для проверки");

function isPalindrom (str){
    str = str.toLowerCase().replace(/\s|[!,."'?]/g, '');
    let length = Math.floor(str.length/2);
    function clearStringisPalindrom (clearStr){
        if(clearStr.length <= length){
            return true;
        }
        if(clearStr[0] === clearStr[clearStr.length - 1]){
            console.log(clearStr);
            clearStr = clearStr.slice(1, clearStr.length - 1);
            return clearStringisPalindrom(clearStr);
        } else {
            return false;
        }
    }
    return clearStringisPalindrom(str);
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
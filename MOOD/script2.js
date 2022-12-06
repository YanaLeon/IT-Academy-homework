let phrase = prompt("Введите текст для проверки");

function isPalindrom (str){
    let result = true;
    str = str.toLowerCase().replace(/\s|[!,."'?]/g, '');
    let strCopy = str;
    for (let i = 0; i < str.length; i++){
        for (let j = strCopy.length - 1; j >= 0; j--){
            if(str[i] === strCopy[j]){
                strCopy = strCopy.slice(0, -1)
                break;
            } else {
                result = false;
            }
        }
    }
    return result;
}

console.log(isPalindrom (phrase))
let result = () => {
    if (isPalindrom (phrase)){
        return alert ('Это палиндром!');
    } else {
        return alert ('Увы, это не палиндром!');
    }
}
result()
//===========================================
let phrase2 = prompt("Введите текст для проверки");

function isPalindrom2 (str){
    let str2 = '';
    str = str.toLowerCase().replace(/\s|[!,."'?]/g, '');
    for(let i = str.length - 1; i >=0; i--){
        str2 += str[i];
    }
    return str === str2;
}

console.log(isPalindrom2 (phrase2))

let result2 = () => {
    if (isPalindrom2 (phrase2)){
        return alert('Это палиндром!');
    } else {
        return alert('Увы, это не палиндром!');
    }
}
result2()


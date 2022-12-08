let phrase = prompt("Введите текст для проверки");

function isPalindrom (str){
    let result = true;
    let length = Math.round(str.length/2);
    str = str.toLowerCase().replace(/\s|[!,."'?]/g, '');
    for (let i = 0; i < length; i++){
        if(str[i] === str[str.length - i - 1]){
               result;
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


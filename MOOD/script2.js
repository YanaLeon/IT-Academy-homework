let phrase = prompt("Введите текст для проверки");

function isPalindrom (str){
    let count = 0;
    str = str.toLowerCase().replace(/\s|[!,."'?]/g, '');
    for (let i = 0; i < str.length; i++){
        if(str[i] === str[str.length - i - 1]){
            count++;
            if(count >= 2){
               return true;
            }
        } else {
            return false;
        }
    }
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


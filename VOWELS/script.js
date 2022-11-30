let string = prompt('Введите ваш текст');

function countVowels (string){
    let array = string.toLowerCase().split('');
    let vowels = ['а', 'о', 'е', 'и', 'у', 'ю', 'я', 'ы', 'э', 'ё'];
    let count = 0;
    for(let i = 0; i < array.length; i++){
        if(vowels.indexOf(array[i])){
            count++;
        }
    }
    return count;
}


console.log(`В вашем тексте ${countVowels (string)} гласных`);
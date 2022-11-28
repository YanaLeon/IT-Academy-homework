let string = prompt('Введите ваш текст');

function countVowels (string){
    let array = string.toLowerCase().split('');
    let resultArray = [];
    array.filter((elem) => {
        if(elem === 'а' || elem === 'о' || elem === 'е'|| elem === 'и' || elem === 'у' || elem === 'ю' || elem === 'я' || elem === 'ы' || elem === 'э' || elem === 'ё'){
            resultArray.push(elem);
        }
    })
    return resultArray.length;
}


let result = alert (`В вашем тексте ${countVowels (string)} гласных`);
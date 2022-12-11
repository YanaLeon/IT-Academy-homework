let string = prompt('Введите ваш текст');

function countVowelsforEach (str){
    let array = str.toLowerCase().split('');
    let vowels = ['а', 'о', 'е', 'и', 'у', 'ю', 'я', 'ы', 'э', 'ё'];
    let count = 0;
    array.forEach(element => {
        if(vowels.includes(element)){
            count++;
        }
    });
    return count;
}

console.log(`В вашем тексте ${countVowelsforEach (string)} гласных`);

function countVowelsFilter (str){
    let array = str.toLowerCase().split('');
    let vowels = ['а', 'о', 'е', 'и', 'у', 'ю', 'я', 'ы', 'э', 'ё'];
    let resultArray = array.filter((value) => {
        if(vowels.indexOf(value) >= 0){
            return value;
        }
    })
    return resultArray.length;
}

console.log(`В вашем тексте ${countVowelsFilter (string)} гласных`);

function countVowelsReduce (str){
    let array = str.toLowerCase().split('');
    let vowels = ['а', 'о', 'е', 'и', 'у', 'ю', 'я', 'ы', 'э', 'ё'];
    let resultArray = array.reduce((acc, value) => {
        if(vowels.includes(value)){
            acc.push(value);
        }
        return acc;
    }, [])
    return resultArray.length;
}

console.log(`В вашем тексте ${countVowelsReduce (string)} гласных`);
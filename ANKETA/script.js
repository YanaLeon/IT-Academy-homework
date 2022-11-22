function checkName (){
    let name = prompt ('Введите ваше имя');
    while (name === null) {
        name = prompt ('Для того чтобы продолжить, укажите ваше имя');
    }
    let check = false;
    while(check === false){
        if (name.length <= 2){
            name = prompt ("Введите корректные данные, типа Ваше имя: Василий");
        } else if ((name.length >= 2)){
            for (let i = 0; i < name.length; i++){
                if (name[i] === '0' || name[i] === '1' || name[i] === '2' || name[i] === '3' || name[i] === '4' || name[i] === '5' || name[i] === '6' || name[i] === '7' || name[i] === '8' || name[i] === '9' || name[i] === '!' || name[i] === '?' || name[i] === ',' || name[i] === '.') {
                    name = prompt ("Имя не должно содержать чисел или других знаков");
                } else {
                    check = true;
                }
            }
        }
    }
    console.log (name);
    return name;
}


function checkPatronymic (){
    let patronymic = prompt ('Введите ваше отчество');
    let check = false;
    while (patronymic === null) {
        patronymic = prompt ('Для того чтобы продолжить, укажите ваше отчество');
    }
    while(check == false){
        if (patronymic.length <= 2){
            patronymic = prompt ("Введите корректные данные, типа Ваше отчество: Иванович");
        } else {
            for (let i = 0; i < patronymic.length; i++){
                if (patronymic[i] === '0' || patronymic[i] === '1' || patronymic[i] === '2' || patronymic[i] === '3' || patronymic[i] === '4' || patronymic[i] === '5' || patronymic[i] === '6' || patronymic[i] === '7' || patronymic[i] === '8' || patronymic[i] === '9' || patronymic[i] === '!' || patronymic[i] === '?' || patronymic[i] === ',' || patronymic[i] === '.') {
                    patronymic = prompt ("Отчество не должно содержать чисел или других знаков");
                } else {
                    check = true;
                }
            }
        }
    }
    console.log (patronymic);
    return patronymic;
}

function checkSurname (){
    let surname = prompt ('Введите вашу фамилию');
    let check = false;
    while (surname === null) {
        surname = prompt ('Для того чтобы продолжить, укажите вашу фамилию');
    }
    while(check == false){
        if (surname.length <= 2){
            surname = prompt ("Введите корректные данные, типа Ваша фамилия: Иванов");
        } else {
            for (let i = 0; i < surname.length; i++){
                if (surname[i] === '0' || surname[i] === '1' || surname[i] === '2' || surname[i] === '3' || surname[i] === '4' || surname[i] === '5' || surname[i] === '6' || surname[i] === '7' || surname[i] === '8' || surname[i] === '9' || surname[i] === '!' || surname[i] === '?' || surname[i] === ',' || surname[i] === '.') {
                    surname = prompt ("Фамилия не должна содержать чисел или других знаков");
                } else {
                    check = true;
                }
            }
        }
    }
    console.log (surname);
    return surname;
}

function checkAge (){
    let age = prompt ("Введите ваш возраст");
    let check = false;
    while (age === null) {
        age = prompt ('Для того чтобы продолжить, укажите ваш возраст');
    }
    while (check === false) {
        let ageNumber = Number(age);
        if (age.length < 1){
            age = prompt ("Для того чтобы продолжить, укажите ваш возраст");
        } else if (Number.isNaN(ageNumber) === true){
            age = prompt ("Введите ваш возраст, данные должны содержать только числа");
        } else {
            check = true;
        }
    }
    return age;
}
let gender;
function chooseGender (){
    gender = confirm('Выбирите ваш пол: Если "мужской" нажмите "ОК", если "женский" нажмите "ОТМЕНА"');
    if (gender){
        let resultGender = 'мужской';
        return resultGender;
    } else {
        let resultGender = 'женский';
        return resultGender;
    }
}

function showDate (){
    let resultName = checkName();
    let resultPatronymic = checkPatronymic();
    let resultSurname = checkSurname ();
    let resultAge = checkAge ();
    let ageNumber = parseInt(resultAge);
    let showGender = chooseGender();
    let retire;
    if ((gender === true && ageNumber <=60) || (gender === false && ageNumber <=50)){
        retire = 'нет';
    } else {
        retire = 'да';
    }
    alert (`ваше ФИО: ${resultSurname} ${resultName} ${resultPatronymic}
ваш возраст в годах: ${resultAge}
ваш возраст в днях: ${ageNumber*365}
через 5 лет вам будет: ${ageNumber+5}
ваш пол: ${showGender}
вы на пенсии: ${retire}`)
}

showDate ()
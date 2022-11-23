function checkName (){
    let name = prompt ('Введите ваше имя');
    let check = false;
    while(check === false){
        if (name === null) {
            name = prompt ('Для того чтобы продолжить, укажите ваше имя');
        } else if (name.length <= 2){
            name = prompt ("Введите корректные данные, типа Ваше имя: Василий");
        } else if ((name.length >= 2)){
            for (let i = 0; i < name.length; i++){
                if (name[i] >= '0' && name[i]  <= '9'){
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
    while(check == false){
        if (patronymic === null) {
            patronymic = prompt ('Для того чтобы продолжить, укажите ваше отчество');
        } else if (patronymic.length <= 2){
            patronymic = prompt ("Введите корректные данные, типа Ваше отчество: Иванович");
        } else {
            for (let i = 0; i < patronymic.length; i++){
                if (patronymic[i] >= '0' && patronymic[i]  <= '9') {
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
    while(check == false){
        if (surname === null) {
            surname = prompt ('Для того чтобы продолжить, укажите вашу фамилию');
        } else if (surname.length <= 2){
            surname = prompt ("Введите корректные данные, типа Ваша фамилия: Иванов");
        } else {
            for (let i = 0; i < surname.length; i++){
                if (surname[i] >= '0' && surname[i]  <= '9') {
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
    while (check === false) {
        let ageNumber = Number(age);
        if (age === null) {
            age = prompt ('Для того чтобы продолжить, укажите ваш возраст');
        } else if (age.length < 1){
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
class HashStorageClass {

    constructor (){
        this.storage = {};
    }

    addValue (key, value) {
        this.storage[key] = value;
    }
    getValue (key) {
        return this.storage[key];
    }
    deleteValue(key){
        if(key in this.storage){
            delete this.storage[key];
            return true;
        } else {
            return false;
        }
    }
    getKeys () {
        let array = [];
        for (let key in this.storage){
            array.push(key);
        }
        return array;
    }
}

let drinkStorage = new HashStorageClass ();
console.log(drinkStorage)

function addDrink (){
    let nameDrink = prompt ('Введите название напитка');
    while (true){
        if(nameDrink === null || nameDrink.length <= 1){
            nameDrink = prompt ('Необходимо указать название напитка');
        }  else {
            break;
        }
    }
    let alcohol = confirm ('Если ваш напиток алкогольный нажмите "ОК", если безалкогольный нажмите "Отмена"') ? 'да' : 'нет';
    let recipeDrink = prompt ('Введите рецепт напитка');
    while (true){
        if(recipeDrink === null || recipeDrink.length <= 5){
            recipeDrink = prompt ('Необходимо указать рецепт напитка');
        }  else {
            break;
        }
    }
    drinkStorage.addValue(nameDrink.toLowerCase().trim(), [alcohol, recipeDrink]);
    console.log(drinkStorage);
}

function getDrink (){
    let drink = prompt ('Чтобы получить информацию о напитке, введите его название').toLowerCase().trim();
    let infoDrink = drinkStorage.getValue(drink);
    console.log(infoDrink);
    if (infoDrink){
        alert (`напиток ${drink} \nалкогольный: ${infoDrink[0]} \nрецепт приготовления: ${infoDrink[1]}`
        )
    } else {
        alert ('Указанный вами напиток отсутствует')
    }
}

function deleteDrink (){
    let drink = prompt ('Чтобы удалить напиток, введите его название').toLowerCase().trim();
    if(drinkStorage.deleteValue(drink)){
        alert ('Напиток удалён');
        console.log(drinkStorage);
    } else {
        alert ('Указанный вами напиток отсутствует');
    }
}

function getAllNameDrinks () {
    let listDrinks = drinkStorage.getKeys();
    if (listDrinks.length >= 0){
        alert (`Напитки: ${listDrinks}`);
    } else {
        alert ('Пока здесь нет напитков');
    }
}
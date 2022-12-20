function HashStorageFunc () {
    this.storage = {};

    this.addValue = function (key, value){
        this.storage[key] = value;
    }
    this.getValue = function (key){
        return this.storage[key];
    }
    this.deleteValue = function (key){
        if(key in this.storage){
            delete this.storage[key];
            return true;
        } else {
            return false;
        }
    }
    this.getKeys = function (){
        let array = [];
        for (let key in this.storage){
            array.push(key);
        }
        return array;
    }
}
let obj = new HashStorageFunc();
console.log(obj);
console.log(obj.addValue('Маргарита', ['нет', 'простой']));
console.log(obj.addValue('Обычный', ['да', 'сложный']));
console.log(obj);
console.log(obj.getValue('Обычный'));
console.log(obj.deleteValue('Обычный'));
console.log(obj.deleteValue('sdrfg'));
console.log(obj.addValue('Обычный', ['да', 'сложный']));
console.log(obj.getKeys());
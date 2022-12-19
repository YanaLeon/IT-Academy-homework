function HashStorageFunc () {
    let storage = 'storage';
    this[storage] = {};

    this.addValue = function (key, [...value]){
        this[storage][key] = value;
        return this[storage];
    }
    this.getValue = function (key){
        return this[storage][key];
    }
    this.deleteValue = function (key){
        if(key in this[storage]){
            delete this[storage][key];
            return true;
        } else {
            return false;
        }
    }
    this.getKeys = function (){
        let array = [];
        for (let key in this[storage]){
            array.push(key);
        }
        return array;
    }
}
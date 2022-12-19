function HashStorageFunc (drink, alcohol, recipe) {
    let self = this;

    self[drink] = {'алкогольный': alcohol, 'рецепт' : recipe};

    self.addValue = function (drink, alcohol, recipe){
        self[drink] = {'алкогольный': alcohol, 'рецепт' : recipe};
    }
    self.getValue = function (drink){
        return self[drink];
    }
    self.deleteValue = function (drink){
        if(drink in self){
            delete self[drink];
            return true;
        } else {
            return false;
        }
    }
    self.getKeys = function (){
        let array = [];
        for (let key in self){
            if(typeof self[key] != 'function'){
                array.push(key);
            }
        }
        return array;
    }
}
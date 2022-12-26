function buildWrapper (teg){
    return function (text, obj) {
        let array = [];
        let result = '';
        for (let key in obj) {
            array.push(key + '=');
            let result = changeItem(Array.from(obj[key]));
            array.push("'" + result + "'");
        };
        text = changeItem(text.split(''));
        return result = `<${teg} ${array.join('')}>${text}</${teg}>`;
    }
}

function changeItem (array) {
    for (let i = 0; i < array.length; i++){
            if(array[i] === '<'){
                array[i] = '&lt;';
            } else if (array[i] === '>'){
                array[i] = '&gt;';
            } else if (array[i] === "'") {
                array[i] = '&apos;';
            } else if (array[i] === '"') {
                array[i] = '&quot;';
            } else if (array[i] === '&') {
                array[i] = '&amp;';
            }
        }
        return array.join('');
}

var wrapP = buildWrapper("P");

console.log(wrapP("СТИХИ",{align:"center",title:"M&M's"}));
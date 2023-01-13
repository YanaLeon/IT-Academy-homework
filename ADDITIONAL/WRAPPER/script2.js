function buildWrapper (teg){
    return function (text, obj) {
        let resultStyle ='';
        for (let key in obj) {
            let style = changeItem(obj[key]);
            resultStyle += ' ' + key + '=' + "'" + style + "'";
        }
        text = changeItem(text);
        let result = `<${teg}${resultStyle}>${text}</${teg}>`;
        return result;
    }
}

function changeItem (string) {
    string = string.split('');
    for (let i = 0; i < string.length; i++){
            if(string[i] === '<'){
                string[i] = '&lt;';
            } else if (string[i] === '>'){
                string[i] = '&gt;';
            } else if (string[i] === "'") {
                string[i] = '&apos;';
            } else if (string[i] === '"') {
                string[i] = '&quot;';
            } else if (string[i] === '&') {
                string[i] = '&amp;';
            }
        }
        return string.join('');
}

var wrapP=buildWrapper("P");   // строим функцию для оборачивания текста в тег P
console.log( wrapP("Однажды в студёную зимнюю пору") );
console.log( wrapP("Однажды в студёную зимнюю пору",{lang:"ru"}) );
console.log( wrapP("Однажды в <студёную> зимнюю пору") );
var wrapH1=buildWrapper("H1"); // строим функцию для оборачивания текста в тег H1
console.log( wrapH1("СТИХИ",{align:"center",title:"M&M's"}) );
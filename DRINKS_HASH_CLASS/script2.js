function buildWrapper (teg){
    return function (text, obj) {
        let style = '';
        let resultStyle = '';
        let result = '';
        for (let key in obj) {
            style = changeItem(obj[key]);
            resultStyle += ' ' + key + '=' + "'" + style + "'";
        }
        text = changeItem(text);
        result = `<${teg}${resultStyle}>${text}</${teg}>`;
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

var wrapP = buildWrapper("P");

console.log(wrapP("СТИХИ",{align:"center",title:"M&M's"}));
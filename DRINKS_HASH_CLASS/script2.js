function BuildWrapper (teg) {

    this.teg = teg;

    this.wrap=function(string, obj) {
        string = string.split('');
        let style = [];
        for (let i = 0; i < string.length; i++){
            if(string[i] === '<'){
                string.splice(i, 1, '&lt;');
            } else if (string[i] === '>'){
                string.splice(i, 1, '&gt;');
            } else if (string[i] === "'") {
                string.splice(i, 1, '&apos;');
            } else if (string[i] === '"') {
                string.splice(i, 1, '&quot;');
            } else if (string[i] === '&') {
                string.splice(i, 1, '&amp;');
            }
        }
        for (let key in obj) {
            let array = Array.from(obj[key]);
            for (let i = 0; i < array.length; i++) {
                if(array[i] === '<'){
                    array.splice(i, 1, '&lt;');
                } else if (array[i] === '>'){
                    array.splice(i, 1, '&gt;');
                } else if (array[i] === "'") {
                    array.splice(i, 1, '&apos;');
                } else if (array[i] === '"') {
                    array.splice(i, 1, '&quot;');
                } else if (array[i] === '&') {
                    array.splice(i, 1, '&amp;');
                }
            }
            style.push(key + '=' + "'" + array.join('') + "'");
        }
        return string = `<${this.teg} ${style}>${string.join('')}</${this.teg}>`;
 }
}

let wrapP = new BuildWrapper('P');
console.log(wrapP);
console.log(wrapP.wrap("СТИХИ",{align:"center",title:"M&M's"}));
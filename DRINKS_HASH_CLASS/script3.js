function deepCopy (h1) {
    let h2;
    if(h1 instanceof Array) {
        h2 = [];
    } else {
        h2 = {};
    }
    if(typeof h1 != 'object' || !h1){ // 0, NaN, null, undefined, '' - false
        return h1;
    }
    for (let key in h1){
        h2[key] = deepCopy(h1[key]);
    }
    return h2;
}

function test () {
    {
        let h1 = { a:5, b:{b1:6,b2:7}, c:[33,22], d:null, e:undefined, f:Number.NaN };
        let h2 = deepCopy (h1);
        let obj = {'прошёл' : 0, 'не прошёл' : 0}
        if ((h1 === h2) === false) {
           obj['прошёл']++;
        } else {
            obj['не прошёл']++;
        }
        if ((h1.a===h2.a) === true) {
            obj['прошёл']++;
        } else {
            obj['не прошёл']++;
        }
        if ((h1.b===h2.b) === false) {
            obj['прошёл']++;
        } else {
            obj['не прошёл']++;
        }
        if ((h1.b.b1===h2.b.b1) === true) {
            obj['прошёл']++;
        } else {
            obj['не прошёл']++;
        }
        if ((h1.c===h2.c) === false) {
            obj['прошёл']++;
        } else {
            obj['не прошёл']++;
        }
        if ((h1.c[0]===h2.c[0]) === true) {
            obj['прошёл']++;
        } else {
            obj['не прошёл']++;
        }
        if ((h1.d===h2.d) === true) {
            obj['прошёл']++;
        } else {
            obj['не прошёл']++;
        }
        if ((h1.e===h2.e) === true) {
            obj['прошёл']++;
        } else {
            obj['не прошёл']++;
        }
        if ((isNaN(h2.f)) === true) {
            obj['прошёл']++;
        } else {
            obj['не прошёл']++;
        }
        if (h2.c instanceof Array === true) {
            obj['прошёл']++;
        } else {
            obj['не прошёл']++;
        }
       console.log(`Тест 1: количесвто тестов прошёл ${obj['прошёл']}
        количесвто тестов не прошёл ${obj['не прошёл']} `)
    }
    {
        let a1=[ 5, {b1:6,b2:7}, [33,22], null, undefined, Number.NaN];
        let a2=deepCopy(a1);
        let obj = {'прошёл' : 0, 'не прошёл' : 0}
        if ((a1===a2) === false) {
           obj['прошёл']++;
        } else {
            obj['не прошёл']++;
        }
        if ((typeof(a2)===typeof(a1)) === true) {
            obj['прошёл']++;
        } else {
            obj['не прошёл']++;
        }
        if ((a1[0]===a2[0]) === true) {
            obj['прошёл']++;
        } else {
            obj['не прошёл']++;
        }
        if ((a1[1]===a2[1]) === false) {
            obj['прошёл']++;
        } else {
            obj['не прошёл']++;
        }
        if ((a1[1].b1===a2[1].b1) === true) {
            obj['прошёл']++;
        } else {
            obj['не прошёл']++;
        }
        if ((a1[2]===a2[2]) === false) {
            obj['прошёл']++;
        } else {
            obj['не прошёл']++;
        }
        if ((a1[2][0]===a2[2][0]) === true) {
            obj['прошёл']++;
        } else {
            obj['не прошёл']++;
        }
        if ((a1[3]===a2[3]) === true) {
            obj['прошёл']++;
        } else {
            obj['не прошёл']++;
        }
        if ((a1[4]===a2[4]) === true) {
            obj['прошёл']++;
        } else {
            obj['не прошёл']++;
        }
        if (isNaN(a2[5]) === true) {
            obj['прошёл']++;
        } else {
            obj['не прошёл']++;
        }
        if (a2[2] instanceof Array === true) {
            obj['прошёл']++;
        } else {
            obj['не прошёл']++;
        }
       console.log(`Тест 2: количесвто тестов прошёл ${obj['прошёл']}
        количесвто тестов не прошёл ${obj['не прошёл']} `)
    }
    {
        let v1="sss";
        let v2=deepCopy(v1);
        let obj = {'прошёл' : 0, 'не прошёл' : 0}
        if ((typeof(v2)===typeof(v1)) === true) {
           obj['прошёл']++;
        } else {
            obj['не прошёл']++;
        }
        if ((v1===v2) === true) {
            obj['прошёл']++;
        } else {
            obj['не прошёл']++;
        }
       console.log(`Тест 3: количесвто тестов прошёл ${obj['прошёл']}
        количесвто тестов не прошёл ${obj['не прошёл']} `)
    }
    {
        let z1=null;
        let z2=deepCopy(z1);
        let obj = {'прошёл' : 0, 'не прошёл' : 0}
        if ((typeof(z2)===typeof(z1)) === true) {
           obj['прошёл']++;
        } else {
            obj['не прошёл']++;
        }
        if ((z1===z2) === true) {
            obj['прошёл']++;
        } else {
            obj['не прошёл']++;
        }
       console.log(`Тест 4: количесвто тестов прошёл ${obj['прошёл']}
        количесвто тестов не прошёл ${obj['не прошёл']} `)
    }
    {
        let n1=Number.NaN;
        let n2=deepCopy(n1);
        let obj = {'прошёл' : 0, 'не прошёл' : 0}
        if ((typeof(n2)===typeof(n1)) === true) {
           obj['прошёл']++;
        } else {
            obj['не прошёл']++;
        }
        if ((isNaN(n2)) === true) {
            obj['прошёл']++;
        } else {
            obj['не прошёл']++;
        }
       console.log(`Тест 5: количесвто тестов прошёл ${obj['прошёл']}
        количесвто тестов не прошёл ${obj['не прошёл']} `)
    }
}

console.log(test ());
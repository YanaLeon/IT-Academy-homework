var H1={ a:5, b: { b1:6, b2:7 } };
var H2={ b: { b1:6, b2:7 }, a:5 };
var H3={ a:5, b: { b1:6 } };
var H4={ a:5, b: { b1:66, b2:7 } };
var H5={ a:5, b: { b1:6, b2:7, b3:8 } };
var H6={ a:null, b:undefined, c:Number.NaN };
var H7={ c:Number.NaN, b:undefined, a:null };
var H8={a:5,b:6};
var H9={c:5,d:6};
var H10={a:5};
var A1=[5,7];
var A2=[5,5,7];
var A3=[5,8,7];

function deepComp (a, b) {
  if (a === b || (Number.isNaN(a) && Number.isNaN(b))) {
    return true;
  }
  if ((a instanceof Object && b instanceof Array) || (a instanceof Array && b instanceof Object) || a === null || b === null || typeof a !== 'object' || typeof b !== 'object') {
    return false;
  }
  if(Array.isArray(a) && Array.isArray(b)){
    for(let i = 0; i < a.length; i++){
      if(b.indexOf(a[i]) > 0){
        let item = b.indexOf(a[i]);
        b.splice(item, 1);
      } else {
        return false;
      }
    }
  } else {
    let keysA = Object.keys(a);
    let keysB = Object.keys(b);
    if (keysA.length != keysB.length) {
      return false;
    } else {
      for (let i = 0; i < keysA.length; i++) {
        let item = keysA[i];
        if(!keysB.includes(item) || !deepComp(a[item], b[item])) {
          return false;
        }
      }
    }
  }
  return true;
}

function testDeepComp () {
  {
    if (deepComp(H1,H2) === true) {
      console.log('Тест 1 для сранения H1, H2 -> пройден');
    } else {
      console.log('Тест 1 для сранения H1, H2 -> не пройден');
    }
  }
  {
    if (deepComp(H1,H3) === false) {
      console.log('Тест 2 для сранения H1, H3 -> пройден');
    } else {
      console.log('Тест 2 для сранения H1, H2 -> не пройден');
    }
  }
  {
    if (deepComp(H1,H4) === false) {
      console.log('Тест 3 для сранения H1, H4 -> пройден');
    } else {
      console.log('Тест 3 для сранения H1, H4 -> не пройден');
    }
  }
  {
    if (deepComp(H1,H5) === false) {
      console.log('Тест 4 для сранения H1, H5 -> пройден');
    } else {
      console.log('Тест 4 для сранения H1, H5 -> не пройден');
    }
  }
  {
    if (deepComp(H6,H7) === true) {
      console.log('Тест 5 для сранения H6, H7 -> пройден');
    } else {
      console.log('Тест 5 для сранения H6, H7 -> не пройден');
    }
  }
  {
    if (deepComp(H8,H9) === false) {
      console.log('Тест 6 для сранения H8, H9 -> пройден');
    } else {
      console.log('Тест 6 для сранения H8, H9 -> не пройден');
    }
  }
  {
    if (deepComp(H8,H10) === false) {
      console.log('Тест 7 для сранения H8, H10 -> пройден');
    } else {
      console.log('Тест 7 для сранения H8, H10 -> не пройден');
    }
  }
  {
    if (deepComp(null,H10) === false) {
      console.log('Тест 8 для сранения null, H10 -> пройден');
    } else {
      console.log('Тест 8 для сранения null, H10 -> не пройден');
    }
  }
  {
    if (deepComp(H10,null) === false) {
      console.log('Тест 9 для сранения H10, null -> пройден');
    } else {
      console.log('Тест 9 для сранения H10, null -> не пройден');
    }
  }
  {
    if (deepComp(null,null) === true) {
      console.log('Тест 10 для сранения null, null -> пройден');
    } else {
      console.log('Тест 10 для сранения null, null -> не пройден');
    }
  }
  {
    if (deepComp(null,undefined) === false) {
      console.log('Тест 11 для сранения null,undefined -> пройден');
    } else {
      console.log('Тест 11 для сранения null,undefined -> не пройден');
    }
  }
  {
    if (deepComp(5,"5") === false) {
      console.log('Тест 12 для сранения 5,"5" -> пройден');
    } else {
      console.log('Тест 12 для сранения 5,"5" -> не пройден');
    }
  }
  {
    if (deepComp(5,H1) === false) {
      console.log('Тест 13 для сранения 5,H1 -> пройден');
    } else {
      console.log('Тест 13 для сранения 5,H1 -> не пройден');
    }
  }
  {
    if (deepComp(A1,H1) === false) {
      console.log('Тест 14 для сранения A1,H1 -> пройден');
    } else {
      console.log('Тест 14 для сранения A1,H1 -> не пройден');
    }
  }
  {
    if (deepComp(A2,A3) === false) {
      console.log('Тест 15 для сранения A2,A3 -> пройден');
    } else {
      console.log('Тест 15 для сранения A2,A3 -> не пройден');
    }
  }
  {
    if (deepComp( {a:5,b:undefined}, {a:5,c:undefined} ) === false) {
      console.log('Тест 16 для сранения {a:5,b:undefined}, {a:5,c:undefined} -> пройден');
    } else {
      console.log('Тест 16 для сранения {a:5,b:undefined}, {a:5,c:undefined} -> не пройден');
    }
  }
  {
    if (deepComp([5,7],{0:5,1:7}) === false) {
      console.log('Тест 17 для сранения [5,7],{0:5,1:7} -> пройден');
    } else {
      console.log('Тест 17 для сранения [5,7],{0:5,1:7} -> не пройден');
    }
  }
  {
    if (deepComp( [5,7],{0:5,1:7,length:2} ) === false) {
      console.log('Тест 18 для сранения [5,7],{0:5,1:7,length:2} -> пройден');
    } else {
      console.log('Тест 18 для сранения [5,7],{0:5,1:7,length:2} -> не пройден');
    }
  }
  {
    if (deepComp("aaa","bbb") === false) {
      console.log('Тест 19 для сранения "aaa","bbb" -> пройден');
    } else {
      console.log('Тест 19 для сранения "aaa","bbb" -> не пройден');
    }
  }
  {
    if (deepComp(Number.NaN,Number.NaN) === true) {
      console.log('Тест 20 для сранения Number.NaN,Number.NaN -> пройден');
    } else {
      console.log('Тест 20 для сранения Number.NaN,Number.NaN -> не пройден');
    }
  }
}
testDeepComp ()

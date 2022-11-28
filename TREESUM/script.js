let array = [ 5, 7,
    [ 4, [2], 8, [1,3], 2 ],
    [ 9, [] ],
    1, 8
    ];

function sumArray (array){
    let sum = 0;
    for (let i = 0; i < array.length; i++){
        if (Array.isArray(array[i])){
            sum += sumArray(array[i]);
        } else {
            sum += array[i];
        }
    }
    return sum;
}

console.log(sumArray (array));

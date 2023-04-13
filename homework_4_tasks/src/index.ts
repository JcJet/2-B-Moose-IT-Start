import {countScores} from "./task1";
import {stringToNumber} from "./task2";
import {loadData} from "./Storage";

//TODO: задать у всех функция возвращаемые значения

// Задача 1.
const studentArray: number[][] = [
    [1,0,1,1],
    [0,0,0,1],
    [1,1,1,1]
];

let results = countScores(studentArray);
console.log('Задача 1:');
console.log(results);

// Задача 2.

let str = '32bk56c890f';
let result = stringToNumber(str)
console.log('Задача 2:')
console.log(result)

// Задача 3.

let cart = loadData();
console.log('Задача 3:')
cart.printTotal();
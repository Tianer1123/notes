// 严格模式
"use strict";

// This is my first javascript code!
// javascript 写到最后的原因
// 1. js 代码太多，加载慢时显示白屏。
// 2. ...
// console.log('Hello JavaScript!');
// let name = 'Tianer';
// console.log(name);
let interestRate = 0.3;
// const interestRate = 0.3;
interestRate = 1;
console.log(interestRate);

// 对象
let person = {
    name: 'Tom',
    age: 30
};

person.name = 'LiLei';
console.log(person);
console.log('name: ' + person.name);
console.log('age: ' + person.age);

let selection = 'name';
person[selection] = 'Jim';
console.log(person.name);

let selectedColors = ['red', 'blue'];
console.log(selectedColors);
console.log(selectedColors[0]);
selectedColors[3] = 'green';
console.log(selectedColors); // ["red", "blue", empty, "green"]
console.log(selectedColors[2]); // undefined
console.log(selectedColors.length); // 4

function greet(name) {
    console.log('Hello ' + name);
}

function add(x, y) {
    return x + y;
}

greet('Mary');
console.log(add(10, 20)); // 30

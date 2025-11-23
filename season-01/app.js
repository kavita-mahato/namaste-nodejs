// Modules protect their variables and functions from leaking
const {calcSum, calcMultiply} = require('./calculate');
require('./xyz'); 
const data = require('./data.json');

console.log(JSON.stringify(data));

var a = 12;
var b = 2;

calcSum(a, b);
calcMultiply(a, b);

// console.log(global);
// console.log(this);
// console.log(globalThis === global); 
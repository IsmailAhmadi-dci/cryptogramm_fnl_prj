const retext = 'a.e';
const text = 'acE';

const al = 'abcdefghijklmnopqrstuvwxyz';

const re = new RegExp(retext, 'ig');

const arr = [];

for (let i = 0; i < 26 ; i++) arr.push('.');

const newStr = arr.join('');


console.log(newStr);
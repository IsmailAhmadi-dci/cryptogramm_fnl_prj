const retext = 'a.e';
const text = 'acE';

const re = new RegExp(retext, 'ig');

console.log(re.test(text));
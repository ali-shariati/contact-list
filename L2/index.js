import readline from 'readline/promises';
import {stdin as input, stdout as output  } from 'process'

const rl = readline.createInterface({input, output});

console.log('Calculator');

const input1 = await rl.question('Input number #1: ');
const input2 = await rl.question('Input number #2: ');
const result = Number(input1)+Number(input2);

console.log(input1,'+' , input2, '=', result);

rl.close();
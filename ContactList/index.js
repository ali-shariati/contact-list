import readline from 'readline/promises';
import {stdin as input, stdout as output  } from 'process'

const rl = readline.createInterface({input, output});

console.log('<-- Contact List -->');

const contactList = [];
const firstName = await rl.question('First name: ');
const lastName = await rl.question('Last name: ');

const newContact = {
    id: contactList.length,
    firstName : firstName,
    lastName : lastName,
}
contactList.push(newContact)

const formatedList = contactList
    .map(({ id, firstName, lastName }) => `#${id} ${firstName}  ${lastName}`)
    .join('\n');

console.log('Contact List :')
console.log(formatedList)

rl.close();
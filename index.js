import readline from 'readline/promises';
import {stdin as input, stdout as output  } from 'process'
import fs from 'fs/promises';
import * as cowsay from 'cowsay';

const CONTACT_LIST_FILE_PATH ='./data/contact-list.json';
const rl = readline.createInterface({input, output});

console.log(
    cowsay.say({text:'<-- Contact List -->'})
);

const contactList = [];

async function loadContactList() {
    try {
        const contactListJson = await fs.readFile(CONTACT_LIST_FILE_PATH, 'utf8');
        contactList.push(
            ...JSON.parse(contactListJson)
        )
    }catch(err) {
        throw err;
    }
}

async function saveContactList() {
    try {
        const contactListJson = JSON.stringify(contactList);
        await fs.writeFile(CONTACT_LIST_FILE_PATH, contactListJson);

    }catch(err) {
        throw err;
    }
}

async function deleteContactList() {
    if (contactList.length < 1) {
        console.error('There is no contact in this list!');
        return;
    }
    showContactList();
    const contactID = await rl.question('Contact ID: ');
    const contactIndex = contactList.findIndex(({id}) => id === Number(contactID));
    if (contactIndex < 0) {
        console.error('Invalid ID');
        return;
    }
    contactList.splice(contactIndex, 1);
    saveContactList();
}

async function addNewContact() {
    const firstName = await rl.question('First name: ');
    const lastName = await rl.question('Last name: ');
    const lastContact = contactList[contactList.length - 1];
    const id = lastContact ? lastContact.id + 1 : 0;

    const newContact = {
        id,
        firstName ,
        lastName,
    }
    contactList.push(newContact)
    saveContactList();
}

function showContactList(){
    const formatedList = contactList
        .map(({ id, firstName, lastName }) => `#${id} ${firstName}  ${lastName}`)
        .join('\n');
    console.log('Contact List :')
    console.log(formatedList)
}

function quit(){
    rl.close();
}


async function help() {
    console.log('-------------------------')
    console.log('n: Add new contact\nd: Delete contact\ns: Show contacts\nq: Quit');
    console.log('-------------------------')
    const action = await rl.question('Enter your input : ');
    if (action === 'n') {
        await addNewContact();
    } else if (action === 's') {
        showContactList();
    } else if (action === 'd') {
        await deleteContactList();
    } else if (action === 'q') {
        quit()
        return
    } else {
        quit()
        return
    }
    await help();
}

async function main() {
    await loadContactList();
    await help();
}
await main();
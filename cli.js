import readline from 'readline/promises';
import {stdin as input, stdout as output  } from 'process'
import fs from 'fs/promises';
import {loadContactList, CONTACT_LIST_FILE_PATH, formatContactList} from "./services.js";


const rl = readline.createInterface({input, output});

console.log('<-- Contact List -->');

const contactList = [];



async function saveContactList() {
    try {
        const contactListJson = JSON.stringify(contactList);
        await fs.writeFile(CONTACT_LIST_FILE_PATH, contactListJson);

    }catch(err) {
        throw err;
    }
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
    await saveContactList();
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
    await saveContactList();
}

async function updateContactList() {
    if (contactList.length < 1) {
        console.error('There is no contact in this list!');
    }
    const rowId = await rl.question('Contact ID: ');
    const selectedId = Number(rowId);
    const idx = contactList.findIndex(contactId => contactId.id === selectedId);

    if (idx < 0){
        console.error('Invalid ID');
    }

    const currentContact = contactList[idx];
    const newFirstName = await rl.question(`First Name [${currentContact.firstName}]: `);
    const newLastName = await rl.question(`Last Name [${currentContact.lastName}]: `);

    contactList[idx] ={
        ...currentContact,
        firstName: newFirstName,
        lastName: newLastName,
    }
    await saveContactList();
    console.log('Contact updated.');
}

export function showContactList(){
    const formatedList = formatContactList(contactList);
    console.log('Contact List :')
    console.log(formatedList)
}

function quit(){
    rl.close();
}


async function help() {
    console.log('-------------------------')
    console.log('n: Add new contact\nd: Delete contact\ns: Show contacts\nu: Update contact\nq: Quit');
    console.log('-------------------------')
    const action = await rl.question('Enter your input : ');
    if (action === 'n') {
        await addNewContact();
    } else if (action === 's') {
        showContactList();
    } else if (action === 'd') {
        await deleteContactList();
    } else if (action === 'u') {
        await updateContactList();
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
    const loadContacts = await loadContactList();
    contactList.push(...loadContacts);
    await help();
}
await main();
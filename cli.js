import readline from 'readline/promises';
import {stdin as input, stdout as output  } from 'process'
import { formatContactList } from "./services.js";
import {Contact, sequelize} from "./models/index.js";

const rl = readline.createInterface({input, output});

async function createNewContact() {
    const firstName = await rl.question('First name: ');
    const lastName = await rl.question('Last name: ');
    const mobileNumber = await rl.question('Mobile number: ');
    const isFavorite = await rl.question('Is favorite(Default: no): ');

    await Contact.create  ({
        firstName ,
        lastName,
        mobileNumber ,
        isFavorite: ['yes', 'Yes', 'Yes'].includes(isFavorite) ,
    });
}

async function deleteContactList() {
    await showContactList();
    const id =  await rl.question('Delete ID: ');
    await Contact.destroy({
        where: { id }
    });
}

async function showContactList(){
    const contacts = await Contact.findAll();
    const formatedList = formatContactList(contacts);
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
        await createNewContact();
    } else if (action === 's') {
        await showContactList();
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
    console.log('<-- Contact List -->');
    try {
        await sequelize.sync({ force: false });
        console.log('[All models were synchronized successfully.]');
        await help();
    } catch(err){
        console.log('Error in syncing models: ', err);
    }
}
await main();
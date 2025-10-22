import fs from "fs/promises";

export const CONTACT_LIST_FILE_PATH ='./data/contact-list.json';
export async function loadContactList() {
    try {
        const contactListJson = await fs.readFile(CONTACT_LIST_FILE_PATH, 'utf8');
       return JSON.parse(contactListJson)
    }catch(err) {
        throw err;
    }
}
export function formatContactList(contactList) {
   return contactList
        .map(({ id, firstName, lastName }) => `#${id} ${firstName}  ${lastName}`)
        .join('\n');
}
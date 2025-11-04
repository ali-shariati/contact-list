export function formatContactList(contactList) {
   return contactList
        .map(({ id, firstName, lastName, isFavorite, mobileNumber }) =>(
            `${id} (${isFavorite ? '*': '#'}) ${firstName}  ${lastName} (${mobileNumber || 'None'})`
        ))
        .join('\n');
}
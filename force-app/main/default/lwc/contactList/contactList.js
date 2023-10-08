import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';

export default class ContactList extends LightningElement {

    @wire(getContactList) contacts;
    selectedContact;

    selectionHandler(event) {
        let selectedContactId = event.detail;

        this.selectedContact = this.contacts.data.find(
            (currItem) => currItem.Id === selectedContactId)
    }
}
import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';
// Import message service features required for publishing and the message channel
import { publish, MessageContext } from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/sendContact__c';


export default class ContactList extends LightningElement {

    @wire(getContactList) contacts;
    selectedContact;

    @wire(MessageContext)
    messageContext;

    selectionHandler(event) {
        let selectedContactId = event.detail;

        this.selectedContact = this.contacts.data.find(
            (currItem) => currItem.Id === selectedContactId);

        const payload = { lmsData: this.selectedContact };

        publish(this.messageContext, recordSelected, payload);

    }


}
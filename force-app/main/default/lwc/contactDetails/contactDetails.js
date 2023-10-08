import { LightningElement, api } from 'lwc';

export default class ContactDetails extends LightningElement {

    @api contact;

    clickHandler(event) {

        //prevent the anchor element from navigation.
        event.preventDefault();

        //Create Custom Event
        const selectionEvent = new CustomEvent("selection", {
            detail: this.contact.Id
        });

        //Dispatch Event
        this.dispatchEvent(selectionEvent);
    }

}
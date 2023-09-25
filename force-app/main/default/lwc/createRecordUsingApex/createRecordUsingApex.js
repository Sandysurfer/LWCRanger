import { LightningElement } from 'lwc';
import createContactRecords from '@salesforce/apex'
export default class CreateRecordUsingApex extends LightningElement {


    contactFirstName;
    contactLastName;
    contactPhone;
    contactEmail;

    handleFirstNameChange(event) {
        this.contactFirstName = event.target.value;
    }
    handleLastNameChange(event) {
        this.contactLastName = event.target.value;
    }
    handlePhoneChange(event) {
        this.contactName = event.target.value;
    }

    handleEmailChange(event) {
        this.contactName = event.target.value;
    }

    handleClick() {
       
    }
}

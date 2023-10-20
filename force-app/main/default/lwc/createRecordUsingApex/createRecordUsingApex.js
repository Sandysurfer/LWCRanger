import { LightningElement } from 'lwc';
import createContactRecords from '@salesforce/apex/ContactController.createContactRecords';
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
        createContactRecords({ firstname: this.contactFirstName, lastname: this.contactLastName, email: this.contactEmail, phone: this.contactEmail })
            .then(result => {
                console.log('ContactRecords', JSON.stringify(result));
            })
            .catch(error => {
                console.log('Error', JSON.stringify(error));
            })
    }
}
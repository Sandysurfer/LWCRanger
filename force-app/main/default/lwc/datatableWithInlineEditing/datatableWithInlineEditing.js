import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/DatatableController.getContacts';
import updateContactDetails from '@salesforce/apex/DatatableController.updateContactDetails';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { refreshApex } from "@salesforce/apex";


const columns = [
    { label: 'Name', fieldName: 'Name', editable: 'true' },
    { label: 'Phone', fieldName: 'Phone', type: 'Phone', editable: 'true' },
    { label: 'Email', fieldName: 'Email', type: 'email', editable: 'true' }

];
export default class DatatableJune25th extends LightningElement {
    columns = columns;
    contactsData = [];
    draftValues = [];  //Contains Updated Value when User Edit a cell.

    @wire(getContacts)
    contactMethod({ error, data }) {
        if (data) {
            this.contactsData = data;
            console.log('data', JSON.stringify(this.contactsData));
        }
        if (error) {
            console.log('error', JSON.stringify(error));
        }
    }

    handleSave(event) {
        const updatedfield = event.detail.draftValues;
        console.log('updateFields-->', JSON.stringify(updatedfield));


        //Update Datatable Field Value in updateField variable by using imperative method..
        updateContactDetails({ contactData: updatedfield })
            .then(result => {
                console.log('Result-->' + JSON.stringify(result));

                this.dispatchEvent(
                    new ShowToastEvent({
                        title: "Success",
                        message: "Contacts updated",
                        variant: "success"
                    })
                );
            })
            .catch(error => {
                console.log('Error-->' + JSON.stringify(error));
            })
    }
}
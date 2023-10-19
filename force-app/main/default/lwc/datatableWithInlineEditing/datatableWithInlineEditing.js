import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/DatatableController.getContacts';
import updateContactDetails from '@salesforce/apex/DatatableController.updateContactDetails';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { refreshApex } from '@salesforce/apex';


const columns = [
    { label: 'FirstName', fieldName: 'FirstName', type: 'text', editable: 'true' },
    { label: 'LastName', fieldName: 'LastName', type: 'text', editable: 'true' },
    { label: 'Phone', fieldName: 'Phone', type: 'Phone', editable: 'true' },
    { label: 'Email', fieldName: 'Email', type: 'email', editable: 'true' }

];
export default class DatatableWithInlineEditing extends LightningElement {
    columns = columns;
    contacts;
    error;
    draftValues = [];  //Contains Updated Value when User Edit a cell.
    wiredContactResult;

    @wire(getContacts)
    contactMethod(result) {
        this.wiredContactResult = result;
        if (result.data) {
            this.contacts = result.data;
            this.error = undefined;
            console.log('data', JSON.stringify(this.contacts));
        }
        else if (result.error) {
            this.data = undefined;
            this.error = result.error;
            console.log('Error', JSON.stringify(this.error));
        }
    }

    handleSave(event) {
        const updatedfield = event.detail.draftValues;
        console.log('updateFields-->', JSON.stringify(updatedfield));


        //Update Datatable Field Value in updateField variable by using imperative method..
        updateContactDetails({ contactData: updatedfield })
            .then(result => {
                console.log('Result-->' + JSON.stringify(result));
                refreshApex(this.wiredContactResult);

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
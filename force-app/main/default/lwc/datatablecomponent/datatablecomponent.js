import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/DatatableController.getContacts';
const columns = [
    { label: 'First Name', fieldName: 'FirstName', type: 'text' },
    { label: 'Last Name', fieldName: 'LastName', type: 'text' },
    { label: 'Phone', fieldName: 'Phone', type: 'Phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' }

];
export default class DatatableComponent extends LightningElement {
    columns = columns;
    data;
    error;
    @wire(getContacts)
    contactMethod(result) {
        if (result) {
            this.result = result.data;
            this.error = undefined;
        }
        if (error) {
            this.data = undefined;
            this.error = result.error;
        }
    }
}
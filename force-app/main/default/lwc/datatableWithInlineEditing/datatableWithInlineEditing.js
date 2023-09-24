import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/DatatableController.getContacts';
const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Id', fieldName: 'Id' },
    { label: 'Phone', fieldName: 'Phone', type: 'Phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' }

];
export default class DatatableJune25th extends LightningElement {
    columns = columns;
    contactList;
    @wire(getContacts)
    contactMethod({ error, data }) {
        alert('here');
        alert(data);
        if (data) {
            this.contactList = data;
        }
        if (error) {
            this.contactList = error;
        }
    }
}
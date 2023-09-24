import { LightningElement, api } from 'lwc';
import getRelatedContacts from '@salesforce/apex/LightningDataTableController.getRelatedContacts';

const COLS = [
    { label: "Name", fieldName: "Name" },
    { label: "Phone", fieldName: "Phone" },
    { label: "Email", fieldName: "Email" }
];

export default class DatatableWithRowSelection extends LightningElement {

    buttonLabel = "Show Contacts";
    @api recordId;
    contactData;
    columns = COLS;
    isDataVisible = false;
    searchKey = '';

    connectedCallback() {
        getRelatedContacts({ accountRecordId: this.recordId, searchValue: this.searchKey })
            .then(result => {
                this.contactData = result;
                console.log('Contacts Data-->', JSON.stringify(this.contactData));
            })
            .catch(error => {
                console.log('Error', JSON.stringify(error));
            })
    }

    handleClick(event) {
        const label = event.target.label;
        console.log('Label', JSON.stringify(label));

        if (label == "Show Contacts") {
            this.buttonLabel = 'Hide Contacts';
            this.isDataVisible = true;
        } else {
            this.buttonLabel = 'Show Contacts';
            this.isDataVisible = false;
        }
    }

    handleChange(event) {
        this.searchKey = event.target.value;
        console.log('SearchValue-->', JSON.stringify(this.searchKey));

        getRelatedContacts({ accountRecordId: this.recordId, searchValue: this.searchKey })
            .then(result => {
                this.contactData = result;
                console.log('Contacts Data-->', JSON.stringify(this.contactData));
            })
            .catch(error => {
                console.log('Error', JSON.stringify(error));
            })
    }

    handleSelectedRow(event) {
        let selectedRows = event.detail.selectedRows;
        console.log(selectedRows);
    }
}
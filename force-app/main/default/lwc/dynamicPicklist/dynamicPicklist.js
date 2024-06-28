import { LightningElement, wire } from 'lwc';
import getStatusPicklistValues from '@salesforce/apex/CaseController.getStatusPicklistValues';
import { createRecord } from 'lightning/uiRecordApi';
import CASE_OBJECT from '@salesforce/schema/Case';
export default class DynamicPicklist extends LightningElement {

    description = '';
    status = '';
    statusOptions = [];

    @wire(getStatusPicklistValues)
    wiredStatusOptions({ error, data }) {
        if (data) {
            this.statusOptions = data.map(option => ({
                label: option,
                value: option
            }));
        } else if (error) {
            // Handle error
        }
    }

    handleDescriptionChange(event) {
        this.description = event.target.value;
    }

    handleStatusChange(event) {
        this.status = event.detail.value;
    }

    handleSave() {
        const fields = {
            'Description': this.description,
            'Status': this.status
        };

        const recordInput = { apiName: CASE_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(() => {
                // Record created successfully
                this.resetForm();
                // Dispatch custom event to notify parent or other components
                this.dispatchEvent(new CustomEvent('recordcreated'));
            })
            .catch(error => {
                // Handle error
            });
    }

    resetForm() {
        this.description = '';
        this.status = '';
    }
}
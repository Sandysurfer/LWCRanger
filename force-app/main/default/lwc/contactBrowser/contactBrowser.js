import { LightningElement, wire } from 'lwc';
import getContactListByFilter from '@salesforce/apex/ContactBrowserController.getContactListByFilter';
export default class ContactBrowser extends LightningElement {

    selectedAccountId = '';
    selectedIndustry = '';

    @wire(getContactListByFilter, {
        accountId: '$selectedAccountId',
        industry: '$selectedIndustry'
    })
    contactsFunction({ data, error }) {
        if (data) {
            console.log('selected contacts', data);
        }
        else if (error) {
            console.log('selected contacts failed', error);
        }
    }

    handleFilterChange(event) {
        this.selectedAccountId = event.detail.accountId
        this.selectedIndustry = event.detail.industry
    }
}
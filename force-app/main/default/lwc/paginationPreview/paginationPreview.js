import { LightningElement, wire } from "lwc";
import getContactList from "@salesforce/apex/LightningDataTableController.getContactList";
import getAccountList from "@salesforce/apex/LightningDataTableController.getAccountList";
export default class PaginationWithDatatable extends LightningElement {
    totalContacts;
    visibleContacts;

    totalAccounts;
    visibleAccounts;

    @wire(getContactList)
    wiredContacts({ data, error }) {
        if (data) {
            this.totalContacts = data;
            console.log(this.totalContacts);
        }
        if (error) {
            this.totalContacts = error;
        }
    }

    @wire(getAccountList)
    wiredAccounts({ data, error }) {
        if (data) {
            this.totalAccounts = data;
            console.log(this.totalAccounts);
        }
        if (error) {
            this.totalAccounts = error;
        }
    }

    updateContactHandler(event) {
        this.visibleContacts = [...event.detail.records];
        console.log(event.detail.records);
    }

    updateAccountHandler(event) {
        this.visibleAccounts = [...event.detail.records];
        console.log(event.detail.records);
    }
}

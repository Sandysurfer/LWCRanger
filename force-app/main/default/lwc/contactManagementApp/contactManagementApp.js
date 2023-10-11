import { LightningElement, wire, track } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import deleteContact from '@salesforce/apex/ContactController.deleteContact';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { refreshApex } from '@salesforce/apex';

export default class ContactManagementApp extends LightningElement {

    @track IdtoEditRecord;
    contacts;
    error;
    isModalOpen = false;
    wiredContactResult;
    columns = [
        { label: 'First Name', fieldName: 'FirstName' },
        { label: 'Last Name', fieldName: 'LastName' },
        { label: 'Phone', fieldName: 'Phone' },
        {
            label: 'Account Name', fieldName: 'Accounturl', type: 'url',
            typeAttributes: {
                label: { fieldName: 'AccountName' },
                target: '_blank'
            }
        },
        { label: 'Email', fieldName: 'Email', type: 'email' },
        {
            type: 'action',
            typeAttributes: { rowActions: this.getRowAction },
        },
    ]


    @wire(getContacts)
    getwiredContacts(result) {
        this.wiredContactResult = result;
        const { data, error } = result;
        if (data) {
            console.log('Data', data);
            this.contacts = data.map(contact => {
                let flatContact = { ...contact };  //Use spread operator to make shallow copy of array..
                flatContact.AccountName = contact.Account.Name;
                flatContact.Accounturl = `/lightning/r/Account/${contact.AccountId}/view`;
                console.log('flatContact...', flatContact);
                return flatContact;
            })
            this.error = undefined;
        }
        else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }

    getRowAction(row, doneCallback) {
        const actions = [
            { label: 'Edit', name: 'edit' },
            { label: 'Delete', name: 'delete' }
        ];
        doneCallback(actions);

    }

    handleRowAction(event) {
        const action = event.detail.action;
        const rowId = event.detail.row.Id;

        switch (action.name) {
            case "edit":
                this.isModalOpen = true;
                this.IdtoEditRecord = rowId;
                break;
            case 'delete':
                this.deleteRecord(rowId);
                break;
            default:
                break;
        }
    }

    deleteRecord(contactId) {
        deleteContact({ contactId: contactId })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: "success",
                        message: "Contact deleted Successfully.",
                        variant: "success"
                    })
                );
                this.refreshData();
            })
            .catch((error) => {
                console.log("Error", error);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: "Error Deleting the Record",
                        message: error.body.message,
                        variant: "error"
                    })
                );
            });
    }

    closeModal() {
        this.isModalOpen = false;
    }

    successHandler(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: "success",
                message: "Contact updated Successfully.",
                variant: "success"
            })
        );
        this.isModalOpen = false;
        this.refreshData();
    }

    refreshData(event) {
        return this.wiredContactResult ? refreshApex(this.wiredContactResult) : undefined;
    }

}
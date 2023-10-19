import { LightningElement, track } from 'lwc';
import getAccounts from '@salesforce/apex/CallApexController.getAccounts';
import getContacts from "@salesforce/apex/CallApexController.getContacts";

const COLS = [
    { label: "Name", fieldName: "Name" },
    { label: "Phone", fieldName: "Phone" },
    { label: "Email", fieldName: "Email" }
];

export default class ComboboxDemo extends LightningElement {

    value = '';
    accOptions = [];

    get options() {
        return this.accOptions;

    }
    connectedCallback() {
        getAccounts()
            .then(result => {
                let arr = [];
                for (let i = 0; i < result.length; i++) {
                    arr.push({ label: result[i].Name, value: result[i].Id })
                }
            })
        this.accOptions = arr;

    }

    handleChange(event) {
        this.value = event.detail.value;
    }

    //2nd Use CASE FOR COMBOBOX WITH DATATABLE....

    @track cardVisible = false;
    @track data = []; //Used for Storing contacts details in datatable..
    @track columns = COLS;


    handleSearchChange(event) {
        //When Account is selected then below card will display related contacts in datatable..
        this.cardVisible = true;

        this.value = event.detail.value;
        //window.alert(JSON.stringify(this.value));

        //Call Apex Method to get Contacts of Selected Account..
        getContacts({ selectedAccountId: this.value }) //Pass Selected Account recordId to apex to get related contacts
            .then((result) => {
                this.data = result;
            })
            .catch((error) => {
                console.log(error);
            });
    }

}
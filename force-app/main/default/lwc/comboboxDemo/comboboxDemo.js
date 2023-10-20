import { LightningElement } from 'lwc';
import getAccounts from '@salesforce/apex/CallApexController.getAccounts';

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
}
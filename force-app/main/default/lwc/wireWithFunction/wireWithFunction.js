/* eslint-disable no-prototype-builtins */
import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/LightningDataTableController.getAccounts';
export default class Demowire extends LightningElement {

    @track columns = [
        { label: 'Account Name', fieldName: 'Name' },
        { label: 'Account Phone', fieldName: 'Phone' },
        { label: 'Account Industry', fieldName: 'Industry' },
        { label: 'Account Rating', fieldName: 'Rating' },
    ];

    @track accountlist;
    @track error;

    @wire(getAccounts)
    wiredaccount({ error, data }) {
        if (data) {
            console.log(data);

            //To Update Rating if Rating is Blank Using map, spreadOperator...
            let updatedAccounts = data.map((currItem) => {
                let updatedObject = {};

                if (!currItem.hasOwnProperty("Rating", "Industry")) {
                    updatedObject = { ...currItem, Rating: "Warm", Industry: "Electronics" };
                }
                else {
                    updatedObject = { ...currItem };
                }
                return updatedObject;
            });
            console.log('UpdateAccouts', updatedAccounts);
            this.accountlist = updatedAccounts;


        } else if (error) {
            console.log(error);
            this.error = error;
        }
    }
}
import { LightningElement, api, wire } from 'lwc';
import ACCOUNT_RATING from '@salesforce/schema/Account.Rating';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
export default class DisplayFlowConditionally extends LightningElement {
    @api recordId;
    accountRating;

    @wire(getRecord, {
        recordId: "$recordId",
        fields: [ACCOUNT_RATING]
    })
    getRecordOutput({ data, error }) {
        if (data) {
            this.accountRating = getFieldValue(data, ACCOUNT_RATING);
        }
        else if (error) {
            console.log('Error', error);
        }
    }

    get isAccountRatingHot() {
        return this.accountRating === "Hot" ? true : false;
    }
    get isAccountRatingCold() {
        return this.accountRating === "Cold" ? true : false;
    }
    get isAccountRatingWarm() {
        return this.accountRating === "Warm" ? true : false;
    }

    get inputVariables() {
        return [{ name: "inputRating", type: "String", value: this.accountRating }]
    }
}
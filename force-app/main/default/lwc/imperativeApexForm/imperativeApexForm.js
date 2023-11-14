import { LightningElement, wire, api } from 'lwc';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_TICKER from '@salesforce/schema/Account.TickerSymbol';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
import updateTickerRecord from '@salesforce/apex/CallApexController.updateTickerRecord';
import { notifyRecordUpdateAvailable } from 'lightning/uiRecordApi';

export default class ImperativeApexForm extends LightningElement {
    @api recordId;
    accname = "";
    accticker = "";

    @wire(getRecord, {
        recordId: "$recordId",
        fields: [ACCOUNT_NAME, ACCOUNT_TICKER]
    })
    outputFunction({ data, error }) {
        if (data) {
            console.log("Get Record Account", data);
            this.accname = getFieldValue(data, ACCOUNT_NAME)
            this.accticker = getFieldValue(data, ACCOUNT_TICKER)
        }
        else if (error) {
            console.log("Get Record Error", error);
        }
    }

    handleChange(event) {
        this.accticker = event.target.value;
    }
    updateTicker() {
        updateTickerRecord({
            recordId: this.recordId,
            newTicker: this.accticker
        })
            .then((result) => {
                console.log("Record Update Successfully", result);
                //Used to Update lds
                notifyRecordUpdateAvailable([{ recordId: this.recordId }]);

            })
            .catch((error) => {
                console.log("Record Update Failed", error);
            })
    }
}
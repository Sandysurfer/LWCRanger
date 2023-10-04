import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';


export default class LdsCreateRecord extends LightningElement {
    accountId;
    name = '';
    phone = '';
    industry = '';

    handleNameChange(event) {
        this.name = event.target.value;
    }
    handlePhoneChange(event) {
        this.phone = event.target.value;
    }
    handleIndustryChange(event) {
        this.industry = event.target.value;
    }

    handleCreateAccount() {

        const fields = {};
        //getting field values by importing field from @salesforce/schema/Account.fieldName.. 
        fields[NAME_FIELD.fieldApiName] = this.name;
        fields[PHONE_FIELD.fieldApiName] = this.phone;
        fields[INDUSTRY_FIELD.fieldApiName] = this.industry;

        const recordData = { apiName: ACCOUNT_OBJECT.objectApiName, fields };

        //Creating Account Record using lightning/ui/RecordApi....
        createRecord(recordData)
            .then((result) => {
                console.log('Created Account Record', JSON.stringify(result));
                //alert("Account is Created Successfully with AccountId: " + result.id);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: "Success",
                        message: "Account created",
                        variant: "success",
                        mode: 'dismissable'
                    })
                );
            })
            .catch((error) => {
                // alert("Account Creation Failed: " + error.body.message);
                this.accountRecords = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: "Error creating record",
                        message: error.body.message,
                        variant: "error"
                    })
                );
            });
    }
}
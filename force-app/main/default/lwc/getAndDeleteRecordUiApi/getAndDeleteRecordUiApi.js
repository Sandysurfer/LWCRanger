import { LightningElement, api, wire } from 'lwc';
import { getRecord, deleteRecord } from 'lightning/uiRecordApi';
import ACCOUNT_NAME_FIELD from "@salesforce/schema/Account.Name";
import ACCOUNT_PHONE_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_INDUSTRY_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_OWNER_FIELD from '@salesforce/schema/Account.Owner.Name';

const FIELDS = [ACCOUNT_NAME_FIELD, ACCOUNT_PHONE_FIELD, ACCOUNT_INDUSTRY_FIELD, ACCOUNT_OWNER_FIELD]

export default class GetAndDeleteRecordUiApi extends LightningElement {

    accountName;
    accountPhone;
    accountIndustry;
    accountId;
    accountDetail;

    @wire(getRecord, { recordId: "Provide Account Id", fields: FIELDS })
    wiredAccount({ data, error }) {
        if (data) {
            this.accountDetail = data;
            console.log('Account Detail-->' + JSON.stringify(this.accountDetail));
            //Display Value on Component...
            this.accountId = this.accountDetail.id;
            this.accountName = this.accountDetail.field.Name.value;
            this.accountPhone = this.accountDetail.field.Phone.value;
            this.accountIndustry = this.accountDetail.field.Industry.value;
            this.accountOwner = this.accountDetail.field.Owner.displayValue;

        }
        else if (error) {
            console.log('Error-->' + JSON.stringify(error));
        }

    }

    handleDeleteAccount() {
        deleteRecord(this.accountId)
            .then(result => {
                window.alert("Record Deleted");
            }).catch(error => {
                console.log('Error', JSON.stringify(error));
            })
    }


}
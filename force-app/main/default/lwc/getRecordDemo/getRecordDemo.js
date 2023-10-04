import { LightningElement, wire, api } from 'lwc';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ANNUAL_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import { getRecord, getFieldValue, getFieldDisplayValue } from 'lightning/uiRecordApi';

export default class GetRecordDemo extends LightningElement {

@api recordId;
accName;
accRevenue;

@wire(getRecord, {
    recordId: '$recordId',
    fields: [ACCOUNT_NAME_FIELD, ANNUAL_REVENUE_FIELD]
})
wiredAccounts({ data, error }) {
    if (data) {
        console.log('Data from Account Records', data);
        //Display Field Value on Component...
        //this.accName = data.fields.Name.value;  //accessing data through dot notation 
        this.accName = getFieldValue(data, ACCOUNT_NAME_FIELD)   //using getfieldValue from ui/RecordApi..
        this.accRevenue = getFieldDisplayValue(data, ANNUAL_REVENUE_FIELD)  //using getFieldDisplayValue from ui/RecordApi
        // this.accRevenue = data.fields.AnnualRevenue.value;
    }
    else if (error) {
        console.log('Error', error);
    }
}

}

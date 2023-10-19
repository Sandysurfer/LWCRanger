import { LightningElement, wire, track } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';
import ACCOUNT_TYPE from '@salesforce/schema/Account.Type';

export default class GetPicklistValueDemo extends LightningElement {

    @track industryvalues;
    @track typevalues;


    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    accountobjectInfo;

    //importing get picklist values from lightning/uiObjectInfoApi.....
    @wire(getPicklistValues, { recordTypeId: '$accountobjectInfo.data.defaultRecordTypeId', fieldApiName: ACCOUNT_TYPE })
    typePicklistValues;

    @wire(getPicklistValues, { recordTypeId: '$accountobjectInfo.data.defaultRecordTypeId', fieldApiName: ACCOUNT_INDUSTRY })
    industryPicklistValues;

    handleIndustryChange(event) {
        this.industryvalues = event.detail.value;
    }

    handleTypeChange(event) {
        this.typevalues = event.detail.value;
    }
}
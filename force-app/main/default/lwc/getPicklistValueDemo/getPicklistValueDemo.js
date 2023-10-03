import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class GetPicklistValueDemo extends LightningElement {

    @wire(getObjectInfo, {
        objectApiName: ACCOUNT_OBJECT
    })
    accountprop;

    @wire(getPicklistValues, {
        recordTypeId: '$accountprop.data.defaultRecordTypeId',
        fieldApiName: ACCOUNT_INDUSTRY
    }) outputfunction({ data, error }) {
        if (data) {
            console.log('Picklist Data', data);
        }
        else if (error) {
            console.log('Picklist Error', error);
        }
    }
}
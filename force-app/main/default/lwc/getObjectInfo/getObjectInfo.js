import { LightningElement, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class GetObjectInfo extends LightningElement {

    accountinfo;
    accounterror;

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    getObjectsfunction({ data, error }) {
        if (data) {
            this.accountinfo = data;
            this.accounterror = null;
        }
        else if (error) {
            this.accounterror = error;
            this.accountinfo = null
        }
    }
}
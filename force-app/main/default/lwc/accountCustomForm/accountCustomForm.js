import { LightningElement, wire } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';
import ACCOUNT_OBJECT from '@salesforce/schema/Account'
import ACCOUNT_PARENT from '@salesforce/schema/Account.ParentId';
import ACCOUNT_SLA_TYPE from '@salesforce/schema/Account.SLA__c';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_SLA_EXPIRY_DT from '@salesforce/schema/Account.SLAExpirationDate__c';
import ACCOUNT_NO_OF_LOCATION from '@salesforce/schema/Account.NumberofLocations__c';
import ACCOUNT_DESCRIPTION from '@salesforce/schema/Account.Description';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import { createRecord } from 'lightning/uiRecordApi';

export default class AccountCustomForm extends LightningElement {

    parentoptions = [];
    selParentAcc = '';
    selAccName = '';
    selExpDate = '';
    selSlaType = '';
    selDescription = '';
    selNoofLocations = '1';

    @wire(getAccountList)
    wiredAccounts({ data, error }) {
        this.parentoptions = [];
        if (data) {
            this.parentoptions = data.map((currItem) => ({
                label: currItem.Name,
                value: currItem.Id
            }))
        }
        else if (error) {
            console.log('Error While Getting Parent Records')
        }
    }

    @wire(getObjectInfo, {
        objectApiName: ACCOUNT_OBJECT
    })
    accountObjectInfo;

    @wire(getPicklistValues, {
        recordTypeId: '$accountObjectInfo.data.defaultRecordTypeId',
        fieldApiName: ACCOUNT_SLA_TYPE
    })
    slaPicklist;

    handleChange(event) {
        let { name, value } = event.target;
        if (name === 'parentacc') {
            this.selParentAcc = value;
        }
        if (name === 'accname') {
            this.selAccName = value;
        }
        if (name === 'slaexpdt') {
            this.selExpDate = value;
        }
        if (name === 'slatype') {
            this.selSlaType = value;
        }
        if (name === 'description') {
            this.selDescription = value;
        }
        if (name === 'nooflocations') {
            this.selNoofLocations = value;
        }

    }

    saveRecord() {
        console.log('Account object', ACCOUNT_OBJECT);
        if (this.validateInput()) {

            const inputfields = {};
            inputfields[ACCOUNT_NAME.fieldApiName] = this.selAccName;
            inputfields[ACCOUNT_PARENT.fieldApiName] = this.selParentAcc;
            inputfields[ACCOUNT_SLA_TYPE.fieldApiName] = this.selSlaType;
            inputfields[ACCOUNT_SLA_EXPIRY_DT.fieldApiName] = this.selExpDate;
            inputfields[ACCOUNT_NO_OF_LOCATION.fieldApiName] = this.selNoofLocations;
            inputfields[ACCOUNT_DESCRIPTION.fieldApiName] = this.selDescription;

            const recordInput = {
                apiName: ACCOUNT_OBJECT.objectApiName,
                fields: inputfields
            };

            createRecord(recordInput)
                .then(result => {
                    console.log('Account Created Successfully', result)
                })
                .catch(error => {
                    console.log('Error While Creating Records', error);
                })
        }
        else {
            console.log('Inputs are not Valid');
        }
    }

    validateInput() {
        let fieldsVal = Array.from(this.template.querySelectorAll('.validateme'));
        let isValid = fieldsVal.every((currItem) => currItem.checkValidity());
        return isValid;
    }

}
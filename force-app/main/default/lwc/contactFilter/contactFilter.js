import { LightningElement, wire } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import { NavigationMixin } from 'lightning/navigation';
import { encodeDefaultFieldValues } from "lightning/pageReferenceUtils";
export default class ContactFilter extends NavigationMixin(LightningElement) {

    selectedAccountId = '';
    selectedIndustry = '';
    isbuttonDisabled = true;

    @wire(getObjectInfo, {
        objectApiName: ACCOUNT_OBJECT
    })
    accountinfo;

    @wire(getPicklistValues, {
        recordTypeId: "$accountinfo.data.defaultRecordTypeId",
        fieldApiName: ACCOUNT_INDUSTRY
    })
    industryPicklist;

    handleSelectedRecord(event) {
        this.selectedAccountId = event.detail;
        console.log('SelectedAccountId', this.selectedAccountId);
        if (this.selectedAccountId) {
            this.isbuttonDisabled = false;
        }
        else {
            this.isbuttonDisabled = true;
        }
        this.notifyFilterChange();
    }

    handleChange(event) {
        this.selectedIndustry = event.target.value;
        this.notifyFilterChange();
    }

    addNewContact() {
        let defaultValue = encodeDefaultFieldValues({
            AccountId: this.selectedAccountId
        });
        let pageRef = {
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'new'
            },
            state: {
                defaultFieldValues: defaultValue
            }
        };
        this[NavigationMixin.Navigate](pageRef)
    }

    notifyFilterChange() {
        let myCustomEvent = new CustomEvent('filterchange', {
            detail: {
                accountId: this.selectedAccountId,
                industry: this.selectedIndustry
            }
        });
        this.dispatchEvent(myCustomEvent);
    }
}
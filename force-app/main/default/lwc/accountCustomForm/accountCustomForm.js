/* eslint-disable no-else-return */
import { LightningElement, wire, api } from "lwc";
import getAccountList from "@salesforce/apex/AccountController.getAccountList";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import ACCOUNT_PARENT from "@salesforce/schema/Account.ParentId";
import ACCOUNT_ID from "@salesforce/schema/Account.Id";
import ACCOUNT_SLA_TYPE from "@salesforce/schema/Account.SLA__c";
import ACCOUNT_NAME from "@salesforce/schema/Account.Name";
import ACCOUNT_SLA_EXPIRY_DT from "@salesforce/schema/Account.SLAExpirationDate__c";
import ACCOUNT_NO_OF_LOCATION from "@salesforce/schema/Account.NumberofLocations__c";
import ACCOUNT_DESCRIPTION from "@salesforce/schema/Account.Description";
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import {
    createRecord,
    getRecord,
    getFieldValue,
    updateRecord,
    deleteRecord
} from "lightning/uiRecordApi";
import { NavigationMixin } from "lightning/navigation";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

const fieldsToLoad = [
    ACCOUNT_PARENT,
    ACCOUNT_SLA_TYPE,
    ACCOUNT_NAME,
    ACCOUNT_SLA_EXPIRY_DT,
    ACCOUNT_NO_OF_LOCATION,
    ACCOUNT_DESCRIPTION
];
export default class AccountCustomForm extends NavigationMixin(
    LightningElement
) {
    parentoptions = [];
    selParentAcc = "";
    selAccName = "";
    selExpDate = null;
    selSlaType = "";
    selDescription = "";
    selNoofLocations = "1";
    @api recordId;

    @wire(getRecord, {
        recordId: "$recordId",
        fields: fieldsToLoad
    })
    wiredgetRecords({ data, error }) {
        if (data) {
            this.selParentAcc = getFieldValue(data, ACCOUNT_PARENT);
            this.selAccName = getFieldValue(data, ACCOUNT_NAME);
            this.selExpDate = getFieldValue(data, ACCOUNT_SLA_EXPIRY_DT);
            this.selSlaType = getFieldValue(data, ACCOUNT_SLA_TYPE);
            this.selNoofLocations = getFieldValue(data, ACCOUNT_NO_OF_LOCATION);
            this.selDescription = getFieldValue(data, ACCOUNT_DESCRIPTION);
        } else if (error) {
            console.log("Error Message", error);
        }
    }

    @wire(getAccountList)
    wiredAccounts({ data, error }) {
        this.parentoptions = [];
        if (data) {
            this.parentoptions = data.map((currItem) => ({
                label: currItem.Name,
                value: currItem.Id
            }));
        } else if (error) {
            console.log("Error While Getting Parent Records");
        }
    }

    @wire(getObjectInfo, {
        objectApiName: ACCOUNT_OBJECT
    })
    accountObjectInfo;

    @wire(getPicklistValues, {
        recordTypeId: "$accountObjectInfo.data.defaultRecordTypeId",
        fieldApiName: ACCOUNT_SLA_TYPE
    })
    slaPicklist;

    handleChange(event) {
        let { name, value } = event.target;
        if (name === "parentacc") {
            this.selParentAcc = value;
        }
        if (name === "accname") {
            this.selAccName = value;
        }
        if (name === "slaexpdt") {
            this.selExpDate = value;
        }
        if (name === "slatype") {
            this.selSlaType = value;
        }
        if (name === "description") {
            this.selDescription = value;
        }
        if (name === "nooflocations") {
            this.selNoofLocations = value;
        }
    }

    saveRecord() {
        console.log("Account object", ACCOUNT_OBJECT);
        if (this.validateInput()) {
            const inputfields = {};
            inputfields[ACCOUNT_NAME.fieldApiName] = this.selAccName;
            inputfields[ACCOUNT_PARENT.fieldApiName] = this.selParentAcc;
            inputfields[ACCOUNT_SLA_TYPE.fieldApiName] = this.selSlaType;
            inputfields[ACCOUNT_SLA_EXPIRY_DT.fieldApiName] = this.selExpDate;
            inputfields[ACCOUNT_NO_OF_LOCATION.fieldApiName] = this.selNoofLocations;
            inputfields[ACCOUNT_DESCRIPTION.fieldApiName] = this.selDescription;

            if (this.recordId) {
                //update Operation
                inputfields[ACCOUNT_ID.fieldApiName] = this.recordId;
                let recordInput = {
                    fields: inputfields
                };
                updateRecord(recordInput)
                    .then((result) => {
                        console.log("Record Update Successfully", result);
                        this.showToast();
                    })
                    .catch((error) => {
                        console.log("Record Update Failed", error);
                    });
            }
            else {
                //create Operation
                const recordInput = {
                    apiName: ACCOUNT_OBJECT.objectApiName,
                    fields: inputfields
                };
                createRecord(recordInput)
                    .then((result) => {
                        console.log("Account Created Successfully", result);
                        let pageRef = {
                            type: "standard__recordPage",
                            attributes: {
                                recordId: result.id,
                                objectApiName: ACCOUNT_OBJECT.objectApiName,
                                actionName: "view"
                            }
                        };
                        this[NavigationMixin.Navigate](pageRef);
                    })
                    .catch((error) => {
                        console.log("Error While Creating Records", error);
                    });
            }
        } else {
            console.log("Inputs are not Valid");
        }
    }

    validateInput() {
        let fieldsVal = Array.from(this.template.querySelectorAll(".validateme"));
        let isValid = fieldsVal.every((currItem) => currItem.checkValidity());
        return isValid;
    }

    get formTitle() {
        if (this.recordId) {
            return "Edit Account";
        } else {
            return "Create Account";
        }
    }

    get isDeleteAvailable() {
        if (this.recordId) {
            return true;
        }
        else {
            return false;
        }
    }

    showToast() {
        const event = new ShowToastEvent({
            title: "success",
            message: "Record Updated Successfully",
            variant: "success"
        });
        this.dispatchEvent(event);
    }

    deleteHandler() {
        deleteRecord(this.recordId)
            .then(() => {
                console.log('Record Deleted Successfully');
                // Navigates to account list with the filter set to Recent.
                let pageRef =
                {
                    type: 'standard__objectPage',
                    attributes: {
                        objectApiName: ACCOUNT_OBJECT.objectApiName,
                        actionName: 'list'
                    },
                    state: {
                        filterName: 'Recent'
                    }
                };
                this[NavigationMixin.Navigate](pageRef);
            })
            .catch((error) => {
                console.log('Record Deletion Failed', error);
            })
    }
}




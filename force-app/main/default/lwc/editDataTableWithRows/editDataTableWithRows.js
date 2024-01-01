import { LightningElement, wire, api } from 'lwc';
import getContactOfAccount from "@salesforce/apex/DatatableController.getContactBasedOnAccount";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { deleteRecord, updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import CONTACT_OBJECT from "@salesforce/schema/Contact";
import LEAD_SOURCE from '@salesforce/schema/Contact.LeadSource';

const actions = [
    { label: "View", name: "view" },
    { label: "Edit", name: "edit" },
    { label: "Delete", name: "delete" }
];

const DEFAULT_ACTION = [
    {
        label: 'All',
        checked: true,
        name: 'all'
    }
];

const columns = [
    { label: 'FirstName', fieldName: 'FirstName', type: 'text', editable: 'true', hideDefaultActions: true },
    { label: 'LastName', fieldName: 'LastName', type: 'text', editable: 'true', hideDefaultActions: true },
    { label: 'Phone', fieldName: 'Phone', type: 'Phone', editable: 'true', hideDefaultActions: true },
    { label: 'Email', fieldName: 'Email', type: 'email', editable: 'true', hideDefaultActions: true },
    {
        label: 'Lead Source', fieldName: 'LeadSource', type: 'customPicklist', editable: 'true',
        typeAttributes: {
            options: { fieldName: "pickListOptions" },
            value: { fieldName: "LeadSource" },
            context: { fieldName: "Id" }
        },
        hideDefaultActions: true,
        actions: DEFAULT_ACTION
    },
    {
        type: 'action',
        typeAttributes: { rowActions: actions }
    }

];

export default class EditDataTableWithRows extends LightningElement {
    @api recordId;
    columns = columns;
    contactData = [];
    draftValues = [];  //Contains Updated Value when User Edit a cell.
    leadSourceOptions = [];
    contactRefreshProp;
    viewMode = false;
    editMode = false;
    showModal = false;
    selectedRecordId;
    leadSourceActions = [];
    loadActionCompleted = false;
    contactAllData = [];


    @wire(getContactOfAccount, {
        accountId: "$recordId",
        pickList: "$leadSourceOptions"
    })
    getContactOutput(result) {
        this.contactRefreshProp = result;
        if (result.data) {
            //this.contactData = result.data;
            console.log("Lead Source Option Populated");
            this.contactData = result.data.map(currItem => {
                let pickListOptions = this.leadSourceOptions;
                return {
                    ...currItem,
                    pickListOptions: pickListOptions
                };
            });
            this.contactAllData = [...this.contactData]
        }
        else if (result.error) {
            console.log("Error", result.error);
        }
    }

    @wire(getObjectInfo, {
        objectApiName: CONTACT_OBJECT
    })
    objectInfo;

    @wire(getPicklistValues, {
        recordTypeId: "$objectInfo.data.defaultRecordTypeId",
        fieldApiName: LEAD_SOURCE
    }) wirePicklist({ data, error }) {
        if (data) {
            this.leadSourceOptions = data.values;
            console.log('LeadSource Options', this.leadSourceOptions);

            this.leadSourceActions = [];
            data.values.forEach((currItem) => {
                this.leadSourceActions.push({
                    label: currItem.label,
                    checked: false,
                    name: currItem.value
                });
            });
            this.columns.forEach((currItem) => {
                if (currItem.fieldName === 'LeadSource') {
                    currItem.actions = [...currItem.actions, ...this.leadSourceActions]
                }
            });
            this.loadActionCompleted = true;
        }
        else if (error) {
            console.log("Error While Getting Data", error);
        }
    }

    async handleSave(event) {
        const updatedfield = event.detail.draftValues;
        console.log('updateFields-->', JSON.stringify(updatedfield));

        //1.Update Datatable Field Value Using UpdateRecord Adapter..
        let updatedRecordsArray = updatedfield.map((currItem) => {
            let fieldInput = { ...currItem };
            return {
                fields: fieldInput
            };
        });
        this.draftValues = [];
        let updateRecordsArrayPromise = updatedRecordsArray.map((currItem) => updateRecord(currItem));
        await Promise.all(updateRecordsArrayPromise);
        await refreshApex(this.contactRefreshProp);

        this.dispatchEvent(
            new ShowToastEvent({
                title: "Success",
                message: "Contacts Sucessfully updated",
                variant: "success"
            })
        );
    }

    rowactionhandler(event) {
        let actionName = event.detail.action;
        let row = event.detail.row;
        this.selectedRecordId = row.Id;
        this.viewMode = false;
        this.editMode = false;
        this.showModal = false;

        if (actionName.name === "view") {
            this.viewMode = true;
            this.showModal = true;
        }
        else if (actionName.name === "edit") {
            this.editMode = true;
            this.showModal = true;
        }
        else if (actionName.name === "delete") {
            this.deleteHandler();
        }
    }


    async deleteHandler() {
        //use deleteRecordAdapter or Apex
        try {
            await deleteRecord(this.selectedRecordId);
            const event = new ShowToastEvent({
                title: 'Success',
                message: 'Record Saved Successfully',
                variant: 'success'
            });
            this.dispatchEvent(event);
            await refreshApex(this.contactRefreshProp);
        }
        catch (error) {
            const event = new ShowToastEvent({
                title: 'Error',
                message: error.body.message,
                variant: 'error'
            });
            this.dispatchEvent(event);
        }
    }

    async closeModal(event) {
        this.showModal = false;
        if (this.editMode) {
            await refreshApex(this.contactRefreshProp);
        }

    }

    headerActionHandler(event) {
        let actionName = event.detail.action.name;
        const colDef = event.detail.columnDefinition;
        const cols = [...this.columns];

        console.log('ActionName', actionName);
        console.log('ColumnDefinition', colDef);

        if (actionName === "all") {
            this.contactData = [...this.contactAllData]
        }
        else {
            this.contactData = this.contactAllData.filter(
                (currItem) => actionName === currItem.LeadSource
            );
        }

        cols
            .find((currItem) => currItem.fieldName === "LeadSource")
            .actions.forEach(currItem => {
                if (currItem.name === actionName) {
                    currItem.checked = true;
                }
                else {
                    currItem.checked = false;
                }
            });
        this.columns = [...cols];
    }

    get displayData() {
        if (this.contactData && this.loadActionCompleted === true) {
            return true;
            // eslint-disable-next-line no-else-return
        } else {
            return false;
        }
    }
}
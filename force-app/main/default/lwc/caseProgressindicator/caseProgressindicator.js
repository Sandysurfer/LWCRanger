/* eslint-disable no-prototype-builtins */
import { LightningElement, wire, api } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import CASE_OBJECT from '@salesforce/schema/Case';
import CASE_ID from '@salesforce/schema/Case.Id';
import STATUS_FIELD from '@salesforce/schema/Case.Status';
import { getFieldValue, getRecord, updateRecord } from 'lightning/uiRecordApi';
import {
    subscribe,
    unsubscribe,
    onError,
    setDebugFlag,
    isEmpEnabled,
} from 'lightning/empApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { notifyRecordUpdateAvailable } from 'lightning/uiRecordApi';

export default class CaseProgressindicator extends LightningElement {

    statusOptions;
    @api recordId;
    caseStatusValue;
    channelName = '/event/Case_Details__e';
    subscription = {};

    @wire(getObjectInfo, {
        objectApiName: CASE_OBJECT
    })
    objectInfo;

    @wire(getPicklistValues, {
        recordTypeId: "$objectInfo.data.defaultRecordTypeId",
        fieldApiName: STATUS_FIELD
    })
    pickListFunction({ data, error }) {
        if (data) {
            console.log("Data", data);
            this.statusOptions = data.values;
        }
        else if (error) {
            console.log("Error While Fetching Picklist Values", error);
        }

    }

    @wire(getRecord, {
        recordId: "$recordId",
        fields: [STATUS_FIELD]
    })
    getRecordOutput({ data, error }) {
        if (data) {
            this.caseStatusValue = getFieldValue(data, STATUS_FIELD);
        }
        else if (error) {
            console.log('Error Occured While Getting Record', error);
        }
    }

    // Initializes the component
    connectedCallback() {
        this.handleSubscribe();
        // Register error listener
        this.registerErrorListener();
    }

    // Handles subscribe button click
    handleSubscribe() {

        const messageCallback = (response) => {
            console.log("New Message Recieved", JSON.stringify(response));
            this.handleEventResponse(response);
        }

        // Invoke subscribe method of empApi. Pass reference to messageCallback
        subscribe(this.channelName, -1, messageCallback).then((response) => {
            // Response contains the subscription information on subscribe call
            console.log(
                'Subscription request sent to: ',
                JSON.stringify(response.channel)
            );
            this.subscription = response;
        });
    }

    registerErrorListener() {
        // Invoke onError empApi method
        onError((error) => {
            console.log('Received error from server: ', JSON.stringify(error));
            // Error contains the server-side error
        });
    }

    disconnectedCallback() {
        // Invoke unsubscribe method of empApi
        unsubscribe(this.subscription, (response) => {
            console.log('unsubscribe() response: ', JSON.stringify(response));
            // Response is true for successful unsubscribe
        });
    }

    async handleEventResponse(response) {
        console.log("Response From Postman", JSON.parse(JSON.stringify(response)));

        if (response.hasOwnProperty("data")) {
            let jsonObj = response.data;
            if (jsonObj.hasOwnProperty("payload")) {
                let responseCaseId = response.data.payload.Case_Id__c;
                let responseCaseStatus = response.data.payload.Case_Status__c;

                let fields = {};
                fields[CASE_ID.fieldApiName] = responseCaseId;
                fields[STATUS_FIELD.fieldApiName] = responseCaseStatus;

                let recordInput = { fields };
                await updateRecord(recordInput)
                await notifyRecordUpdateAvailable([{ recordId: this.recordId }]);

                const event = new ShowToastEvent({
                    title: 'Success',
                    message: `Case Status is Set to ${responseCaseStatus}`,
                    variant: 'success'
                });
                this.dispatchEvent(event);
            }
        }
    }
}




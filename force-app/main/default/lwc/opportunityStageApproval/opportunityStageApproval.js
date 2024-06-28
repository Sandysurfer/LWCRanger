import { LightningElement, api } from 'lwc';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import approveReject from '@salesforce/apex/OpportunityApprovalController.approveRejectRequest';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class OpportunityStageApproval extends LightningElement {
    //record id

    @api recordId;

    //object info
    objectApiName = OPPORTUNITY_OBJECT;

    //variable to pass in the apex method as parameter
    isRequestApproved = false;

    //handleApprove function to send the approve request to apex.
    handleApprove() {
        this.isRequestApproved = true;
        this.sendRequest();
    }

    //handleReject function is to send the rejection request to apex. 
    handleReject() {
        this.sendRequest();
    }
    sendRequest() {
        //call the apex method with, sending 2 parameters 1. Opportunity record id 2. approval/or reject 
        approveReject({ recordIdStr: this.recordId, isApprove: this.isRequestApproved })
            .then((result) => {

                //if record is approved
                if (result === 'Approved') {

                    //display toast message
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: "Success ! ",
                            message: 'The record has been approved!',
                            variant: "success"
                        })
                    );

                }
                //if record is rejected
                else if (result === 'Rejected') {

                    //display toast message
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: "Success ! ",
                            message: 'The record has been rejected!',
                            variant: "success"
                        })
                    );

                }
                else {

                    //display toast message
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: "Error ! ",
                            message: result,
                            variant: "error"
                        })
                    );

                }

                this.error = undefined;
            })
            .catch((error) => {

                this.error = error;

                this.dispatchEvent(
                    new ShowToastEvent({
                        title: "Error ",
                        message: 'Record is already approved/rejected.',
                        variant: "error"
                    })
                );
            });
    }

}

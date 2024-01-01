import { LightningElement, track } from 'lwc';
import searchContactByEmail from '@salesforce/apex/ContactPortalController.searchContactByEmail';
import sendOTP from '@salesforce/apex/ContactPortalController.sendOTP';
import verifyOTP from '@salesforce/apex/ContactPortalController.verifyOTP';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class ContactPortal extends LightningElement {
    @track email = '';
    @track showOTPForm = false;
    @track otp = '';
    @track contactId;
    @track showRecordForm = false;

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handleOTPChange(event) {
        this.otp = event.target.value;
    }

    searchContact() {
        searchContactByEmail({ email: this.email })
            .then(result => {
                this.contactId = result.Id;
                if (result) {
                    this.showOTPForm = true;
                    this.showToast('Success', 'Contact Found', 'success');
                } else {
                    this.showToast('Error', 'Contact not found', 'error');
                }
            })
            .catch(error => {
                console.log('Error Occurred', error);
            });
    }

    sendOTP() {
        sendOTP({ contactId: this.contactId })
            .then(result => {
                this.showToast('Success', 'OTP sent successfully', 'success');
            })
            .catch(error => {
                this.showToast('Error', 'Error Sending OTP: ' + error.body.message, 'error');
            });
    }

    verifyOTP() {
        verifyOTP({ contactId: this.contactId, userEnteredOTP: this.otp })
            .then(result => {
                if (result) {
                    this.showRecordForm = true;
                } else {
                    this.showToast('Error', 'Invalid OTP', 'error');
                }
            })
            .catch(error => {
                this.showToast('Error', 'Error Verifying OTP: ' + error.body.message, 'error');
            });
    }

    handleRecordEditFormSuccess(event) {
        this.showToast('Success', 'Record Updated successfully', 'success');
        this.showRecordForm = false;
    }

    closeModal() {
        this.showRecordForm = false;
    }

    showToast(title, message, variant) {
        const toastEvent = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(toastEvent);
    }


}

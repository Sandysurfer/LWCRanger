import { LightningElement, api } from 'lwc';
import { RefreshEvent } from 'lightning/refresh';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import updateAccountName from '@salesforce/apex/LightningDataTableController.updateAccountName';

export default class RefreshViewComponent extends LightningElement {
    //1.)Use Case While Updating Account Name using refresh view api....

    //Using async await in place of promises...
    async refreshViewHandler() {
        let acc = this.refs.accNameRef.value;    //Replacement of (this.template.queryselector.value).....
        console.log('Account Input Name', acc);
        await updateAccountName({ Id: this.recordId, Name: acc });

        //RefreshView in Lwc
        this.showToast("Success!", "Account Name has been updated successfully.", "Success");
        this.dispatchEvent(new RefreshEvent());
        console.log('Event is dispatched');
    }


    //2.) Use Case While Uploading file use of refreshview api..
    @api recordId;

    get acceptedFormats() {
        return ['.pdf', '.png'];
    }

    handleUploadFinished() {
        this.showToast("Success!", "Attachment has been uploaded successfully.", "Success");
        this.dispatchEvent(new RefreshEvent());
    }

    //Reusing Toast Message Component....
    showToast(title, message, variant) {
        const toastEvent = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(toastEvent);
    }
}
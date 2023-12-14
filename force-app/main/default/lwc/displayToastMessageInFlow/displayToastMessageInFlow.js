import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DisplayToastMessageInFlow extends LightningElement {

    handleStatusChange(event) {
        if (event.detail.status === 'FINISHED') {
            const cstevent = new ShowToastEvent({
                title: 'Success',
                message: 'Record Created Successfully',
                variant: 'success'
            });
            this.dispatchEvent(cstevent);

        }
    }
}
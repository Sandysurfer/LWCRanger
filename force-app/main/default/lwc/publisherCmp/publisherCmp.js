//2nd Example....
import { LightningElement, wire } from 'lwc';
import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class PublishCmp extends LightningElement {
    strText = '';
    @wire(CurrentPageReference) objpageReference;

    changeName(event) {
        this.strText = event.target.value;
    }

    publishEvent() {

        fireEvent(this.objpageReference, 'sendNameEvent', this.strText);
    }
}
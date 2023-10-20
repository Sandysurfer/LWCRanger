import { LightningElement } from 'lwc';

export default class ParentCmpEvent extends LightningElement {
    buttonName;

    handleCustomEvent(event) {
        // alert('The value coming from parent to child -> '+event.detail);
        this.buttonName = event.detail;

    }

}
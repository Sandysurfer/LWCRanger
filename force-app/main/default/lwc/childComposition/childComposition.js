import { LightningElement } from 'lwc';

export default class ChildComposition extends LightningElement {

    clickHandler() {

        const myCustomEvent = new CustomEvent('fire', {
            bubbles: 'false',
            composed: 'false',
        });
        this.dispatchEvent(myCustomEvent);
    }
}
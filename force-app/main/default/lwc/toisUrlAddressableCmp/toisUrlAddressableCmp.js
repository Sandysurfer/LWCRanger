import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

export default class ToisUrlAddressableCmp extends LightningElement {

    @wire(CurrentPageReference)
    currentPageRef;

    get urlName() {
        return this.currentPageRef.state.c__propertyValue;
    }
}
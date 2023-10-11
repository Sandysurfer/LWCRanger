import { LightningElement } from 'lwc';

export default class GrandParentComposition extends LightningElement {

    fireChidHandler() {
        console.log('Event Handled in GrandParent Component - At Child Level');
    }
}
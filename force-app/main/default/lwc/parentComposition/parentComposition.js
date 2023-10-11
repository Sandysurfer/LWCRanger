import { LightningElement } from 'lwc';

export default class ParentComposition extends LightningElement {

    fireChildHandler() {
        console.log('Event Handled in Parent Component - At Child Level');
    }
    fireChildDivHandler() {
        console.log('Event Handled in Parent Component - At Div Level');
    }
}
import { LightningElement, wire } from 'lwc';
import methodTest from '@salesforce/apex/LightningDataTableController.methodTest';
export default class CallApex extends LightningElement {
    @wire(methodTest) apexProperty;
}
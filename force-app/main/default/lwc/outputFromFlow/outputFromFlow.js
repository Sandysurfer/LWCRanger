/* eslint-disable @lwc/lwc/no-api-reassignments */
import { LightningElement, api } from 'lwc';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';
export default class OutputFromFlow extends LightningElement {

    @api inputName;
    handleChange(event) {
        this.inputName = event.target.value;
       
        this.dispatchEvent( new FlowAttributeChangeEvent('inputName', this.inputName));
    }
}
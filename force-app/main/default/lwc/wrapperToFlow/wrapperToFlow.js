/* eslint-disable @lwc/lwc/no-api-reassignments */
import { LightningElement, api } from 'lwc';
import getFlowInputs from '@salesforce/apex/flowController.getFlowInputs';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';
export default class WrapperToFlow extends LightningElement {

    @api inputValue;
    @api inputValueList;
    @api inputApexType;
    @api inputApexTypeList;

    handleSobject() {
        getFlowInputs()
            .then((result) => {
                console.log('Getting Response', result);
                this.inputValue = result.record;
                this.inputValueList = result.recordList;
                this.inputApexType = result.wrapperInput;
                this.inputApexTypeList = result.wrapperInputList;
                this.dispatchEvent(new FlowAttributeChangeEvent('inputValue', this.inputValue));
                this.dispatchEvent(new FlowAttributeChangeEvent('inputValueList', this.inputValueList));
                this.dispatchEvent(new FlowAttributeChangeEvent('inputApexType', this.inputApexType));
                this.dispatchEvent(new FlowAttributeChangeEvent('inputApexTypeList', this.inputApexTypeList));
            })
            .catch((error) => {
                console.log('Error Occured', error);
            })

    }
}
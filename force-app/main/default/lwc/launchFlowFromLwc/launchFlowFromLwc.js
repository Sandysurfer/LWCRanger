import { LightningElement, api } from 'lwc';

export default class LaunchFlowFromLwc extends LightningElement {

    @api recordId
    get inputVariables() {
        return [
            { name: "AccountId", type: "String", value: this.recordId },
            { name: "OperationType", type: "String", value: "Create Record" }
        ];
    }

    handleStatusChange(event) {
        if (event.detail.status === 'FINSIHED') {
            let outputValues = event.detail.outputVaraibles;

            for (let i = 0; i < outputValues.length; i++) {
                let outputItem = outputValues[i];
                if (outputItem.name === "outputAccountId") {
                    console.log("AccountId", outputItem.value)
                }
                if (outputItem.name === "outputOperationType") {
                    console.log("Operation Type", outputItem.value)
                }
            }
        }
    }
}
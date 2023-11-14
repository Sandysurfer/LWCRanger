/* eslint-disable @lwc/lwc/no-async-operation */
import { LightningElement, wire, api } from 'lwc';
import searchRecords from '@salesforce/apex/CustomLookupController.searchRecords';
const DELAY = 300;
export default class CustomLookup extends LightningElement {

    @api apiName = 'Account';
    searchValue;
    @api objectLabel = 'Account';
    @api iconName = 'standard:account';
    delayTimeOut;
    selectedRecord = {
        selectedId: "",
        selectedName: ""
    };
    displayOptions = false;

    //Wire with property..
    @wire(searchRecords, {
        objectApiName: "$apiName",
        searchKey: "$searchValue"
    })
    outputs;

    get isRecordSelected() {
        return this.selectedRecord.selectedId === "" ? false : true;
    }

    changeHandler(event) {
        window.clearTimeout(this.delayTimeOut);
        let enteredValue = event.target.value;
        //debouncing --> Do not update the reactive properties as long as this function is called within delay..
        this.delayTimeOut = setTimeout(() => {
            this.searchValue = enteredValue;
            this.displayOptions = true;
        }, DELAY);
    }


    clickHandler(event) {
        let selectedId = event.currentTarget.dataset.item;
        console.log("selectedId", selectedId);
        let outputRecord = this.outputs.data.find(
            (currItem) => currItem.Id === selectedId
        );
        this.selectedRecord = {
            selectedId: outputRecord.Id,
            selectedName: outputRecord.Name
        };
        this.sendSelection();
        this.displayOptions = false;
    }

    removeSelectionHandler() {
        this.selectedRecord = {
            selectedId: "",
            selectedName: ""
        };
        this.sendSelection();
        this.displayOptions = false;

    }

    sendSelection() {
        let mySelectionEvent = new CustomEvent("selectedrec", {
            detail: this.selectedRecord.selectedId
        });

        this.dispatchEvent(mySelectionEvent);
    }
}
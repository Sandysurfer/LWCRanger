import { LightningElement, wire, api } from 'lwc';
import searchRecords from '@salesforce/apex/CustomLookupController.searchRecords';
import { showToastEvent } from 'lightning/platformShowToastEvent';
const DELAY = 300;  //milliseconds
export default class MultiSelectLookup extends LightningElement {

    searchKey;
    @api label = 'Account';
    @api placeHolder = 'search Account'
    @api objectApiName = 'Account';
    @api iconName = 'standard:account';
    hasRecords = false;
    searchOutput = [];
    delayTimeout;
    selectedRecords = [];

    @wire(searchRecords, {
        searchKey: '$searchKey',
        objectApiName: '$objectApiName'
    })
    searchResult({ data, error }) {
        if (data) {
            console.log(data);
            this.hasRecords = data.length > 0 ? true : false
            this.searchOutput = data;
        }
        else if (error) {
            console.log(error);
        }
    }

    changeHandler(event) {
        clearTimeout(this.delayTimeout);
        let value = event.target.value;
        this.delayTimeout = setTimeout(() => {
            this.searchKey = value;
        }, DELAY);

    }

    clickHandler(event) {
        let recId = event.target.getAttribute('data-recid');
        console.log('Record Id', recId);

        if (this.validateDuplicate(recId)) {
            let selectedRecord = this.searchOutput.find((currItem) => currItem.Id === recId);

            let pill = {
                type: 'icon',
                label: selectedRecord.Name,
                name: recId,
                iconName: this.iconName,
                alternativeText: selectedRecord.Name
            };
            this.selectedRecords = [...this.selectedRecords, pill];
        }
    }

    handleItemRemove(event) {
        const index = event.detail.index;
        this.selectedRecords.splice(index, 1);
    }


    get showPillContainer() {
        return this.selectedRecords.length > 0 ? true : false;
    }

    validateDuplicate(selectedRecord) {
        let isValid = true;
        let isRecordAlreadySelected = this.selectedRecords.find((currItem) => currItem.name === selectedRecord);

        if (isRecordAlreadySelected) {
            isValid = false;
            this.dispatchEvent(new showToastEvent({
                title: 'Error!!',
                message: 'Pill is Already Selected',
                variant: 'error'
            }));
        }
        else {
            isValid = true;
        }
        return isValid;
    }


}
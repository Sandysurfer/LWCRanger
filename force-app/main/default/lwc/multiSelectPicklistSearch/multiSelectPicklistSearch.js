import { LightningElement } from 'lwc';
import getIndustryPicklist from '@salesforce/apex/IndustryPicklistController.getIndustryPicklist';
export default class MultiSelectPicklistSearch extends LightningElement {

    options;
    selected = []; //selected Values
    selectedAll = []; //selected Values Array with label and value
    remainingAvailable = []; //remaining Available Values
    data;

    connectedCallback() {
        this.fetchIndustryPicklist();
    }
    fetchIndustryPicklist() {
        getIndustryPicklist({ objectApiName: 'Account', fieldApiName: 'Industry' })
            .then(result => {
                console.log('Result', result);
                this.options = result;
                this.data = result;
            })
            .catch(error => {
                console.log('Error Occured', error);
            })
    }

    handleChange(event) {
        //Selected values
        this.selected = event.detail.value;
        this.selectedAll = [];

        //Maintain selected values array with label and value
        this.data.forEach((element) => {
            this.selected.forEach((selectedValue) => {
                if (element.value === selectedValue && this.selectedAll.filter(e => e.value === selectedValue).length === 0) {
                    this.selectedAll.push(element);
                }
            });
        });

        //Maintain non-selected values array
        this.remainingAvailable = [];
        this.data.forEach((element) => {
            if (this.selectedAll.filter(e => e.value === element.value).length === 0) {
                this.remainingAvailable.push(element);
            }
        });
    }

    handleAvailableSearch(event) {
        let searchValue = event.detail.value;
        if (searchValue) {
            //Search for data in the Available options
            let newOptions = this.searchData(this.data, searchValue, false);

            //Add selected values in the options
            this.data.forEach((element) => {
                if (this.selected.filter(e => e === element.value).length === 1) {
                    newOptions.push(element);
                }
            });
            this.options = newOptions;
        }
        else {
            //Reset search result
            this.options = this.data;
        }
    }

    handleSelectedSearch(event) {
        let searchValue = event.detail.value;
        if (searchValue) {
            //Search for data in the Available options
            this.selected = this.searchData(this.selectedAll, searchValue, true);
            let newOptions = [];

            //Maintain selected values array with label and value
            this.data.forEach((element) => {
                if (this.selected.filter(e => e === element.value).length === 1) {
                    newOptions.push(element);
                }
            });
            //Add available values in the options
            this.remainingAvailable.forEach((element) => {
                newOptions.push(element);
            });
            this.options = newOptions;
        }
        else {
            //Reset the selected values
            let selectedValues = [];
            this.selectedAll.forEach((element) => {
                selectedValues.push(element.value);
            });
            this.selected = selectedValues;
            this.options = this.data;
        }
    }

    searchData(allData, searchValue, returnValue) {
        let filterData = [];
        allData.forEach((element) => {
            //Search data
            if (element.label.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                if (returnValue) {
                    filterData.push(element.value);
                }
                else {
                    filterData.push(element);
                }
            }
        });
        return filterData;

    }
}

import { LightningElement } from 'lwc';
import loadDataById from '@salesforce/apex/infiniteLoadController.loadDataById';
import loadMoreData from '@salesforce/apex/infiniteLoadController.loadMoreData';
import countOfAccounts from '@salesforce/apex/infiniteLoadController.countOfAccounts';

const columns = [
    { label: "Name", fieldName: "Name" },
    { label: "Industry", fieldName: "Industry" },
    { label: "Rating", fieldName: "Rating" },

];
export default class LazyLoadingComponent extends LightningElement {
    data = [];
    columns = columns;
    totalRecords = 0;
    recordLoaded = 0;

    connectedCallback() {
        this.loadData();
    }

    async loadData() {
        try {
            this.totalRecords = await countOfAccounts();
            this.data = await loadDataById();
            this.recordLoaded = this.data.length;
        }
        catch (error) {
            console.log("Error While Loading", error);
        }
    }

    async loadMoreData(event) {
        try {
            const { target } = event;
            target.isLoading = true;
            let currentRecords = this.data;
            let lastRecord = currentRecords[currentRecords.length - 1];
            let newRecord = await loadMoreData({
                lastName: lastRecord.Name,
                lastId: lastRecord.Id
            });
            this.data = [...currentRecords, ...newRecord];
            target.isLoading = false;
            this.recordLoaded = this.data.length();
        } catch (error) {
            console.log("Error While Loading", error);
        }
    }
}
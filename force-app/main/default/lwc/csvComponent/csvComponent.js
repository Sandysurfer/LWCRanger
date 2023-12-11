import { LightningElement, track, wire } from 'lwc';
import getAccountList from '@salesforce/apex/LightningDataTableController.getAccounts';

export default class CsvComponent extends LightningElement {

    @track accountData = [];
    @track error;

    columns = [
        { label: 'Account Name', fieldName: 'Name' },
        { label: 'Rating', fieldName: 'Rating' },
        { label: 'Industry', fieldName: 'Industry' },
        { label: 'Phone', fieldName: 'Phone' },
    ];

    @wire(getAccountList)
    wiredaccount({ error, data }) {
        if (data) {
            console.log(data);
            this.accountData = data;
        }
        else if (error) {
            console.log(error);
            this.error = error;
        }
    }
    get checkRecords() {
        return this.accountData.length > 0 ? false : true;
    }

    handleClick() {
        //if Records are seletected on datatable
        let selectedRows = [];
        let downloadRecords = [];
        selectedRows = this.template.querySelector("lightning-datatable").getSelectedRows()

        //If Records are selected then download selected Record else unselected download all Records..
        if (selectedRows.length > 0) {
            downloadRecords = [...selectedRows];
        }
        else {
            downloadRecords = [...this.accountData];
        }
        //Convert Array into csv
        let csvFile = this.convertArrayToCsv(downloadRecords);
        this.createLinkForDownload(csvFile);
    }

    //Convert Array into csv
    convertArrayToCsv(downloadRecords) {
        let csvHeader = Object.keys(downloadRecords[0]).toString();
        let csvBody = downloadRecords.map(currItem =>
            Object.values(currItem).toString()
        );

        debugger;

        let csvfile = csvHeader + '\n' + csvBody.join('\n');
        return csvfile;
    }

    //Create download link
    createLinkForDownload(csvFile) {
        const downLink = document.createElement("a");
        downLink.href = "data:text/csv;charset=utf-8," + encodeURI(csvFile);
        downLink.target = "_blank";
        downLink.download = "Account_Data.csv";
        downLink.click();
    }
}
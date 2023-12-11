import { LightningElement, wire } from 'lwc';
import { createRecord, deleteRecord, updateRecord } from 'lightning/uiRecordApi';
import TASK_MANAGER_OBJECT from '@salesforce/schema/Task_Manager__c';
import TASK_NAME_FIELD from '@salesforce/schema/Task_Manager__c.Name';
import TASK_DATE_FIELD from '@salesforce/schema/Task_Manager__c.Task_Date__c';
import ID_FIELD from '@salesforce/schema/Task_Manager__c.Id';
import COMPLETED_DATE_FIELD from '@salesforce/schema/Task_Manager__c.Completed_Date__c';
import ISCOMPLETED_FIELD from '@salesforce/schema/Task_Manager__c.isCompleted__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import loadAllInCompletedRecords from '@salesforce/apex/ToDoAppController.loadAllInCompletedRecords';
import loadAllCompletedRecords from '@salesforce/apex/ToDoAppController.loadAllCompletedRecords';
import { refreshApex } from '@salesforce/apex';


export default class ToDoManagerApp extends LightningElement {
    taskname = "";
    taskdate = "";
    incompleteTask = [];
    completeTask = [];
    incompleteTaskResult;
    completeTaskResult

    @wire(loadAllInCompletedRecords) wire_inCompleteRecord(result) {
        this.incompleteTaskResult = result;  //Storing Result in Seperate Property
        let { data, error } = result;
        if (data) {
            console.log('Incomplete Task Record', data);

            this.incompleteTask = data.map((currItem) => ({
                taskId: currItem.Id,
                taskname: currItem.Name,
                taskdate: currItem.Task_Date__c
            }));
            console.log('Incomplete Task Array', this.incompleteTask);
        }
        else if (error) {
            console.log('Complete Task Records', error);
        }
    }

    @wire(loadAllCompletedRecords) wire_CompleteRecord(result) {
        this.completeTaskResult = result;
        let { data, error } = result;

        if (data) {
            console.log('Completed Task Record', data);

            this.completeTask = data.map((currItem) => ({
                taskId: currItem.Id,
                taskname: currItem.Name,
                taskdate: currItem.Task_Date__c
            }));
            console.log('Completed Task Array', this.completeTask);
        }
        else if (error) {
            console.log('Complete Task Records', error);
        }
    }

    changeHandler(event) {
        let { name, value } = event.target
        if (name === "taskname") {
            this.taskname = value;
        } else if (name === "taskdate") {
            this.taskdate = value;
        }
    }

    resetTaskHandler() {
        this.taskname = "";
        this.taskdate = null;
    }

    addTaskHandler() {
        //if End Date is Missing then Populate Todays Date as Default Date 
        if (!this.taskdate) {
            this.taskdate = new Date().toISOString().slice(0, 10);
        }

        if (this.validateTask()) {

            let inputFields = {};

            inputFields[TASK_NAME_FIELD.fieldApiName] = this.taskname;
            inputFields[TASK_DATE_FIELD.fieldApiName] = this.taskdate;
            inputFields[ISCOMPLETED_FIELD.fieldApiName] = false;

            let recordInput = {
                apiName: TASK_MANAGER_OBJECT.objectApiName,
                fields: inputFields
            };

            createRecord(recordInput)
                .then((result) => {
                    console.log("Record Created Successfully", result);
                    this.showToast('Success', 'Task Record Created Successfully', 'success');
                    this.resetTaskHandler();
                    refreshApex(this.incompleteTaskResult);
                });

        }
    }

    validateTask() {
        let isValid = true;
        let element = this.template.querySelector(".taskname");
        //condition 1: if task name is Empty
        if (!this.taskname) {
            isValid = false;
        }
        //Condition 2: if task name is not Empty then Check For Duplicate
        else {
            //if find method, wil find an item in array it will return task else it will return undefined
            let taskItem = this.incompleteTask.find(
                (currItem) =>
                    currItem.taskname === this.taskname &&
                    currItem.taskdate === this.taskdate
            );
            if (taskItem) {
                isValid = false;
                element.setCustomValidity('Task is Already Available');
            }
        }
        if (isValid) {
            element.setCustomValidity("");
        }
        element.reportValidity();
        return isValid;
    }

    sortTask(inputArr) {
        let sortArray = inputArr.sort((a, b) => {
            const dateA = new Date(a.taskdate);
            const dateB = new Date(b.taskdate);
            return dateA - dateB;
        });
        return sortArray;

    }

    removeHandler(event) {
        //from Incomplete Task Remove the Array Item.
        let recordId = event.target.name;
        console.log('Deleted RecordId', recordId);
        deleteRecord(recordId)
            .then(() => {
                this.showToast('Deleted', 'Task Record Deleted Successfully', 'success');
                refreshApex(this.incompleteTaskResult);

            })
            .catch((error) => {
                console.log("Error Deleting Record", error);
                this.showToast('Deleted', 'Record Deletion Failed', 'error');
            });

    }

    completeTaskHandler(event) {
        //remove the entry from incomplete item and 
        let recordId = event.target.name;
        this.refreshData(recordId);
    }

    dragStartHandler(event) {
        event.dataTransfer.setData("index", event.target.dataset.item)
    }

    allowDrop(event) {
        event.preventDefault();

    }
    dropElementHandler(event) {
        let recordId = event.dataTransfer.getData("index");
        this.refreshData(recordId);
    }


    async refreshData(recordId) {

        let inputfields = {};
        inputfields[ID_FIELD.fieldApiName] = recordId;
        inputfields[ISCOMPLETED_FIELD.fieldApiName] = true;
        inputfields[COMPLETED_DATE_FIELD.fieldApiName] = new Date().toISOString().slice(0, 10);

        let recordInput = {
            fields: inputfields
        };
        try {
            await updateRecord(recordInput)
            await refreshApex(this.incompleteTaskResult);
            await refreshApex(this.completeTaskResult);
            this.showToast('updated', 'Record Updated Successfully', 'success');
        }
        catch (error) {
            console.log("Update Operation Failed", error);
            this.showToast('Error', 'Record Udpation Failed', 'error');
        }

    }

    //Generic toast component
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant

        });
        this.dispatchEvent(event);
    }
}
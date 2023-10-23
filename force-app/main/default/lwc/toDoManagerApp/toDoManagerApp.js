import { LightningElement } from 'lwc';

export default class ToDoManagerApp extends LightningElement {
    taskname = "";
    taskdate = null;
    incompleteTask = [];
    completeTask = [];

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

            this.incompleteTask = [
                ...this.incompleteTask,
                {
                    taskname: this.taskname,
                    taskdate: this.taskdate
                }
            ];
            this.resetTaskHandler();
            let sortedArray = this.sortTask(this.incompleteTask);
            this.incompleteTask = [...sortedArray];
            console.log('Incomplete Task', this.incompleteTask);
        }
    }

    validateTask() {
        let isValid = true;
        let element = this.template.querySelector(".taskname");
        //condition 1: if task name is Empty
        //Condition 2: if task name is not Empty then Check For Duplicate
        if (!this.taskname) {
            isValid = false;
        }
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
        let index = event.target.name;
        this.incompleteTask.splice(index, 1);
        let sortedArray = this.sortTask(this.incompleteTask);
        this.incompleteTask = [...sortedArray];
        console.log('Incomplete Task', this.incompleteTask);
    }

    completeTaskHandler(event) {
        //remove the entry from incomplete item and 
        let index = event.target.name;
        this.refreshData(index);
    }

    dragStartHandler(event) {
        event.dataTransfer.setData("index", event.target.dataset.item)
    }

    allowDrop(event) {
        event.preventDefault();

    }
    dropElementHandler(event) {
        let index = event.dataTransfer.getData("index");
        this.refreshData(index);
    }

    refreshData(index) {
        let removeItem = this.incompleteTask.splice(index, 1);
        let sortedArray = this.sortTask(this.incompleteTask);
        this.incompleteTask = [...sortedArray];
        console.log('Incomplete Task', this.incompleteTask);
        //add the same entry in complete item
        this.completeTask = [...this.completeTask, removeItem[0]];
    }
}
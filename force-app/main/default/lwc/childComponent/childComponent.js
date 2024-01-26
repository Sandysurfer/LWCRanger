import { LightningElement, api, track } from 'lwc';

export default class ChildComponent extends LightningElement {
    //to access the property coming from parent component
    @api display;   //smallcase
    @api displayGreeting;  //camelcase
    // @api user;
    displayuser;
    @api isUserAvailable = false; //boolean

    //use case of getter and setters
    set user(value) {
        let cloneuser = { ...value }; //using sread operator to make clone of object.
        this.displayuser = cloneuser.channel.toUpperCase();
    }

    @api
    get user() {
        return this.displayuser;
    }

    //Use Case of template.queryselector ,lwc:refs for parent to child communication for accessing properties and method
    @track selectedNumber = 100;

    @api unselectChildMethod() {
        this.selectedNumber = 500;
    }

    handleChild = new Date();

    @api refresh() {
        this.handleChild = new Date();
    }
    @api handleSave() {
        const nameval = this.refs.NameRef.value
        const ageval = this.refs.AgeRef.value
        console.log('Name--', nameval);
        console.log('Age-', ageval);
    }
}
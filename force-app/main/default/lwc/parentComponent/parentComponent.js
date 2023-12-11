import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    //private
    greeting = 'Welcome to TechJourney';

    userdetails = {
        firstname: 'sandeep',
        lastname: 'yadav',
        channel: 'sfdcsurfer'
    };

    //FIRING A CHILD LIGHTNING WEB COMPONENT METHOD FROM PARENT LWC
    handleUnselectRecord() {
        this.template.querySelector("c-child-component").unselectChildMethod();
    }
}
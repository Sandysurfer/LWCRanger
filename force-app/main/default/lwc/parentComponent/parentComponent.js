import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    //private
    greeting = 'Welcome to TechJourney';

    userdetails = {
        firstname: 'sandeep',
        lastname: 'yadav',
        channel: 'sfdcsurfer'
    };

    //FIRING A CHILD COMPONENT METHOD FROM PARENT COMPONENT USING QUERYSELECTOR AND REFS-->

    handleUnselectRecord() {
        this.template.querySelector("c-child-component").unselectChildMethod();
    }

    handleParent() {
        console.log('Handle Click -');
        this.refs.childcmp.refresh();
    }
    handleDetails() {
        this.refs.childcmp.handleSave();
    }
}
import { LightningElement, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
export default class ApexImpCall extends LightningElement {

    @track accountlist;

    handleClick(){
        
        getAccounts()
        .then(result => {
            this.accountlist = result;
        })
        .catch(error => {
            
        });
}
    }
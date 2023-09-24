import { LightningElement, api } from 'lwc';

export default class Mycomonentjune23 extends LightningElement {
   @api recordId;
   @api objectApiName;
   fields = ['AccountId', 'Name', 'Title', 'Phone', 'Email'];
}
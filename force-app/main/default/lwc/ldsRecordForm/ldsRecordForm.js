import { LightningElement, api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import RATING_FIELD from '@salesforce/schema/Account.Rating';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class LdsRecordForm extends NavigationMixin(LightningElement) {
   @api recordId;
   @api objectApiName;
   fields = [NAME_FIELD, RATING_FIELD, INDUSTRY_FIELD, REVENUE_FIELD];

   handleSuccess() {
      const event = new ShowToastEvent({
         title: 'Success',
         message: 'Record Created Successfully',
         variant: 'success'
      });
      this.dispatchEvent(event);
   }

   navigateToRecordPage(event) {
      // console.log('Event Detail', event.detail);
      // console.log('Event Detail', JSON.stringify(event.detail));
      let pageRef = {
         type: 'standard__recordPage',
         attributes: {
            recordId: event.detail.id,
            objectApiName: this.objectApiName,
            actionName: 'view'
         }
      };
      this[NavigationMixin.Navigate](pageRef);
   }

}
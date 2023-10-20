import { LightningElement } from 'lwc';

export default class ChildCmpEvent extends LightningElement {

   //Sending event of child to parent by using custom event..
   handleClick(event) {
      // alert('Button Clicked on child '+event.target.label);
      event.preventDefault();
      const selectEvent = new CustomEvent('mycustomevent', {
         detail: event.target.label
      });
      this.dispatchEvent(selectEvent);
   }
}
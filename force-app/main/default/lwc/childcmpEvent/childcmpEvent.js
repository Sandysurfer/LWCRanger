import { LightningElement,api } from 'lwc';

export default class MyComponentJune17 extends LightningElement {
    

    handleClick(event){
       alert('Button Clicked on child '+event.target.label);
       event.preventDefault();
       const selectEvent = new CustomEvent('mycustomevent', {
       detail: event.target.label
    });
   this.dispatchEvent(selectEvent);
      }
   }
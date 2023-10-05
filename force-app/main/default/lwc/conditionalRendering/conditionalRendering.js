import { LightningElement } from "lwc";

export default class ConditionalRendering extends LightningElement {
  dislayMessage = false;

  changeHandler() {
    //event.target.value;

    //toggle handling in js
    this.dislayMessage = !this.dislayMessage;
  }
}

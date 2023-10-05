import { LightningElement } from "lwc";

export default class DynamicCss extends LightningElement {
  pColor = "choclate-color";

  addcssHandler() {
    let element = this.template.querySelector("p");
    element.classList.add("green-border");
  }
  removecssHandler() {
    let element = this.template.querySelector("p");
    element.classList.remove("green-border");
  }
  togglecssHandler() {
    let element = this.template.querySelector("p");
    element.classList.toggle("green-border");
  }
}

import { LightningElement, wire } from "lwc";
import { registerListener, unregisterListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class Receiver extends LightningElement {

strCapturedText = '';
@wire(CurrentPageReference) pageRef;

connectedCallback() {
	registerListener('sendNameEvent', this.setCaptureText, this);
}

disconnectedCallback() {
	unregisterAllListeners(this);
}

setCaptureText(objPayload) {
	this.strCapturedText = objPayload;
}
}
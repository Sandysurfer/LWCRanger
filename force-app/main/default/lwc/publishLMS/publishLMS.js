import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/sendMessage__c';

export default class PublishLMS extends LightningElement {

    @wire(MessageContext)
    messageContext;

    publishMessage() {
        const payload = { lmsData: 'Welcome From Tech Journey With Ankit' };

        publish(this.messageContext, recordSelected, payload);

    }
}
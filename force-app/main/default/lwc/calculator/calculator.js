/* eslint-disable radix */
import { LightningElement, track } from 'lwc';

export default class Calculator extends LightningElement {
    @track inputOne;
    @track inputTwo;
    result;

    handleChangeOne(event) {
        this.inputOne = event.target.value;
    }
    handleChangeTwo(event) {
        this.inputTwo = event.target.value;
    }
    
    addition() {
        this.result = (parseInt(this.inputOne) + parseInt(this.inputTwo));
    }
    substraction() {
        this.result = (parseInt(this.inputOne) - parseInt(this.inputTwo));
    }
    multiplication() {
        this.result = (parseInt(this.inputOne) * parseInt(this.inputTwo));
    }
    division() {
        this.result = (parseInt(this.inputOne) / parseInt(this.inputTwo));
    }

    clear() {
        this.inputOne = '';
        this.inputTwo = '';
        this.result = '';
    }
}
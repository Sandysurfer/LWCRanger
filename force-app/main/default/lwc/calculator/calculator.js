import { LightningElement } from 'lwc';

export default class June17 extends LightningElement {
    result = 0;
    firstnumber;
    secondnumber;

    handleClick(event){
        
        if(event.target.label=='Additon'){
            this.result = parseInt(this.firstnumber)+parseInt(this.secondnumber);
        }
        if(event.target.label=='Multiplication'){
            this.result = parseInt(this.firstnumber)*parseInt(this.secondnumber);
        }
    }
    onChangeHandler(event){
        if(event.target.name=='input1'){
            this.firstnumber = event.target.value;
        }
        if(event.target.name=='input2'){    
            this.secondnumber = event.target.value;
        }
        this.result = parseInt(this.firstnumber)+parseInt(this.secondnumber);

    }
}
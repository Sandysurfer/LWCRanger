({
    handleClick : function(component, event, helper) {
        
        var buttonName = event.getSource().get("v.label");
        var firstnumberJS = parseInt(component.find("fnumber").get("v.value"));
        var secondnumberJS = parseInt(component.find("snumber").get("v.value"));
        var result = 0;
        if(buttonName == 'Addition'){
            result = firstnumberJS + secondnumberJS;
            
        }
        
        if(buttonName == 'Multiplication'){
            result = firstnumberJS * secondnumberJS;
        }   
        if(buttonName == 'Substraction'){
            result = firstnumberJS - secondnumberJS;
            
        }
        component.set("v.Result",result);
        
    }
})
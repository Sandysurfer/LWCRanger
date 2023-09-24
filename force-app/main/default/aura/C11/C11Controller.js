({
    handleClick : function(component, event, helper) {
        var clickedButton = event.getSource().get("v.label"); 
           
        
        var cmpEvent = component.getEvent("cmpEvent");
        cmpEvent.setParams({
            "buttonname" : clickedButton });
        cmpEvent.fire();
    }	
})
({
    handleClick : function(component, event, helper) {
        
        var action = component.get("c.getOppty");
        action.setParams({recordLimit:component.get("v.opptyRecords")});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                
                //alert("From server: " +);
                component.set("v.OppList",response.getReturnValue());
                
            }
            else if (state === "INCOMPLETE") {
                
            }
                else if (state === "ERROR") {
                }
        });
        $A.enqueueAction(action);
        
        
    }
})
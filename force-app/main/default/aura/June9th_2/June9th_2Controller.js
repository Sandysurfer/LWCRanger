({
    handleClick : function(component, event, helper) {
       
        var nameJS = component.find("name").get("v.value");
        var emailJS = component.find("email").get("v.value");
        var phoneJS = component.find("phone").get("v.value");
        
        var action = component.get("c.createContact");
        action.setParams({ name:nameJS,
                          email:emailJS,
                          phone:phoneJS
                         });
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log(getState);
            if (state === "SUCCESS") {
                alert("From server: "+response.getReturnValue());
            }
            
            else if (state === "INCOMPLETE") {
                
            }
                else if (state === "ERROR") {
                    
                }
        });
        $A.enqueueAction(action);
        
        
    }
})
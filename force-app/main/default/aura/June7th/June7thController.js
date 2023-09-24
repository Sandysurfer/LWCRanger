({
	handleClick : function(component, event, helper) {
       var firstnameJS = component.find("fname").get("v.value");
       var lastnameJS = component.find("lname").get("v.value");
       var emailJS = component.find("email").get("v.value");
       var phoneJS = component.find("phone").get("v.value");
       component.set("v.firstname",firstnameJS);
       component.set("v.lastname",lastnameJS);
       component.set("v.email",emailJS);
       component.set("v.phone",phoneJS);
       component.set("v.showInput",false);
       component.set("v.showOutput",true);
		
	},
    goBack : function(component, event, helper) {
       component.set("v.showInput",true);
       component.set("v.showOutput",false);
    }
        
})
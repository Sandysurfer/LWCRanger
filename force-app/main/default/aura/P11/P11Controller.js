({
      handleComponentEvent : function(component, event, helper) {
         
          var buttonClicked = event.getParam("buttonname");
          component.set("v.buttonName",buttonClicked);
         // alert('This is Parent component and the button clicked is '+buttonClicked);
		
       
		
	}
})
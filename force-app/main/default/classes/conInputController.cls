public with sharing class conInputController {

     public Consultant__c con;

    public conInputController(ApexPages.StandardController controller) {
      this.con = (Consultant__c)controller.getRecord();
      con.ownerId = userinfo.getuserId();
    }
    
      //Save button -- in clicking it we should be redirected to conOutput
      public pageReference Save(){
      upsert con;
      pageReference pNext = new PageReference('/'+con.id);
      pNext.setRedirect(true);  
      return pNext;
}

    //SaveAndNew button --on clicking it we should be redirected to itself with a blank page
     public pageReference SaveAndNew(){
      upsert con;
      pageReference pNext = new PageReference('/apex/consultantInput');
      pNext.setRedirect(true);  
      return pNext;
      }
      
      
  }
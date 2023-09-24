public with sharing class accExtInput {
      public Account acc;
      public accExtInput(ApexPages.StandardController controller) {
      this.acc = (Account)controller.getRecord();
      }
      
      public PageReference Save(){
          upsert acc;
          PageReference pNext = new PageReference('/apex/accounoutput?id='+acc.id);
          pNext.setRedirect(true);
          return pNext;
     }
      public PageReference SaveAndNew(){
          upsert acc;
          PageReference pNext = new PageReference('/apex/accountInput');
          return pNext;
     
   }
   
 }
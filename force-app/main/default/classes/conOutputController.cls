public with sharing class conOutputController {


   public conOutputController(){
   ID conID = ApexPages.currentPage().getParameters().get('id');
   con = [select name,date_of_joining__c,date_of_birth__c, phone__c, ownerID,type__c, state__c, country__c, status__c, email__c from consultant__c where id=: conID];
}

   public Consultant__c con { get; set; }
   
 }
public Class DatatableController{

   @auraEnabled(Cacheable=true)
   public static List<Contact> getContacts(){
      List<Contact> conList = new List<Contact>();
      conList = [SELECT id,Name,Email,Phone From contact limit 10];
      return conList;
   }
      
 }
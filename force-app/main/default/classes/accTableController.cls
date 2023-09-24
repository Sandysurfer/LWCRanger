public with sharing class accTableController {

     public List<Account> accList{get; set;}
     public String searchString{get; set;} 
     
     //SELECT Id,Name,Type FROM Acccount where name LIKE '%test%'
     
      public accTableController(ApexPages.standardController controller) {

        }
        
      public PageReference Search (){
        String querystring = 'SELECT Id, Name, Type, rating, phone FROM Account where name LIKE \'%' + searchstring + '% \'';
         accList = Database.query(queryString);     
        //accList = [SELECT Id, Name, Type FROM Account where name LIKE '%test%'];
        return null;

}

}
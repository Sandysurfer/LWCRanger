public class FutureExample {
    @future
    //Only Primitive DataTypes can be Passed Through Parameters...
    public static void futureMethod(String ConName,String ConType){
        Consultant__c con = new Consultant__c ();
        con.Name = ConName;
        con.Type__c = ConType;
        insert con;
        
    }
    
    public static void mixedDmlExample(){
        
        Profile prof = [Select Id From Profile Where Name = 'Marketing User' Limit 1];
        UserRole r = [SELECT Id FROM UserRole WHERE Name='CEO'];
        
        
        User userExample = new User();
        userExample.Username = 'futureMethod@future.com';
        userExample.FirstName = 'future';
        userExample.LastName = 'Demp';
        userExample.Alias = 'Alias';
        userExample.Email = 'futureEx@sfdc.com';
        userExample.TimeZoneSidKey = 'America/New_York';
        userExample.LocaleSidKey = 'en_US';
        userExample.EmailEncodingKey = 'ISO-8859-1';
        userExample.ProfileId = prof.Id;
        userExample.UserRoleId = r.Id;
        userExample.LanguageLocaleKey = 'en_US';
        
        insert userExample;
        
        futureMethod('Dinesh','Vendor');
        
        
    }
    
}
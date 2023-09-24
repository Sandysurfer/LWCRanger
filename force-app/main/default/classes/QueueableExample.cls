public class QueueableExample implements Queueable {
    //Passing input as String(Primitive DataTypes) by Using Constructor....
    public String consultantName;
    public String consultantType;
    
    public QueueableExample(String consultantName, String consultantType) {
        this.consultantName = consultantName;
        this.consultantType = consultantType;
    }
    
    @future
    public static void createConsultantRecord(String consultantName, String consultantType){
        Consultant__c con = new Consultant__c();
        con.Name = consultantName;
        con.Type__c = consultantType;
        insert con;
    }
    
    public void execute(QueueableContext context){
        
        //Create User Record...
        Profile prof = [Select Id From Profile Where Name = 'Marketing User' Limit 1];
        UserRole r = [SELECT Id FROM UserRole WHERE Name='COO'];
        
        
        User userExample = new User();
        userExample.Username = 'sfdcApexfutureQueueable@test.com';
        userExample.FirstName = 'Apexfuture';
        userExample.LastName = 'ApexQueueable';
        userExample.Alias = 'Alias';
        userExample.Email = 'sfdcfutureQueueablet@test.com';
        userExample.TimeZoneSidKey = 'America/New_York';
        userExample.LocaleSidKey = 'en_US';
        userExample.EmailEncodingKey = 'ISO-8859-1';
        userExample.ProfileId = prof.Id;
        userExample.UserRoleId = r.Id;
        userExample.LanguageLocaleKey = 'en_US';
        insert userExample;
        
        //Calling Consultant Record creation Method...
        createConsultantRecord(consultantName,consultantType);
    }
}
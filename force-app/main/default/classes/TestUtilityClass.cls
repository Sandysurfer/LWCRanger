@isTest
public class TestUtilityClass {
    public static Account createAccount(string name){
        Account ac = new Account();
        ac.Name = name;
        ac.Balance__c = 0;
        return ac;
    }
    
    public static list<contact> createContact(string lastName, string transactionType, string conPhone, decimal amount, id accountId, integer count){
        list<contact> conList = new list<contact>();
        
        for(integer i= 0; i<count; i++){
            Contact c = new Contact();
            c.lastName = lastName;
            c.Email = lastName+i+'@gmail.com';
            c.Transaction_Type__c = transactionType;
            c.Phone = conPhone;
            c.Amount__c = amount;
            c.AccountId = accountId;
            conList.add(c);
        }
        return conList;
    }
}
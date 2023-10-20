public with sharing class CallApexController {
    
    @AuraEnabled(Cacheable=true)
    public static List<Account> getAccounts(){
        List<Account> accList = [SELECT id, Name, Industry,Rating From Account limit 10];
        return accList;
    }
    
    @AuraEnabled
    public static List<Contact> getContacts(String selectedAccountId){
        List<Contact> contactList = [Select Id,Name,Email,Phone,AccountId From Contact Where AccountId =: selectedAccountId];
        return contactList;
    }
    
    
}
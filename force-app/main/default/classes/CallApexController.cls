public with sharing class CallApexController {
    
    @AuraEnabled(Cacheable=true)
    public static List<Account> getAccounts(){
        List<Account> accList = new List<Account>();
        
        accList = [SELECT id, Name, Industry,Rating From Account limit 10];
        
        return accList;
    }

}
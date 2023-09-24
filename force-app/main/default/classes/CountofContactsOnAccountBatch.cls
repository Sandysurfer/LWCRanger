global class CountofContactsOnAccountBatch implements Database.Batchable<sObject>,Database.Stateful {
    Set<String> accNameSet = new Set<String>();
    //1.Start Method    
    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator('SELECT Id,Name,No_of_Contacts__c,(Select Id From Contacts) FROM Account Where No_of_Contacts__c = Null');
    }
    //2.)Execute Method....
    global void execute(Database.BatchableContext bc, List<Account> accList) {
        for(Account acc : accList){
            if(acc.Contacts != null){
                acc.No_of_Contacts__c = acc.Contacts.size();
                accNameSet.add(acc.Name);
            }
            update accList;
        }
    }
    
    global void finish(Database.BatchableContext bc) {
        system.debug('batch job id = '+bc.getJobId());
    }
    
}
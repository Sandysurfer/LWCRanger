global class CreateContactRelatedAccountBatchApex implements Database.Batchable<sObject> {
    
    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator('SELECT Id, FirstName,LastName FROM Contact');
    }
    
    global void execute(Database.BatchableContext bc, List<Contact> conList) {
        System.debug('--1--'+conList);
        List<Account> accList = new List<Account>();
        for(Contact con : conList){
            Account acc = new Account();
            acc.Name = con.LastName+'Account';
            accList.add(acc);
        }
        System.debug('--2--'+accList);
        //insert acclist;
    }
    
    global void finish(Database.BatchableContext bc) {
        
        system.debug('batch job id = '+bc.getJobId());
    }
    
}
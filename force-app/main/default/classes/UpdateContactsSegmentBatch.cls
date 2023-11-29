global class UpdateContactsSegmentBatch implements Database.Batchable<SObject>, Database.Stateful {
    global Database.QueryLocator start(Database.BatchableContext bc) {
        
        String query = 'SELECT Id, AccountId, Account_Segment__c, Amount__c FROM Contact Where AccountId != null AND Amount__c != null';
        return Database.getQueryLocator(query);
    }
    
    global void execute(Database.BatchableContext bc, List<Contact> conList) {
        // Process conList using the handler class
        ContactBatchHandler.executeBatch(conList);
    }
    
    global void finish(Database.BatchableContext bc) {
        
    }
}
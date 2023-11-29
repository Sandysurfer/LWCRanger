public class ContactBatchHandler {
    
    public static void executeBatch(List<Contact> conList) {
        Map<Id, List<Contact>> accountContactsMap = new Map<Id, List<Contact>>();
        Set<String> processedSegments = new Set<String>();
        List<Contact> contactsToUpdate = new List<Contact>();
        List<Contact> contactsToDelete = new List<Contact>();
        
        for(Contact con : conList) {
            System.debug('Contact-->' + con.Id + ' with AccountId-->' + con.AccountId);
            
            if(!accountContactsMap.containsKey(con.AccountId)) {
                accountContactsMap.put(con.AccountId, new List<Contact>());
            }
            accountContactsMap.get(con.AccountId).add(con);
        }
        
        System.debug('AccountContactsMap--->' + accountContactsMap);
        
        for(Id accountId : accountContactsMap.keySet()) {
            List<Contact> accountContactsList = accountContactsMap.get(accountId);
            
            if(accountContactsList != null && accountContactsList.size() > 1) {
                System.debug('More than one contact for AccountId--> ' + accountId);
                
                Contact newContact = accountContactsList.remove(accountContactsList.size() - 1); 
                
                for(Contact existingContact : accountContactsList) {
                    String segmentKey = existingContact.Account_Segment__c;
                    
                    if(!processedSegments.contains(segmentKey) &&
                       existingContact.Account_Segment__c.equals(newContact.Account_Segment__c)) {
                           
                           System.debug('Combine Amounts for Equal Segment-->' + segmentKey);
                           
                           existingContact.Amount__c += newContact.Amount__c;
                           contactsToUpdate.add(existingContact);
                           
                           contactsToDelete.add(newContact);
                           processedSegments.add(segmentKey);
                           break;
                       }
                }
            }
        }
        
        try{
            update contactsToUpdate;
            System.debug('Updating ' + contactsToUpdate.size() + ' contacts');
        }catch (Exception e) {
            System.debug('Exception during update: ' + e.getMessage());
        }
        
        try{
            delete contactsToDelete;
            System.debug('Deleting ' + contactsToDelete.size() + ' contacts');
        }catch (Exception e) {
            System.debug('Exception during delete: ' + e.getMessage());
        }
    }
}
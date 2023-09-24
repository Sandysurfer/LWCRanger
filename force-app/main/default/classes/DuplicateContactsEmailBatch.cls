global class DuplicateContactsEmailBatch implements Database.Batchable<SObject>, Database.Stateful{
    Set<String> duplicateEmailList = new Set<String>();
    
    global Database.QueryLocator start(Database.BatchableContext bc) {
        String query = 'SELECT Id, Email FROM Contact WHERE Email != Null';
        return Database.getQueryLocator(query);
    }
    
    global void execute(Database.BatchableContext bc, List<Contact> conList) {
        
        Map<String, List<Contact>> emailContactsMap = new Map<String, List<Contact>>();
        for(Contact con : conList){
            if(!emailContactsMap.containsKey(con.Email)) {
                emailContactsMap.put(con.Email, new List<Contact>());
                System.debug('--1--'+emailContactsMap);
            }
            emailContactsMap.get(con.Email).add(con);
            System.debug('--2--'+emailContactsMap);
        }
        for(String email : emailContactsMap.keySet()){
            List<Contact> contactsEmailList = emailContactsMap.get(email);
            System.debug('--3--'+contactsEmailList.size());
            if(contactsEmailList.size() >= 1) {
                duplicateEmailList.add(email);
                System.debug('--4--'+duplicateEmailList);
            }
        }
    }
    global void finish(Database.BatchableContext bc) {
        System.debug('--5--'+duplicateEmailList);
        if(!duplicateEmailList.isEmpty()){
            Messaging.SingleEmailMessage mymail = new Messaging.SingleEmailMessage();
            String[] toaddresses = new String[] {'sandysurfe15@gmail.com'}; 
                mymail.setToAddresses(toAddresses);
            mymail.setSubject('AccountDuplicateContactsEmail '+system.today());
            mymail.setPlainTextBody(string.valueOf(duplicateEmailList));
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mymail });   
        }
    }
}
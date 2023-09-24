global class SendEmailToAccountContactsBatch implements Database.Batchable<SObject>,Database.stateful{
    List<String> ContactNameList = new List<String>();
    
    global Database.QueryLocator start(Database.BatchableContext bc) {
        String query = 'SELECT Id,Name,(SELECT Id,Name FROM Contacts) FROM Account';
        return Database.getQueryLocator(query);
    }
    
    global void execute(Database.BatchableContext bc, List<Account> accList) {
        for(Account acc : accList){
            if(acc.Contacts.size() >= 3){
                for(Contact con : acc.Contacts){
                    ContactNameList.add(con.Name); 
                }
            }
        }
    }
    global void finish(Database.BatchableContext bc) {
        //ContactNameList
        System.debug('---'+ContactNameList);
        if(ContactNameList.size() > 0){
            Messaging.SingleEmailMessage mymail = new Messaging.SingleEmailMessage();
            String[] toaddresses = new String[] {'sandysurfe15@gmail.com'}; 
                mymail.setToAddresses(toAddresses);
            mymail.setSubject('Account Process Email '+system.today());
            mymail.setPlainTextBody(string.valueOf(contactNameList));
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mymail });    
        }
    }
}
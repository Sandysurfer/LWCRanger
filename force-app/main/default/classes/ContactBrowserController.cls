public class ContactBrowserController {
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactListByFilter(String accountId, String industry){
        String query = 'select Id,Name,Title,PhotoUrl From Contact';
        
        List<String> filters = new List<String>();
        if(String.isNotBlank(accountId)){
            filters.add('accountId = :accountId');
        }
        if(String.isNotBlank(industry)){
            filters.add('Contact.Account.Industry = :industry');
        }
        if(!filters.isEmpty()){
            query += ' where ' + String.join(filters , ' AND ');
        }
        query += ' WITH USER_MODE ';
        query += 'ORDER BY Name';
        System.debug('Query'+query);
        List<Contact> contactList = Database.query(query);
        system.debug(contactList);
        return contactList;
        
    }
    
}
public class ContactController {
    
    @AuraEnabled
    public static List<Contact> createContactRecords(String firstname, String lastname, String email, String phone){
        List<Contact> contactList = new List<Contact>();
        if(contactList!= null){
            contact con = new contact();
            con.FirstName = firstname;
            con.LastName = lastname;
            con.Email = email;
            con.Phone = phone;
            contactList.add(con);
        }
        if(!contactList.isEmpty()){
            System.debug('Created Contact Records-->'+contactList);
            insert contactList;
            return contactList;
        }
        return null;
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(){
        List<Contact> contactList = [Select Id,Name,FirstName,LastName,Title,Email,Phone,PhotoUrl From Contact Where PhotoUrl != null WITH USER_MODE Limit 10];
        return contactList;
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String searchKeyword){
        if(searchKeyword != '' && searchKeyword != null){
            String key = '%' + searchKeyword + '%';
            List<Contact> contactList = [Select Id,FirstName,LastName,Email,Phone,AccountId,Account.Name FROM Contact Where AccountId != null AND FirstName Like :key Limit 50];
            return contactList;
        }
        else{
            List<Contact> conList = [Select Id,FirstName,LastName,Email,Phone,AccountId,Account.Name FROM Contact Where AccountId != null Limit 50]; 
            return conList;
        }
        
    }
    
    @AuraEnabled
    public Static void deleteContact(String contactId){
        List<Contact> conList = [Select Id From Contact Where Id =: contactId];
        delete conList;
    }
    
    @AuraEnabled
    public Static void deleteBulkContactData(List<Id> lstContactIds){
        List<Contact> conList = [Select Id From Contact Where Id IN : lstContactIds];
        delete conList;
    }
}
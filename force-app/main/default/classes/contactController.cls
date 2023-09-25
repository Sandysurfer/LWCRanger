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
}
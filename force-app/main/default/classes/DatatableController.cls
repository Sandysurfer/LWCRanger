public Class DatatableController{
    
    @AuraEnabled(Cacheable=true)
    public static List<Contact> getContacts(){
        List<Contact> conList = new List<Contact>();
        conList = [SELECT id,FirstName,LastName,Email,Phone From contact limit 10];
        return conList;
    }
    
    @AuraEnabled
    public static String updateContactDetails(object contactData){
        System.debug('ContactsData--->'+contactData);
        
        //Use to update Contact Object by deserialize method...
        List<Contact> contactList = (List<Contact>) JSON.deserialize(JSON.serialize(contactData), List<Contact>.class);
        System.debug('contactList--->'+contactList);
        
        if(!contactList.isEmpty()){
            update contactList;
            return 'success';   
        }
        return 'failed';
    }
    
}
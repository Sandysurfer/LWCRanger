public class LightningDataTableController {
    
    @AuraEnabled(Cacheable=true)
    public static List<Contact> getContactList(){
        return[Select Id,Name From Contact];
    }
    
    @AuraEnabled(cacheable = true)
    public static List<Account> getAccountList(){
        List<Account> accountList = [Select Id, Name From Account]; 
        return accountList;
    }
    
    @AuraEnabled(cacheable = true)
    public static List<Account> findAccountsData(String searchAccount){
        String searchName = '%' + searchAccount + '%';
        List<Account> accountList = [SELECT Id, Name, Phone, Fax, Industry FROM Account WHERE Name LIKE : searchName];
        //System.debug('Accounts--->'+AccountList);
        return accountList;
    }  
    
    @AuraEnabled
    public static void deleteAccount(Account accObj){
        try{
            delete accObj;
        }
        catch(exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }
    
    @AuraEnabled
    public static List<Contact> getRelatedContacts(String accountRecordId, String searchValue){
        if(searchValue != '' && searchValue != null){
            String key = '%' + searchValue + '%';
            List<Contact> conList = [Select Id,Name,Phone,Email,AccountId From Contact Where AccountId =: accountRecordId AND Name Like :key];
            return conList;
        }
        else {
            List<Contact> conList = [Select Id,Name,Phone,AccountId From Contact Where AccountId =: accountRecordId];
            return conList; 
        }  
    }
    
}
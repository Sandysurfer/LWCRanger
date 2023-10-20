public class CustomLookupController {
    
    @AuraEnabled(Cacheable=true)
    public static List<sObject> searchRecords(String objectApiName, String searchKey){
        List<sObject> sObjectList = new List<sObject>();
        
        if(String.isBlank(searchKey)){
            return sObjectList;
        }
        else{
            String key = '%' + searchKey + '%';
            String queryString = 'Select Id, Name From ' + objectApiName + ' Where Name Like :key order by Name limit 5';
            sObjectList = Database.query(queryString, AccessLevel.SYSTEM_MODE);
            System.debug('Data-->'+sObjectList);
        }
        return sObjectList;
    }
    
}
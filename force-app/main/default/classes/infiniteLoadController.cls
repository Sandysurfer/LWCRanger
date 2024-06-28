public with sharing class infiniteLoadController {
    public infiniteLoadController() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Account> loadDataById(){
      return[Select Id,Name,Industry,Rating From Account ORDER BY Name LIMIT 500];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> loadMoreData(String lastName, String lastId){
        return[Select Id,Name,Industry,Rating From Account WHERE (Name > : lastName) OR (Name = : lastName AND Id > : lastId) ORDER BY Name,Id Limit 500];
      
    }
    @AuraEnabled
    public static Integer countOfAccounts(){
      AggregateResult agr = [Select Count(Id) recordCount From Account];
      return(Integer)agr.get('recordCount');
    }
}
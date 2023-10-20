public class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList(){
        List<Account> accList = [Select Id,Name,Industry From Account Where AnnualRevenue != null];
        return accList;
    }
}
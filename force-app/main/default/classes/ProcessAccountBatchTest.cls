@istest
public class ProcessAccountBatchTest {
    @istest
    public static void countOfContactsTest(){
        Account ac = TestUtilityClass.createAccount('BatchTest');
        insert ac;
        List<Contact> conList = TestUtilityClass.createContact('CountTest', 'Deposit', 500, ac.Id, 5);
        insert conList;
        
        Test.startTest();
        database.executeBatch(new CountofContactsOnAccountBatch(),5);
        Test.stopTest();
        
        List<Account> accList = [Select Id,Name, No_of_Contacts__c From Account Where Id =:ac.Id];
        System.assertEquals(5, accList[0].No_of_Contacts__c);
    }
    
}
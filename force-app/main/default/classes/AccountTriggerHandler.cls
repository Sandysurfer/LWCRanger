public class AccountTriggerHandler {
    //Scenario 1:
    public static void avoidDuplicateNames(List<Account> accList){
        Set<String> accNameSet = new Set<String>();
        for(Account ac : accList){
            accNameSet.add(ac.Name);     
        }
        Set<String> duplicateAccNames = new Set<String>();
        List<Account> exAccList = [Select Id,Name From Account Where Name IN : accNameSet WITH SECURITY_ENFORCED ];
        for(Account a : exAccList){
            duplicateAccNames.add(a.Name);
        }
        //System.debug('--1--'+duplicateAccNames);
        for(Account ac : accList){
            if(duplicateAccNames.contains(ac.Name)){
                ac.addError('Account Name Already Exists');
            }
        }
    }
    //Scenario 3:
    public static void deleteAccountRelatedContact(List<Account> accList){
        Set<String> accNameSet = new Set<String>();
        for(Account ac : accList){
            accNameSet.add(ac.Name);
        }
        List<Contact> conListToDelete = [Select Id From Contact Where Name IN : accNameSet  With SECURITY_ENFORCED];
        System.debug('--1--'+conListToDelete);
        if(conListToDelete.size()>0){
            delete conListToDelete;
        }
    }
    //Scenario:- Recursion....
    public static void createRelatedContact(List<Account> newAccList){
        List<Contact> conList = new List<Contact>();
        for(Account acc : newAccList){
            Contact con = new Contact();
            con.LastName = acc.Name;
            conList.add(con);
        }
        if(conList.size()>0){
            insert conList;
        }
    }
    //***Task 4:- Create multiple Contacts on insert,update and delete according to of No of contacts field in Account....
    public static void createMultipleContact(list<Account> newAccList,Map<Id,Account> oldAccMap){
        list<contact> conList = new list<contact>();
        for(Account ac: newAccList){
            for(integer i = 1; i <= ac.No_of_Contacts__c; i++){
                Contact c = new Contact();
                c.lastName = ac.Name;
                c.AccountId= ac.id;
                conList.add(c);
            }
        }
        if(conList.size()>0){
            insert conList;  
        }    
    }
    //***Task 4: Create multiple Contacts on update and delete Contacts according to of No of contacts field in Account....
    public static void updateMultipleContact(List<Account> newAccList, Map<Id,Account> oldAccMap){
        Set<Id> accIdSet = new Set<Id>();
        Map<Id,List<Contact>> accConMap = new Map<Id,List<Contact>>();
        
        for(Account ac : newAccList){
            accIdSet.add(ac.Id);
        }
        for(Account act : [Select Id,No_of_Contacts__c,(Select Id,AccountId From Contacts) From Account Where Id IN : accIdSet WITH SECURITY_ENFORCED]){
            accConMap.put(act.Id,act.Contacts);
        }
        List<Contact> diffConList = new List<Contact>();
        List<Contact> delConList = new List<Contact>();
        
        if(oldAccMap != null){
            for(Account acc : newAccList){
                if(acc.No_of_Contacts__c != oldAccMap.get(acc.Id).No_of_Contacts__c){
                    decimal diff = acc.No_of_Contacts__c - oldAccMap.get(acc.Id).No_of_Contacts__c;
                    
                    if(diff > 0){
                        //Insert Contacts...
                        for(integer i=0; i<diff; i++){
                            contact con = new contact();
                            con.lastName = acc.Name;
                            con.AccountId = acc.id;
                            diffConList.add(con);
                        }
                    }
                    else{
                        //delete Contacts...
                        for(Contact c : accConMap.get(acc.Id)){
                            if(diff == 0){
                                break;
                            }
                            delConList.add(c);
                            diff = diff+1;
                        }
                    }
                }
            }
            if(diffConList.size()>0)
                insert diffConList;
            if(delConList.size()>0)
                delete delConList;
        }   
    }
    
    //Task 3:-
    public static void createContactIfAccountNotExists(List<Account> newAccList){
        List<Contact> conList = new List<Contact>();
        Set<String> accNameSet = new Set<String>();
        Map<String, Id> exAccMap = new Map<String, Id>();
        
        for(Account ac : newAccList){
            accNameSet.add(ac.Name);
        }
        
        for(Account exAcc : [SELECT Id, Name FROM Account Where Name IN : accNameSet WITH SECURITY_ENFORCED]){
            exAccMap.put(exAcc.Name, exAcc.Id);
        }
        for(Account acc : newAccList){
            //System.debug('--1--'+exAccMap);
            if(exAccMap.containsKey(acc.Name)){
                System.debug('--2--'+exAccMap.containsKey(acc.Name));
                acc.addError('Account with name "' + acc.Name + '" already exists.');
            } 
            else{
                Contact con = new Contact();
                con.LastName = acc.Name;
                con.AccountId = exAccMap.get(acc.Name);
                conList.add(con);
            }
        }
        //Database Class Insert Methods........
        Database.SaveResult[] srList = Database.insert(conList,false);
        
        //Iterate through Database element.....
        for(Database.SaveResult result : srList){
            if(result.isSuccess()){
                //If Operation is Successful get the Id of records processed...
                System.debug('Successfully inserted Contact ID '+result.getId());
            }
            else
            {
                //If Operations is failed get all the errors ...
                for(Database.Error er : result.getErrors()){
                    System.debug('The Following Error has Occured');
                    System.debug(er.getStatusCode()+' '+er.getMessage());
                    System.debug('Contact field effected with error '+er.getFields());
                }
            }
        }
    }
}
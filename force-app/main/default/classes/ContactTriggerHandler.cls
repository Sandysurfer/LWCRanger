public class ContactTriggerHandler {
    
    public static void validateLastName(List<Contact> newConList){
        for(Contact c : newConList){
            if(c.lastName == 'Test'){
                c.addError('LastName cannot be Test');
            }
        }   
    }
    
    public static void compareNames(List<Contact> newConList){
        for(Contact c : newConList){
            if(c.firstName == c.LastName){
                c.addError('FirstName and LastName cannot be Same');
            }
        }   
    }
    
    public static void updateEmail(List<Contact> newConList){
        for(Contact c : newConList){
            if(c.Email == null){
                c.Email = c.FirstName+'.'+c.LastName +'@gmail.com';
            }
        }   
    }
    
    public static void checkEmailAndPhone(List<Contact> newConList){
        for(Contact con : newConList){
            if(con.Email == null && con.Phone == null){
                con.addError('Email and Phone are Required');
            }
        }
    }
    
    public static void validateEmail(List<Contact> newConList){
        Set<String> emailSet = new Set<String>();
        for(Contact con : newConList){
            if(con.Email != null){
                emailSet.add(con.Email);
            }
        }
        System.debug('--1--'+emailSet);
        
        Set<String> duplicateEmailSet = new Set<String>();
        for(Contact c : [Select Id,Email From Contact Where Email IN : emailSet]){
            duplicateEmailSet.add(c.Email);
        }
        System.debug('--2--'+duplicateEmailSet);
        
        for(Contact ct : newConList){
            if(duplicateEmailSet.contains(ct.Email)){
                ct.addError('Contact Email Id Already Exist');
            }
        }
    }
    //Scenario 4: While Creating Contact record Check if we have any existing contact or lead record with same emailId.if exists then show duplicate error.
    public static void validateEmailInLeadAndContact(List<Contact> newConList){
        Set<String> emailSet = new Set<String>();
        for(Contact con : newConList){
            if(con.email != null){
                emailSet.add(con.Email);
            }
        }
        Set<String> duplicateEmailSetInContact = new Set<String>();
        List<Contact> conList = [Select Id,Email From Contact where Email IN : emailSet];
        for(Contact c : conList){
            duplicateEmailSetInContact.add(c.Email);
        }
        System.debug('--1--'+duplicateEmailSetInContact);
        
        Set<String> duplicateEmailSetInLead = new Set<String>();
        List<Lead> leadList = [Select Id,Email From Lead where Email IN : emailSet];
        for(Lead l : leadList){
            duplicateEmailSetInLead.add(l.Email);
        }
        System.debug('--1--'+duplicateEmailSetInLead);
        
        for(Contact con : newConList){
            if(duplicateEmailSetInLead.contains(con.Email)){
                con.addError('Email Already Exists in Lead');
            }
            else if(duplicateEmailSetInContact.contains(con.Email)){
                con.addError('Email Already Exists in Contact');
            }
        }     
    }
    //Scenario: Recursion in Apex.....
    public static void createRelatedAccount(List<Contact> newConList){
        List<Account> accList = new List<Account>();
        
        for(Contact con : newConList){
            Account acc = new Account();
            acc.Name = con.LastName;
            accList.add(acc);
        }
        if(accList.size()>0){
            insert accList;
        }
    }
    
    //Task 2: If we have Contact Record, create a account record and relate it with contact...
    //For Before Insert Event......
    public static void createRelatedAccounts(List<Contact> newConList){
        List<Account> accList = new List<Account>();
        
        for(Contact con : newConList){
            Account acc = new Account();
            acc.Name = con.LastName;
            accList.add(acc);
        }
        // Insert the Account records....
        insert accList;
        
        // Relate the contacts to the newly created account records(Using Map)....
        Map<String,Id> accMap = new Map<String,Id>();
        for(Account acc : accList){
            accMap.put(acc.Name,acc.Id);
        }
        for(Contact con : newConList){
            con.AccountId = accMap.get(con.LastName);
        }
    }
    
    //Scenario 5:- Whenever a new contact is created for account update the corresponding account phone with the new contact phone field.
    public static void updateAccountPhone(List<Contact> newConList, Map<Id,Contact> oldConMap){
        List<Account> accList = new List<Account>();
        for(Contact con : newConList){
            if(con.AccountId != null && con.Phone != null && con.Phone != oldConMap.get(con.Id).Phone){
                Account ac = new Account();
                ac.Id = con.AccountId;
                ac.Phone = con.Phone;
                accList.add(ac);
            }
        }
        update accList;
    }
    
    //Scenario 4:-
    public static void updateCustomerAccountBalance(List<Contact> newConList){
        Set<Id> accIdSet = new Set<Id>();
        Map<Id,Account> accountMap = new Map<Id,Account>();
        
        if(!newConList.isEmpty()){
            for(Contact con : newConList){
                if(con.AccountId != null){
                    accIdSet.add(con.AccountId);
                }
            }
        }
        if(!accIdSet.isEmpty()){
            List<Account> accList = [Select Id,Name,Balance__c From Account Where Id IN : accIdSet];
            for(Account ac : accList){
                accountMap.put(ac.Id,ac);
            }
        }
        if(!accountMap.isEmpty()){
            for(Contact con : newConList){ 
                Account acc = accountMap.get(con.AccountId);
                acc.Id = con.AccountId;
                if(con.Transaction_Type__c == 'Deposit'){
                    acc.Balance__c = acc.Balance__c + con.Amount__c;
                }
                else if(con.Transaction_Type__c == 'Withdraw'){
                    acc.Balance__c = acc.Balance__c - con.Amount__c;
                }
                else if(acc.Balance__c < 0){
                    acc.addError('Insufficient Balance');
                }
                accountMap.put(con.AccountId,acc);
            }
        }
        if(accountMap.values().size() > 0){
            update accountMap.values();
        }
    }
    //***Task 5:When a Account related Contact have unique Email then before creating another Contact with same email on same Account
    // user should get an error, while another Account related Contacts Can have that unique Email....
    public static void uniqueEmailForAccount(List<Contact> newConList) {
        Set<Id> accIdSet = new Set<Id>();
        for (Contact ct : newConList) {
            if (ct.AccountId != null) {
                accIdSet.add(ct.AccountId);
            }
        }
        //Map to Store AccountIds w.r.t Related Contacts Email in Set<String>......
        Map<Id, Set<String>> accConEmailMap = new Map<Id, Set<String>>();
        // Collect Account Ids and their associated Contact emails in Map
        for(Contact con : [Select Id,Email From Contact WHERE AccountId IN : accIdSet]){
            if(accConEmailMap.containsKey(con.AccountId)){
                accConEmailMap.get(con.AccountId).add(con.email);
            }
            else{
                Set<String> emailSet = new Set<String>();
                emailSet.add(con.Email);
                accConEmailMap.put(con.AccountId,emailSet);
            }
        }
        
        // Check for unique emails of Contact within their related Accounts
        for(Contact c : newConList){
            if(accConEmailMap.get(c.AccountId).contains(c.Email)){
                c.addError('Email already exists for another Contact in the same Account.');
            }
        }
    }
    //Task 6:-Check for Single Primary Contact on Account, while before creating new contact on account,if that Contact is primary_contact__c then, 
    //User should get error i.e ('There is Already a primary Contact on this Account).(both while before insert,before update).....
    public static void checkPrimaryContact(List<Contact> newConList,Map<Id,Contact> oldConMap){
        Set<Id> accIdSet = new Set<Id>();
        Map<Id,List<Contact>> conCountMap = new Map<Id,List<Contact>>();
        
        if(!newConList.isEmpty()){
            for(Contact newCon : newConList){
                if(oldConMap != null){
                    //System.debug('--1--'+oldConMap);
                    //When Contact Parent Account is Updated....
                    if(newCon.AccountId != oldConMap.get(newCon.Id).AccountId){
                        accIdSet.add(oldConMap.get(newCon.Id).AccountId);
                        accIdSet.add(newCon.AccountId);
                    }
                    //When Any Other Field of Contact is Updated...
                    else{
                        accIdSet.add(newCon.AccountId);
                    }
                }
                //when Any New Contacts is inserted...
                else{
                    accIdSet.add(newCon.AccountId);
                }
            }
        }
        if(!accIdSet.isEmpty()){
            List<Contact> conList = [Select Id,AccountId,Primary_Contact__c From Contact Where AccountId IN : accIdSet AND Primary_Contact__c = true];
            //System.debug('--2--'+conList);
            for(Contact ct : conList){
                conCountMap.put(ct.AccountId,conList);
            }
            //System.debug('--3--'+conCountMap);
            for(Contact con : newConList){
                if(con.Primary_Contact__c == true && conCountMap.containsKey(con.AccountId) && conCountMap.get(con.AccountId).size() > 0){
                    con.addError('This Account Already Have Primary Contact.');
                }
            }
        }
    }
    //Task 10: When newly Created Contact and its related Account Phone are Same then mark that Contact as primary Contact...
    public static void checkPhoneAndMarkPrimary(List<Contact> newConList){
        Set<Id> accIdSet = new Set<Id>();
        Map<Id,Account> accMap = new Map<Id,Account>();
        
        for(Contact con : newConList){
            if(con.AccountId != null && con.Phone != null){
                accIdSet.add(con.AccountId);
            }
        }
        if(!accIdSet.isEmpty()){
            for(Account ac : [Select Id,Phone From Account Where Id IN : accIdSet AND Phone != null]){
                accMap.put(ac.Id,ac);
            }
        }
        for(Contact con : newConList){
            if(accMap.containsKey(con.AccountId) && con.Phone == accMap.get(con.AccountId).Phone){
                con.Primary_Contact__c = true;
            }
        }
    }
    //***Task 7: When the previous Account related Contact field Primary_Contact__c == true,and we are inserting new contact with Primary_Contact__c = true
    //make that previous Contact Primary_Contact__c = false, also if there is no Contact with Primary_Contact__c == true on related Account,
    //then make that first created or Modified contact as Primary_Contact__c....

    public static void validatePrimaryContact(List<Contact> newConList){
        Set<Id> accIdSet = new Set<Id>();
        Map<Id,List<Contact>> conMap = new Map<Id,List<Contact>>();
        Set<Id> accConSet = new Set<Id>();
        List<Contact> conListToUpdate = new List<Contact>();
        
        if(!newConList.isEmpty()){
            for(Contact con : newConList){
                if(con.Primary_Contact__c == true){
                    accIdSet.add(con.AccountId);
                    //System.debug('--1--'+accIdSet);
                }
            }
        }
        if(!accIdSet.isEmpty()){
            List<Contact> exConList = [Select Id,AccountId,Primary_Contact__c From Contact Where AccountId IN : accIdSet
                                       AND Primary_Contact__c = true ORDER BY CreatedDate ASC];
            //System.debug('--2--'+exConList);
                for(Contact ct : exConList){
                    conMap.put(ct.AccountId, new List<Contact>());
                    // System.debug('--3--'+conMap);
                }
                for(Contact con : newConList){
                    if(con.Primary_Contact__c == true){
                        for(Contact ct : conMap.get(con.AccountId)){
                            //System.debug('--4--'+ct);
                            if(con.Id != ct.Id){
                                con.Primary_Contact__c = false;
                                conListToUpdate.add(con);
                                accConSet.add(con.AccountId);
                            }
                        }
                    }
                }
                for(Id ids : conMap.keySet()){
                    // System.debug('--5--'+ids);
                    if(!accConSet.contains(ids)){
                        Contact c = conMap.get(ids)[0];
                       // System.debug('--6--'+conMap.get(ids)[0]);
                        c.Primary_Contact__c = true;
                        conListToUpdate.add(c);
                    }
                }
                if(!conListToUpdate.isEmpty()){
                    update conListToUpdate;
                }
            }
        }
    
    //Task 8: Rollup Summary of Target Amount of Contacts based on Region on Account Custom Field Region Target Amount...
    public static void rollUpTargetRegionAmount(List<Contact> newConList, Map<Id,Contact> oldConMap){
        Set<Id> accIdSet = new Set<Id>();
        List<Account> accListToUpdate = new List<Account>();
        
        if(!newConList.isEmpty()){
            for(Contact newCon : newConList){
                //System.debug('--1--'+oldConMap);
                if(oldConMap != null)
                {
                    Contact oldCon = oldConMap.get(newCon.Id);
                    if(newCon.AccountId != oldCon.AccountId)
                    {
                        accIdSet.add(oldCon.AccountId);
                        accIdSet.add(newCon.AccountId);
                    }
                    else if(newCon.Region__c != oldCon.Region__c)
                    {
                        accIdSet.add(newCon.AccountId);
                    }
                }
                else{
                    accIdSet.add(newCon.AccountId);
                }
            }
        }
        if(!accIdSet.isEmpty()){
            List<Account> accList = [Select Id,USA_Target__c,Europe_Target__c,Asia_Target__c,
                                     (Select Id,AccountId,Target_Amount__c,Region__c From Contacts)From Account Where Id IN : accIdSet];
            //System.debug('--1--'+accList);
            for(Account ac : accList){
                Decimal targetAmountUS = 0;
                Decimal targetAmountEU = 0;
                Decimal targetAmountAS = 0;
                
                for(Contact ct : ac.Contacts){
                    if(ct.Region__c == 'USA'){
                        targetAmountUS = targetAmountUS + ct.Target_Amount__c;
                    }
                    else if(ct.Region__c == 'Europe'){
                        targetAmountEU = targetAmountEU + ct.Target_Amount__c;
                    }
                    else if(ct.Region__c == 'Asia'){
                        targetAmountAS = targetAmountAS + ct.Target_Amount__c;
                    }
                }
                ac.USA_Target__c = targetAmountUS;
                ac.Europe_Target__c = targetAmountEU;
                ac.Asia_Target__c = targetAmountAS;
                accListToUpdate.add(ac);
            }
            if(!accListToUpdate.isEmpty()){
                update accListToUpdate;
            }
        }
    }
    //RollUp Summary By Using Map..
    public static void rollUpTargetRegionAmountUsingMap(List<Contact> newConList,Map<Id,Contact> oldConMap){
        Set<Id> accIdSet = new Set<Id>();
        Map<Id,Decimal>usaRegionMap = new Map<Id,Decimal>();
        Map<Id,Decimal>europeRegionMap = new Map<Id,Decimal>();
        Map<Id,Decimal>asiaRegionMap = new Map<Id,Decimal>();
        Map<Id,Account> accMapToUpdate = new Map<Id,Account>();
        
        if(!newConList.isEmpty()){
            for(Contact newCon : newConList){
                //System.debug('--1--'+oldConMap);
                if(oldConMap != null)
                {
                    Contact oldCon = oldConMap.get(newCon.Id);
                    if(newCon.AccountId != oldCon.AccountId)
                    {
                        accIdSet.add(oldCon.AccountId);
                        accIdSet.add(newCon.AccountId);
                    }
                    else if(newCon.Region__c != oldCon.Region__c)
                    {
                        accIdSet.add(newCon.AccountId);
                    }
                }
                else
                {
                    accIdSet.add(newCon.AccountId);
                }
            }
        }
        if(!accIdSet.isEmpty()){
            for(Account acc : [Select Id,USA_Target__c,Europe_Target__c,Asia_Target__c,
                               (Select Id,AccountId,Region__c,Target_Amount__c From Contacts)From Account Where Id IN : accIdSet])
            {
                // System.debug('--2--'+acc);
                usaRegionMap.put(acc.Id,0);
                europeRegionMap.put(acc.Id,0);
                asiaRegionMap.put(acc.Id,0);
                
                for(Contact c : acc.Contacts)
                {
                    if(c.Region__c == 'USA'){
                        usaRegionMap.put(acc.Id, usaRegionMap.get(c.AccountId) + c.Target_Amount__c);
                    }
                    else if(c.Region__c == 'Europe'){
                        europeRegionMap.put(acc.Id,	europeRegionMap.get(c.AccountId) + c.Target_Amount__c);
                    }
                    else if(c.Region__c == 'Asia'){
                        asiaRegionMap.put(acc.Id, asiaRegionMap.get(c.AccountId) + c.Target_Amount__c);
                    }
                    // System.debug('--3--'+usaRegionMap);
                    // System.debug('--4--'+europeRegionMap);
                    // System.debug('--5--'+europeRegionMap);
                }
                
                acc.USA_Target__c = usaRegionMap.get(acc.Id);
                acc.Europe_Target__c = europeRegionMap.get(acc.Id);
                acc.Asia_Target__c = asiaRegionMap.get(acc.Id);
                
                accMapToUpdate.put(acc.Id,acc);
            }
            if(!accMapToUpdate.isEmpty()){
                update accMapToUpdate.values();
            }
        }  
    }
    //Task 10 : RollupSummary of Total No of Contacts on Related Account Custom Field(No_of_Contacts__c).....
    public static void rollupCount(List<Contact> newConList, Map<Id,Contact> oldConMap){
        Set<Id> accIdSet = new Set<Id>();
        List<Account> accListToUpdate = new List<Account>();
        
        if(!newConList.isEmpty()){
            for(Contact newCon : newConList){
                if(oldConMap !=  null){
                    if(newCon.AccountId != null && newCon.AccountId != oldConMap.get(newCon.Id).AccountId){
                        accIdSet.add(oldConMap.get(newCon.Id).AccountId);
                        accIdSet.add(newCon.AccountId);
                    }
                    else{
                        accIdSet.add(newCon.AccountId);
                    }
                }
                else{
                    accIdSet.add(newCon.AccountId);
                }
            }
        }
        if(!accIdSet.isEmpty()){
            for(Account ac : [Select Id,No_of_Contacts__c,(Select Id From Contacts)From Account Where Id IN : accIdSet]){
                ac.No_of_Contacts__c = ac.Contacts.size(); 
                accListToUpdate.add(ac);
            }
        }
        if(!accListToUpdate.isEmpty()){
            update accListToUpdate;
        }
    }
}
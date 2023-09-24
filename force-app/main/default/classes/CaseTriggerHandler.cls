public class CaseTriggerHandler {
    public static void updateAccountPrimaryContactAndEvent(List<Case> newCaseList){
        Set<Id> accIdSet = new Set<Id>();
        Map<Id,Contact> conMap = new Map<Id,Contact>();
        List<Event> eventList = new List<Event>();
        
        if(!newCaseList.isEmpty()){
            for(Case newCase : newCaseList){
                if(newCase.AccountId != null && String.isNotBlank(newCase.Subject)){
                    accIdSet.add(newCase.AccountId);
                }
            }
        }
        if(!accIdSet.isEmpty()){
            for(Contact con : [Select Id,AccountId,Primary_Contact__c From Contact Where AccountId IN : accIdSet AND
                               Primary_Contact__c = true ORDER BY LastModifiedDate Desc Limit 1])
            {
                conMap.put(con.AccountId,con);
            }
            if(!newCaseList.isEmpty()){
                for(Case csRec : newCaseList){
                    if(csRec.AccountId != null && csRec.ContactId == null && !conMap.isEmpty()){
                        Contact conRec = conMap.get(csRec.AccountId);
                        csRec.ContactId = conRec.Id;
                        
                        Datetime currentDateTime = Datetime.now();
                        Datetime startDateTime = currentDateTime.addDays(2);
                        Datetime endDateTime = startDateTime.addHours(2);
                        
                        Event ev = new Event();
                        ev.WhoId = conRec.Id;
                        ev.Subject = csRec.Subject;
                        ev.StartDateTime = startDateTime;
                        ev.EndDateTime = endDateTime;
                        eventList.add(ev);
                        
                        if(!eventList.isEmpty()){
                            insert eventList;
                        }
                    }
                    else if(csRec.AccountId != null && conMap.isEmpty()){
                        csRec.addError('There is no Primary Contact Present on Selected Account');
                    }
                }
            }
        }
        
    }
    
}
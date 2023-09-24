trigger AccountTrigger on Account (before insert,before update,before delete,after insert,after update,after delete,after undelete) {
    
    if(trigger.isBefore){
        if(trigger.isInsert){
            // AccountTriggerHandler.deleteAccountRelatedContact(trigger.new);
            // AccountTriggerHandler.avoidDuplicateNames(trigger.new);
            AccountTriggerHandler.createContactIfAccountNotExists(trigger.new);

            
            
        }
    }
    if(trigger.isAfter){
        if(trigger.isInsert){
            if(UtilityCls.isTriggerRun){
                UtilityCls.isTriggerRun = false;
               // AccountTriggerHandler.createRelatedContact(trigger.new);

            }
        }
    }
}
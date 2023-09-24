trigger ContactTrigger on Contact (before insert,before update,after insert,after update,before delete,after delete,after undelete) {
    
    if(trigger.isBefore){
        if(trigger.isInsert){
            // ContactTriggerHandler.validateLastName(trigger.new);
            // ContactTriggerHandler.updateEmail(trigger.new);
            // ContactTriggerHandler.validateEmail(trigger.new);
            // ContactTriggerHandler.validateEmailInLeadAndContact(trigger.new);
            // ContactTriggerHandler.createRelatedAccount(trigger.new);
            // ContactTriggerHandler.uniqueEmailForAccount(trigger.new);
            // ContactTriggerHandler.checkPrimaryContact(trigger.new,null);
            // ContactTriggerHandler.validatePrimaryContact(trigger.new);
            //  ContactTriggerHandler.checkPhoneAndMarkPrimary(trigger.new);
            
        }
        if(trigger.isUpdate){
            // ContactTriggerHandler.validateLastName(trigger.new);
            // ContactTriggerHandler.validateEmail(trigger.new);
            // ContactTriggerHandler.validateEmailInLeadAndContact(trigger.new);
            // ContactTriggerHandler.uniqueEmailForAccount(trigger.new);
            // ContactTriggerHandler.checkPrimaryContact(trigger.new,trigger.oldMap);
            //   ContactTriggerHandler.validatePrimaryContact(trigger.new);
            
            
            
            
        }
        if(trigger.isDelete){
            
        }
    }
    
    if(trigger.isAfter){
        if(trigger.isInsert){
            //ContactTriggerHandler.updateCustomerAccountBalance(trigger.new);
           // ContactTriggerHandler.updateAccountPhone(trigger.new,null);
            //To Avoid Recursion....
            /* if(UtilityCls.isTriggerRun){
UtilityCls.isTriggerRun = false;*/
            // ContactTriggerHandler.createRelatedAccount(trigger.new);
            // ContactTriggerHandler.rollUpTargetRegionAmountUsingMap(trigger.new,null);
            //   ContactTriggerHandler.rollupCount(trigger.new);
        }
    }
    if(trigger.isUpdate){
        System.debug('I am in After Update');
        ContactTriggerHandler.updateAccountPhone(trigger.new,trigger.oldMap);
        //  ContactTriggerHandler.rollUpTargetRegionAmountUsingMap(trigger.new,trigger.oldMap);
        
        
    }
    if(trigger.isDelete){
        //System.debug('I am in After Delete');
        // ContactTriggerHandler.rollupCount(trigger.new);
        
    }
    if(trigger.isUndelete){
        // System.debug('I am in After Undelete');
        //   ContactTriggerHandler.rollupCount(trigger.new);
        
    }
}
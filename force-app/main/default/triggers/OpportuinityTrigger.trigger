trigger OpportuinityTrigger on Opportunity (before insert) {
    if(trigger.isBefore && trigger.isInsert){
        OpportunityTriggerHandler.updateDiscountPrice(trigger.new);
    }
}
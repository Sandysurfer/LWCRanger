trigger CaseTrigger on Case (before insert) {
    CaseTriggerHandler.updateAccountPrimaryContactAndEvent(trigger.new);
}
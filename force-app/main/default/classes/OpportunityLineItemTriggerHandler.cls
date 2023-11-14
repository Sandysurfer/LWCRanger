public with sharing class OpportunityLineItemTriggerHandler {
  public static void updateAccountDescription(
    List<OpportunityLineItem> newOliList
  ) {
    Set<Id> oppIdSet = new Set<Id>();
    Map<Id, String> accMap = new Map<Id, String>();
    List<Account> accListToUpdate = new List<Account>();
    if (!newOliList.isEmpty()) {
      for (OpportunityLineItem oli : newOliList) {
        if (String.isNotBlank(oli.Description)) {
          oppIdSet.add(oli.opportunityId);
        }
      }
    }
    if (!oppIdSet.isEmpty()) {
      for (Opportunity opp : [
        SELECT
          Id,
          AccountId,
          (
            SELECT Description
            FROM OpportunityLineItems
            ORDER BY LastModifiedDate DESC
          )
        FROM Opportunity
        WHERE Id IN :oppIdSet
      ]) {
        if (!opp.OpportunityLineItems.isEmpty()) {
          if (String.isNotBlank(opp.OpportunityLineItems[0].Description)) {
            accMap.put(opp.AccountId, opp.OpportunityLineItems[0].Description);
          }
        } else {
          accMap.put(
            opp.AccountId,
            'There are no related Opportunitylineitems record Present'
          );
        }
      }
      for (Id accIds : accMap.keySet()) {
        Account acc = new Account();
        acc.Id = accIds;
        String latestDescription = accMap.get(accIds);
        if (String.isNotBlank(latestDescription)) {
          acc.Description = latestDescription;
          accListToUpdate.add(acc);
        }
      }
      if (!accListToUpdate.isEmpty()) {
        update accListToUpdate;
      }
    }
  }

  public static void countNoOfOpportunityLineItems(
    List<OpportunityLineItem> newOliList
  ) {
    Set<Id> oppIdSet = new Set<Id>();
    Map<Id, Decimal> oliMap = new Map<Id, Decimal>();
    List<Account> accListToUpdate = new List<Account>();

    if (!newOliList.isEmpty()) {
      for (OpportunityLineItem oli : newOliList) {
        oppIdSet.add(oli.opportunityId);
      }
    }
    if (!oppIdSet.isEmpty()) {
      for (Opportunity opp : [
        SELECT Id, AccountId
        FROM Opportunity
        WHERE Id IN :oppIdSet
      ]) {
        oliMap.put(opp.AccountId, 0);
      }
      //Using Aggregate Query to get the Count of OpportunityLineitems in Account Custom Field
      for (AggregateResult aggr : [
        SELECT Count(Id) oliCount, Opportunity.AccountId
        FROM OpportunityLineItem
        WHERE Opportunity.AccountId IN :oliMap.keySet() Group by Opportunity.AccountId
      ]) {
        oliMap.put((Id) aggr.get('AccountId'), (Decimal) aggr.get('oliCount'));
      }

      for (Id ids : oliMap.keySet()) {
        Account acc = new Account();
        acc.Id = ids;
        acc.NumberofLocations__c = oliMap.get(ids);
        accListToUpdate.add(acc);
      }
      if (!accListToUpdate.isEmpty()) {
        update accListToUpdate;
      }
    }
  }
}

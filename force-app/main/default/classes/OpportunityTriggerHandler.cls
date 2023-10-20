public class OpportunityTriggerHandler {
    
    public static void updateDiscountPrice(List<Opportunity> newOppList){
        for(Opportunity opp : newOppList){
            if(opp.Amount != null && opp.Discount__c != null){
                Decimal discount = (opp.Amount * opp.Discount__c)/100;
                Decimal discountedAmount = opp.Amount-discount;
                opp.Discounted_Price__c = discount;
                opp.Price_After_Discount__c = discountedAmount;
            }
        }
    }
    
}
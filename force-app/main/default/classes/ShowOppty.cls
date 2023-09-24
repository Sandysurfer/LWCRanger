public class ShowOppty {
    
    @auraEnabled(cacheable=true)
    public static List<Opportunity> getOppty(){
        List<Opportunity> oppList = [SELECT id, Name, StageName, Amount From Opportunity limit 20];
        return oppList;
    }

}
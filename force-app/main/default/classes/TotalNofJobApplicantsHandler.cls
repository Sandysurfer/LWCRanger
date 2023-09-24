public class TotalNofJobApplicantsHandler {
    
    public static void NoofApplicants(List<Job_Applicant__c> jobApplist){
        Set<Id> JobIds = new Set<Id>();
        for(Job_Applicant__c jobApp : jobApplist)
        {
            JobIds.add(jobApp.Job_Id__c);
        }
        
        List<Job_Applicant__c> RelatedjobApplicants = [SELECT Id,Job_Id__c FROM Job_Applicant__c where Job_Id__c IN : JobIds];
        Map<Id,Decimal> totaljobAppMap = new Map<Id,Decimal>();
        for(Job_Applicant__c jobApp : RelatedjobApplicants)
        {
            if(totaljobAppMap.containskey(jobApp.Job_Id__c))
            {
                Decimal NoofApplicants = totaljobAppMap.get(jobApp.Job_Id__c) + 1;
            }
            else
            {
                totaljobAppMap.put(jobApp.Job_Id__c,1);
            }
            
        }
        
        List<Job__c> joblist = new List<Job__c>();
        for(Id jobId : totaljobAppMap.keySet())
        {
            Job__c job = new Job__c();
            job.No_of_Applicants__c = totaljobAppMap.get(jobId);
            job.id = jobId;
            joblist.add(job);
        }
        
        update joblist;
    }
    
}
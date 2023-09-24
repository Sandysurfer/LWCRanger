public class QueueableWithConstructor implements Queueable {
 //Implementation of QueueableApex Class with the help of constructor and Passing Parameters through it....
    private List<Account>acclist;
    
    public QueueableWithConstructor(List<Account>accRecords){
        this.accList = accRecords;
    }
    
    public void execute(QueueableContext context){
        for(Account acc : acclist){
            acc.BillingState = 'New Jersey';
        }
        update acclist;
    }
    /*  Execute in Anonymous window.....
        List<Account> accList = [Select Id From Account Where BillingState = 'NY'];
        QueueableWithConstructor obj = new QueueableWithConstructor();
        Id jobId = System.enqueueJob(obj);
        
        Track the result.....
        AsyncApexJob jobdetails = [Select Id,Status,JobItemsProcessed From AsyncApexJob Where Id =: jobId];
        System.debug('Job Id '+jobdetails.Id);
        System.debug('Job Status '+jobdetails.Status);
   */

}
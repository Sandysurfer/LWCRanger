public class CallQueueable {
    
    public static void queueableExecute(){
        String consultantName;
        String consultantType;
        
        Id JobId = System.enqueueJob(new QueueableExample(consultantName, consultantType));        
        System.debug('JobId-->'+JobId);
    }
    /*Without Params....
      Id JobId = System.enqueueJob(new QueueableExample());
      System.debug('JobId-->'+JobId);
      System.debug('Data-->'+[Select Id,JobType,Status From AsyncApexJob Where Id =: JobId]);
   */
    
   /*With Params.....
     CallQueueable.queueableExecute();
     Id JobId = System.enqueueJob(new QueueableExample('Mukesh', 'Vendor'));
     System.debug('JobId-->'+JobId);
     System.debug('Data-->'+[Select Id,JobType,Status From AsyncApexJob Where  Id =: JobId]); 
  */
}
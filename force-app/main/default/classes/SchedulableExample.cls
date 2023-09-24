public class SchedulableExample implements Schedulable {

    public void execute(SchedulableContext sc){
        Consultant__c con = new Consultant__c ();
        con.Name = 'Test Schedule';
        con.Type__c = 'Contractor';
        insert con;
    }
}
        /* ---Schedule With Cron Exp And Execute......
          SchedulableExample pr = new SchedulableExample();
          String exp = '0 15 8 7 8 ?';
          System.schedule('InsertConsultant', exp , pr);
       */
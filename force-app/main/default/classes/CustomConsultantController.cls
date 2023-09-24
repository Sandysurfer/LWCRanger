public with sharing class CustomConsultantController {

    public PageReference SaveAndNew() {
        return null;
    }


    public Consultant__c con { get; set; }
    
    public customConsultantController(){
       con = new Consultant__c();
       con.ownerID = Userinfo.getUSerID();
    }
    public PageReference Save(){
       PageReference pnext = new PageReference('/apex/conCustomOutput?id='+con.id);
          pnext.setRedirect(true);
           return pnext;
           
           
          }
}
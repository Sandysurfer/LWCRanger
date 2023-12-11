public class CalloutToSalesforceOrg {   //Outbound Integration For Connecting two Salesforce Orgs
    
    public static void getAccounts(){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndPoint('callout:SFDCB/services/apexrest/AccountMgmt');
        request.setMethod('GET');
    
        HttpResponse response = http.send(request);
        //System.debug('Response'+response.getBody());
        //System.debug('Response Status'+response.getStatusCode());
        if(response.getStatusCode() == 200){
            List<Object> results = (List<Object>)JSON.deserializeUntyped(response.getBody());
            for(Object obj : results){
                //System.debug(obj);
                Map<String,Object> accountRecord = (Map<String,Object>) obj;
                System.debug(accountRecord.get('Industry'));
                
           /*2nd Way:-Converting JSON to Apex(Wrapper)
            *  List<AccountResponseHelper> accList = AccountResponseHelper.parse(response.getBody());
            for(AccountResponseHelper acc : accList){
                System.debug(acc);
            }*/
        
           }
        }
        else{
            System.debug('Error in Integration'+response.getBody());
        }
    }
}
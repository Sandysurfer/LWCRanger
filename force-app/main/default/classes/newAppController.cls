public with sharing class NewsAppController {
  @AuraEnabled
  public static void retriveNews() {
    NewsApiDetails__mdt newApiDetails = [
      SELECT Id, EndPoint__c, API_Key__c
      FROM NewsApiDetails__mdt
      WHERE DeveloperName = 'News_App_Integration'
      LIMIT 1
    ];
    HttpRequest request = new HttpRequest();
    HttpResponse response = new HttpResponse();

    try {
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}

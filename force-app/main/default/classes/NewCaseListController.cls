public with sharing class NewCaseListController {
   public List<Case> getNewCases()
    {
        List<Case> caselist = [Select CaseNumber from Case where status='New'];
        return caselist;
     }
}
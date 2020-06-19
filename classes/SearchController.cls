public with sharing class SearchController {
    
    @AuraEnabled(cacheable=true)
    public static List<sObject> getAccounts(String name, Integer numberOfRecords){
        
        String searchParam = '%' + name + '%';
        String query ='';
        Integer numRecords = 10;
        if(numberOfRecords != null ) numRecords = numberOfRecords;
        if(name !=null && name !=''){
            query = 'SELECT Id,Name,Phone,Fax FROM Account WHERE Name LIKE :searchParam LIMIT :numRecords';
        }
        else{
            query = 'SELECT Id,Name,Phone,Fax FROM Account LIMIT 10';
        }
        System.debug('Query = '+query);
        List<sObject> accRecords = Database.query(query);
        return accRecords;  
    }
    
}
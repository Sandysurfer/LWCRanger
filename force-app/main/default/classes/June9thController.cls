public class June9thController {

    @auraEnabled
    public static void createContact(String firstname, String lastname, String email, String phone, String accountId){
        contact con = new contact();
        con.firstname = firstname;
        con.lastname = lastname;
        con.email = email;
        con.phone = phone;
        con.AccountId = accountId;
        Insert con;
       
    }
}
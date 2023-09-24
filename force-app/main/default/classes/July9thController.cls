public class July9thController {
    
    @auraEnabled
    public static void createContact(String firstname, String lastname, String email, String phone){
        contact con = new contact();
        con.firstname = firstname;
        con.lastname = lastname;
        con.email = email;
        con.phone = phone;
        Insert con;
    }
}
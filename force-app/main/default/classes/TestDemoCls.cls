public class TestDemoCls {
    
    String Name;
    //Maths Additon...
    public TestDemoCls(){
        name = 'CI';
    }
    public integer addition(integer n1, integer n2){
        return n1+n2;
    }
    //Create Contact Method...
    public static contact createContact(String firstName, String lastName){
        Contact c = new Contact();
        c.FirstName = firstName;
        c.LastName = lastName;
        insert c;
        return c;
    }
}
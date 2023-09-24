@isTest
public class TestDemoClsTest {
    //Maths Addition Test....
    @isTest
    public static void additionTest(){
        TestDemoCls cls = new TestDemoCls();
        integer result = cls.addition(10,20);
        System.assertEquals(30, result);
    }
    //Create Contact Method Test....
    @isTest
    public static void createContactTest() {
        TestDemoCls cls = new TestDemoCls();
        Contact con = new Contact();
        Contact c = TestDemoCls.createContact('Raj','Kumar');
        System.Assert(c.Id != null);
        
    }
}
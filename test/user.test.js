const mongoose = require("mongoose");
const Customer = require("../models/customerModel");
const url =
  "mongodb://127.0.0.1:27017/baggie";

beforeAll(async () => {
 
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
  describe("Testing register schema", () => {
    //the code below is for insert testing
    it("Add user testing", () => {
      const customerData = {
        firstname: "govinda",
        lastname: "shrestha",
        number: "9825",
        email: "govinda@gmail.com",
        password: "govinda",
        picture: "customers",
        
      };
      return Customer.create(customerData).then((customer_ret) => {
        expect(customer_ret.firstname).toEqual("govinda");
      });
    });


    //testing if the update is working
    it("Updating the user testing", async () => {
      const status = await Customer.updateOne(
        { firstname: "govinda" },
        {
          firstname: "hari",
          lastname: "kumar",
        }
      );
      expect(status.ok);
    });
    // delete testing;
    it("Deleting the user teting", async () => {
      const status = await Customer.findOneAndDelete({ firstname: "hari" });
      expect(status.ok);
    });
});

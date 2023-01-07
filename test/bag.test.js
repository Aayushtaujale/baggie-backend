const mongoose = require("mongoose");
const Bag = require("../models/bagModel");
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
  describe("Testing bag schema", () => {
    //the code below is for insert testing
    it("Add bag testing", () => {
      const bagData = {
        name: "side",
        price: "2000",
        description: "only 2",
        image: "bagbag",
        
      };
      return Bag.create(bagData).then((bag_ret) => {
        expect(bag_ret.name).toEqual("side");
      });
    });
    //testing if the update is working
    it("Updating the bag testing", async () => {
      const status = await Bag.updateOne(
        { name: "side" },
        {
          name: "hand bag",
          price: "5000",
        }
      );
      expect(status.ok);
    });
    // delete testing;
    it("Deleting the bag teting", async () => {
      const status = await Bag.findOneAndDelete({ name: "hand bag" });
      expect(status.ok);
    });
    //the below code is for update testing here
  });
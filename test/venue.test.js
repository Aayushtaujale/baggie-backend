const mongoose = require("mongoose");
const Venue = require("../models/venueModel");
const url =
  "mongodb://127.0.0.1:27017/restaurantbooking";

beforeAll(async () => {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
  describe("Testing venue schema", () => {
    //the code below is for insert testing
    it("Add user testing", () => {
      const venueData = {
        name: "testvenue",
        address: "kathmandu",
        phone: "testvenue",
        email: "testvenue@gmail.com",
        password: "testvenue",
        picture: "venue",
        userId: "62afed9ab8b7fe21be54ac4f",
      };
      return Venue.create(venueData).then((venue_ret) => {
        expect(venue_ret.name).toEqual("testvenue");
      });
    });
    //testing if the update is working
    it("Updating the user testing", async () => {
      const status = await Venue.updateOne(
        { name: "testvenue" },
        {
          name: "testvenue1",
          address: "pokhara",
        }
      );
      expect(status.ok);
    });
    // delete testing;
    it("Deleting the user teting", async () => {
      const status = await Venue.findOneAndDelete({ name: "testvenue1" });
      expect(status.ok);
    });
    //the below code is for update testing here
  });
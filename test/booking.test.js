const mongoose = require("mongoose");
const Booking = require("../models/bookingModel");
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
  describe("Testing venue schema", () => {
    //the code below is for insert testing
    it("Add user testing", () => {
      const bookingData = {
        userId: "62afed9ab8b7fe21be54ac4f",
        name: "shrestha",
        address: "Chitwan",
        number: "50",
        image:"image",
        
      };
      return Booking.create(bookingData).then((booking_ret) => {
        expect(booking_ret.number).toEqual("50");
      });
    });
    //testing if the update is working
    it("Updating the user testing", async () => {
      const status = await Booking.updateOne(
        { number: "984141" },
        {
          number: "9851",
          address: "Lumbini",
        }
      );
      expect(status.ok);
    });
    // delete testing;
    it("Deleting the user teting", async () => {
      const status = await Booking.findOneAndDelete({ number: "9851" });
      expect(status);
    });
    //the below code is for update testing here
  });
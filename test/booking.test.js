const mongoose = require("mongoose");
const Booking = require("../models/bookingModel");
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
      const bookingData = {
        userId: "62afed9ab8b7fe21be54ac4f",
        venueid: "shrestha",
        date: "2012/12/30",
        numberofseats: "50",
        
      };
      return Booking.create(bookingData).then((booking_ret) => {
        expect(booking_ret.date).toEqual("2012/12/30");
      });
    });
    //testing if the update is working
    it("Updating the user testing", async () => {
      const status = await Booking.updateOne(
        { date: "2012/12/30" },
        {
          date: "2022/7/26",
          numberofseats: "26",
        }
      );
      expect(status.ok);
    });
    // delete testing;
    it("Deleting the user teting", async () => {
      const status = await Booking.findOneAndDelete({ date: "2022/7/26" });
      expect(status.ok);
    });
    //the below code is for update testing here
  });
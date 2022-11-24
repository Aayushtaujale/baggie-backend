const mongoose = require("mongoose");
const Category = require("../models/categoryModel");
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
  describe("Testing category schema", () => {
    //the code below is for insert testing
    it("Add category testing", () => {
      const categoryData = {
        categoryName: "ABC",
        categoryDetails: "HIIIIIIIIII",
        categoryImage: "bag",
        
        
      };
      return Category.create(categoryData).then((category_ret) => {
        expect(category_ret.categoryName).toEqual("ABC");
      });
    });
    //testing if the update is working
    it("Updating the category testing", async () => {
      const status = await Category.updateOne(
        { categoryName: "ABC" },
        {
            categoryName: "hello",
          
        }
      );
      expect(status.ok);
    });
    // delete testing;
    it("Deleting the category teting", async () => {
      const status = await Category.findOneAndDelete({ categoryName: "hello" });
      expect(status.ok);
    });
    //the below code is for update testing here
  });
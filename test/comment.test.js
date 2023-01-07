const mongoose = require("mongoose");
const Comment = require("../models/commentModel");
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
  describe("Testing comment schema", () => {
    //the code below is for insert testing
    it("Add user testing", () => {
      const commentData = {
          comment: "nice one actually",
          bagId: "63b486ab08ecb91ca626e935",
        customerId: "63b484ba08ecb91ca626e932",
       
        
      };
      return Comment.create(commentData).then((comment_ret) => {
        expect(comment_ret.comment).toEqual("nice one actually");
      });
    });
    
  });
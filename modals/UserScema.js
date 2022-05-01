const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
      type: String,
      required:true
    },
    lastName: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    id:{
      type:String,
      required:true
    }
  });

  module.exports.userSchema = mongoose.model('Users',userSchema,'Users');
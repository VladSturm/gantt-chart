const mongoose = require("mongoose")

const Schema = mongoose.Schema

let Owner = new Schema({
  OwnerName: {
    type : String
  }
  },{
      collection: 'owner'
  });

  module.exports = mongoose.model('Owner', Owner)
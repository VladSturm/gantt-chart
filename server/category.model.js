const mongoose = require("mongoose")

const Schema = mongoose.Schema

let Category = new Schema({
    start: {
        type : String
      },
    end: {
        type : String
    },
    label: {
        type : String
    },

    
  },{
      collection: 'category'
  });

  module.exports = mongoose.model('Category', Category)
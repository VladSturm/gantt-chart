const mongoose = require("mongoose")

const Schema = mongoose.Schema

let Chart = new Schema({
  TaskName: {
    type : String
  },
  OwnerName: {
    type : String
  },
  StartDate: {
    type : String
  },
  EndDate: {
    type : String
  }
  
  
  
  
  
  
    
  },{
      collection: 'chart',
      autoIndexId: false
  });

  module.exports = mongoose.model('Chart', Chart)
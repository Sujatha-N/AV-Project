const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var vehicleSchema = new Schema({
  vid: {type: String, required: true},
  email:{type: String, required: true},
  vcolor: {type: String, required: true},
  vmake: {type: String, required: true},
  vmodel: {type: String, required: true},
  vmileage: {type: String, required: true},
  vpassengerspace: {type: String, required: true},
  vservicestatus: {type: String, required: true},
  vcurrentstatus: {type: String, required: true},
  location:{type: String, required: true},
  roadservice: {type: String, required: true}
},
{
  versionKey: false
});

const vehicle = mongoose.model('vehicle',vehicleSchema);
module.exports = vehicle;


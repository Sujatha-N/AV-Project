const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var rideSchema = new Schema({
    email: {type: String, required: true},
    vId: {type: String, required: true},
    Origin:{type:String, required:false},
    Passengers:{type:String, required:false},
    Destination:{type:String, required:false},
    Datetime:{type:Date, default: Date.now}
},
{
    versionKey: false
});

const ride = mongoose.model('ride', rideSchema);
module.exports = ride;


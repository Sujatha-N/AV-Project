const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSubscriptionSchema = new Schema({
    email : {type: String, required: true},
    startDate: {type: String, required: true},
    endDate: {type: String, required: true},
    amount: {type:String, required:true},
    tag:{type:String, required:true}
},
{
    versionKey: false
});

const userSubscription = mongoose.model('userSubscription', userSubscriptionSchema);
module.exports = userSubscription;

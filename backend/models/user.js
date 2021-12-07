const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    name : {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    isadmin:{type:Boolean, default:false, required:false}
},
{
    versionKey: false
});

const user = mongoose.model('user', userSchema);
module.exports = user;


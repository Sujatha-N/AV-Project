const mongoose = require("mongoose");

// const orderLocation = new mongoose.Schema({
//     restaurant: {
//         type: String,
//         required: true
//     },
//     delivery: {
//         type: String,
//         required: true
//     }
// })

// module.exports.orderLocation = mongoose.model("orderLocation", orderLocation);

// const orderStatus = new mongoose.Schema({
//     status: {
//         type: Number,
//         required: true
//     }
// }) 

//module.exports.orderStatus = mongoose.model("orderStatu", orderStatus)

const orderTemplate = new mongoose.Schema({
    source_location:{
        type: String,
        required: true,
    },
    destination_location:{
        type: String,
        required: true,
    },
    status:{
        type: Number,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("order", orderTemplate);
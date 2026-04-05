const mongoose = require('mongoose');
const order = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "users",
    },
    books: 
        {
            type: mongoose.Types.ObjectId,
            ref: "books",
        },
    status : {
            type: String,
            enum: ["order placed", "order shipped", "out for delivery", "order cancelled"],
            default: 'order placed'
        },
    
    
},
{ timestamps: true });

module.exports = mongoose.model("order", order);

const mongoose = require('mongoose');
const { Schema } = mongoose
const orderSchema = new Schema({

},
    { timestamps: true })
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
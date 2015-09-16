//
// Create Orders Schema
//

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrderSchema = new Schema({
    customerName: String,
    customerPhone: String,
    customerAddress: String,
    dateOrdered: Number,
    deliveryCharge: Number,
    total: Number,
    notax: Number,
    tax: Number,
    orderItems: [{
      crust: String,
      size: String,
      toppings: String,
      qty: Number,
      subtotal: Number
    }]
});

module.exports = mongoose.model('Order', OrderSchema, 'orders');
const mongoose = require("mongoose");

const CheckoutSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    status: {type: String, required: true},
    timeChackin: {type: String, required: true},
  },
  {timestamps: true}
);

const Checkout = mongoose.model("checkout", CheckoutSchema);

module.exports = {Checkout};
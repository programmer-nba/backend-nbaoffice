const mongoose = require("mongoose");

const CheckinSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    status: {type: String, required: true},
    timeChackin: {type: String, required: true},
  },
  {timestamps: true}
);

const Checkin = mongoose.model("checkin", CheckinSchema);

module.exports = {Checkin};
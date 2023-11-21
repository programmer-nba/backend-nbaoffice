const mongoose = require("mongoose");
const Joi = require("joi");

const TimeworkSchema = new mongoose.Schema({
  name: {type: String, required: true},
  lastname: {type: String, required: true},
  level: {type: String, required: false},
  position: {type: String, required: false},
  department: {type: String, required: false},
  checkin: {type: String, required: true},
  time_checkin: {type: String, required: false},
  checkout: {type: String, required: false, default: "-"},
  time_checkout: {type: String, required: false, default: "-"},
});

const Timeworks = mongoose.model("timework", TimeworkSchema);

const validateTimework = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("invalid name"),
    lastname: Joi.string().required().label("invalid lastname"),
    position: Joi.string().required().label("invalid position"),
    department: Joi.string().required().label("invalid department"),
  });
  return schema.validate(data);
};

module.exports = {Timeworks, validateTimework};

const mongoose = require("mongoose");
const Joi = require("joi");

const AdminSchema = new mongoose.Schema({
  admin_name: {type: String, required: true},
  admin_lastname: {type: String, required: false},
  admin_phone: {type: String, required: false},
  admin_username: {type: String, require: false},
  admin_password: {type: String, require: false},
  admin_position: {type: String, require: false},
  admin_status: {type: String, require: false},
  admin_start: {type: Date, require: false},
});

const Admins = mongoose.model("admin", AdminSchema);

const validateAdmin = (data) => {
  const schema = Joi.object({
    admin_name: Joi.string().required().label("invalid name"),
    admin_lastname: Joi.string().required().label("invalid lastname"),
    admin_phone: Joi.string().required().label("invalid phone"),
    admin_username: Joi.string().required().label("invalid usernamne"),
    admin_password: Joi.string().required().label("invalid password"),
    admin_position: Joi.string().required().label("invalid position"),
  });

  return schema.validate(data);
};

module.exports = {Admins, validateAdmin};

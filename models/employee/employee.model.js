const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    level: {
      type: String,
      required: true,
      enum: ["admin", "employee", "manager", "owner"],
    },
    department: {
      type: String,
      required: true,
      enum: [
        "Programmer",
        "Marketing",
        "Financial",
        "Accounting",
        "IT",
        "Graphic",
      ],
    },
    email: {type: String},
    tel: {type: String},
    about_me: {type: String},
    line: {type: String},
    status: {type: String, required: true},
    avatar: {
      type: {
        url: {type: String, required: true},
        imageId: {type: String, required: true},
      },
    },
    address: {type: String, required: true},
    subdistrict: {type: String, required: true},
    district: {type: String, required: true},
    province: {type: String, required: true},
    postcode: {type: Number, required: true},
    bank: {
      name: {type: String, required: false, default: "-"},
      number: {type: String, required: false, default: "-"},
      image: {type: String, required: false, default: "-"},
      status: {type: Boolean, required: false, default: false},
      remark: {type: String, required: false, default: "-"}, // อยู่ระหว่างการตรวจสอบ, ไม่ผ่านการตรวจสอบ, ตรวจสอบสำเร็จ
    },
    iden: {
      number: {type: String, required: false, default: "-"},
      image: {type: String, required: false, default: "-"},
      status: {type: Boolean, required: false, default: false},
      remark: {type: String, required: false, default: "-"}, // อยู่ระหว่างการตรวจสอบ, ไม่ผ่านการตรวจสอบ, ตรวจสอบสำเร็จ
    },
  },
  {timestamps: true}
);

const validateLogin = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().label("invalid username"),
    password: Joi.string().required().label("invalid password"),
  });

  return schema.validate(data);
};

const validateUpdate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().allow("").label("invalid name"),
    lastname: Joi.string().required().allow("").label("invalid surname"),
    email: Joi.string().email().required().allow("").label("invalid email"),
    tel: Joi.string().required().allow("").label("invalid telephone number"),
    about_me: Joi.string().required().allow("").label("invalid about_me"),
    line: Joi.string().required().allow("").label("invalid line"),
  });

  return schema.validate(data);
};

const validateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("invalid name"),
    lastname: Joi.string().required().label("invalid lastname"),
    username: Joi.string().required().label("invalid usernamne"),
    password: Joi.string().required().label("invalid password"),
    level: Joi.string().required().label("invalid level"),
    department: Joi.string().required().label("invalid department"),
    email: Joi.string().email().required().allow("").label("invalid email"),
    tel: Joi.string().required().allow("").label("invalid telephone number"),
    address: Joi.string().required().label("invalid address"),
    subdistrict: Joi.string().required().label("invalid subdistrict"),
    district: Joi.string().required().label("invalid district"),
    province: Joi.string().required().label("invalid province"),
    postcode: Joi.number().required().label("invalid postcode"),
    status: Joi.string().required().label("invalid status"),
  });

  return schema.validate(data);
};

const User = mongoose.model("Users", userSchema);

module.exports = {User, validateUser, validateLogin, validateUpdate};

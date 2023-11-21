const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const EmployeeSchema = new mongoose.Schema({
  name: {type: String, required: true},
  lastname: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  position: {
    type: String,
    required: true,
    enum: ["employee", "manager", "owner"],
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
  timestamp: {type: String, required: false},
});

EmployeeSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      lastname: this.lastname,
      row: "Employee",
    },
    process.env.JWTPRIVATEKEY,
    {
      expiresIn: "4h",
    }
  );
  return token;
};

const validateEmployee = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("invalid name"),
    lastname: Joi.string().required().label("invalid lastname"),
    username: Joi.string().required().label("invalid usernamne"),
    password: Joi.string().required().label("invalid password"),
    position: Joi.string().required().label("invalid position"),
    department: Joi.string().required().label("invalid department"),
    email: Joi.string().email().required().allow("").label("invalid email"),
    tel: Joi.string().required().allow("").label("invalid telephone number"),
    address: Joi.string().required().label("invalid address"),
    subdistrict: Joi.string().required().label("invalid subdistrict"),
    district: Joi.string().required().label("invalid district"),
    province: Joi.string().required().label("invalid province"),
    postcode: Joi.number().required().label("invalid postcode"),
  });

  return schema.validate(data);
};

const Employees = mongoose.model("employee", EmployeeSchema);

module.exports = {Employees, validateEmployee};

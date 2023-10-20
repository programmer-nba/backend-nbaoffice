const {Checkin} = require("../models/checkin.model.js");
const {Checkout} = require("../models/checkout.model.js");
const {User} = require("../models/user.model.js");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dayjs = require("dayjs");

//Check In
module.exports.Checkin = async (req, res) => {
  try {
    const token = req.headers["token"];
    if (!token) {
      return res.status(403).send({message: "Invalid User"});
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, decoded) => {
      if (error) {
        return res.status(400).send({message: "Permission denied"});
      }
      const projection = {
        name: 1,
        surname: 1,
        username: 1,
        level: 1,
        department: 1,
        email: 1,
        tel: 1,
        about_me: 1,
        line: 1,
        avatar: 1,
        about_me: 1,
      };
      const user = await User.findById(decoded.user_id, projection);
      const data = {
        name: user.name,
        status: "เข้างาน",
        timeChackin: dayjs(Date.now()).format(),
      };

      const checkin = new Checkin(data);
      const new_checkin = await checkin.save();

      return res
        .status(200)
        .send({message: "User Check Out successfully", data: new_checkin});
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({message: "Internal Server Error", error: error.message});
  }
};

//Check Out
module.exports.Checkout = async (req, res) => {
  try {
    const token = req.headers["token"];
    if (!token) {
      return res.status(403).send({message: "Invalid User"});
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, decoded) => {
      if (error) {
        return res.status(400).send({message: "Permission denied"});
      }
      const projection = {
        name: 1,
        surname: 1,
        username: 1,
        level: 1,
        department: 1,
        email: 1,
        tel: 1,
        about_me: 1,
        line: 1,
        avatar: 1,
        about_me: 1,
      };
      const user = await User.findById(decoded.user_id, projection);
      const data = {
        name: user.name,
        status: "ออกงาน",
        timeChackin: dayjs(Date.now()).format(),
      };

      const checkout = new Checkout(data);
      const new_checkout = await checkout.save();

      return res
        .status(200)
        .send({message: "User Check Out successfully", data: new_checkout});
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({message: "Internal Server Error", error: error.message});
  }
};


//get check in
module.exports.GetCheckin = async (req, res) => {
  try {
    const permission = ["owner", "admin", "manager", "employee"];

    if (!permission.includes(req.user.level)) {
      return res.status(403).send({message: "Permission denied"});
    }
    
    const checkin = await Checkin.find();
    return res.status(200).send({message: "Get user successfully", data: checkin});
  } catch (error) {
    console.error(error);
    return res.status(500).send({message: "Internal Server Error"});
  }
};

//get check in
module.exports.GetCheckout = async (req, res) => {
  try {
    const permission = ["owner", "admin", "manager", "employee"];

    if (!permission.includes(req.user.level)) {
      return res.status(403).send({message: "Permission denied"});
    }
    
    const checkout = await Checkout.find();
    return res.status(200).send({message: "Get user successfully", data: checkout});
  } catch (error) {
    console.error(error);
    return res.status(500).send({message: "Internal Server Error"});
  }
};

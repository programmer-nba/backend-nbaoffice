const {User, validateLogin, validateUser} = require("../models/user.model.js");
const {TokenList} = require("../models/token.list.model.js");
const token_decode = require("../lib/token_decode.js");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dayjs = require("dayjs");

//get me
module.exports.Me = async (req, res) => {
  try {
    const token = req.headers["token"];
    if (!token) {
      return res.status(403).send({message: "Invalid User"});
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, decoded) => {
      if (error) {
        return res.status(400).send({message: "Permission denied"});
      }
      const user = await User.findOne({_id: decoded.user_id});
      return res.status(200).send({message: "Permission granted", data: user});
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({message: "Internal Server Error", error: error.message});
  }
};

//login
module.exports.Login = async (req, res) => {
  try {
    const {error} = validateLogin(req.body);
    if (error) {
      return res.status(403).send({
        message: "Data validation failed",
        error: error.details[0].message,
      });
    }
    const user = await User.findOne({username: req.body.username});
    if (!user) {
      return res.status(403).send({message: "User not found"});
    }
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isValidPassword) {
      return res.status(403).send({message: "Invalid password"});
    }
    const payload = {
      user_id: user._id,
      name: user.name,
      level: user.level,
      department: user.department,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "4H",
    });
    await new TokenList({
      id: user._id,
      token: token,
      timestamp: dayjs(Date.now()).format(),
    }).save();
    return res.status(200).send({message: "login successful", token: token});
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({message: "Internal Server Error", error: error.message});
  }
};

module.exports.logout = async (req, res) => {
  try {
    const token = token_decode(req.headers["token"]);
    const logout = await TokenList.deleteMany({id: token._id});
    if (logout) {
      return res.status(200).send({status: true, message: "ออกจากระบบสำเร็จ"});
    } else {
      return res.status(400).send({
        status: false,
        message: "ออกจากระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({message: "มีบางอย่างผิดพลาด"});
  }
};

//create employee
module.exports.Create = async (req, res) => {
  try {
    const permission = ["owner", "admin", "manager"];

    if (!permission.includes(req.user.level)) {
      return res.status(403).send({message: "Permission denied"});
    }

    const {error} = validateUser(req.body);

    if (error) {
      return res.status(403).send({
        message: "Data validation failed",
        error: error.details[0].message,
      });
    }

    //save user
    const password = await bcrypt.hash(req.body.password, 10);
    let userData = {
      name: req.body.name,
      lastname: req.body.lastname,
      username: req.body.username,
      password: password,
      level: req.body.level,
      department: req.body.department,
      email: req.body.email,
      address: req.body.address,
      subdistrict: req.body.subdistrict,
      district: req.body.district,
      province: req.body.province,
      postcode: req.body.postcode,
      status: req.body.status
    };

    const user = new User(userData);
    const newuser = await user.save();

    return res
      .status(200)
      .send({message: "User saved successfully", data: newuser});
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({message: "Internal server error", error: error.message});
  }
};

//get user
module.exports.GetUser = async (req, res) => {
  try {
    const permission = ["owner", "admin", "manager", "employee"];

    if (!permission.includes(req.user.level)) {
      return res.status(403).send({message: "Permission denied"});
    }
    
    const user = await User.find();
    return res.status(200).send({message: "Get user successfully", data: user});
  } catch (error) {
    console.error(error);
    return res.status(500).send({message: "Internal Server Error"});
  }
};

//delete
module.exports.Delete = async (req, res) => {
  try {
    const permission = ["owner", "admin", "manager"];

    if (!permission.includes(req.user.level)) {
      return res.status(403).send({message: "Permission denied"});
    }

    const result = await User.deleteOne({_id: req.params.id});

    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({message: "Internal server error", error: error.message});
  }
};


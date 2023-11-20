const {Admins, validateAdmin} = require("../../models/admin/admin.model.js");
const bcrypt = require("bcrypt");
const dayjs = require("dayjs");

module.exports.create = async (req, res) => {
  try {
    // const permission = ["owner", "admin", "manager"];

    // if (!permission.includes(req.user.level)) {
    //   return res.status(403).send({message: "Permission denied"});
    // }

    const {error} = validateAdmin(req.body);
    if (error) {
      return res.status(403).send({
        message: "Data validation failed",
        error: error.details[0].message,
      });
    }

    //save user
    const password = await bcrypt.hash(req.body.admin_password, 10);
    let userData = {
      admin_name: req.body.admin_name,
      admin_lastname: req.body.admin_lastname,
      admin_phone: req.body.admin_phone,
      admin_username: req.body.admin_username,
      admin_password: password,
      admin_position: req.body.admin_position,
      admin_status: true,
      admin_start: dayjs(Date.now()).format(""),
    };
    const admin = new Admins(userData);
    const new_admin = await admin.save();
    return res.status(200).send({
      status: true,
      message: "เพิ่มข้อมูลแอดมินสำเร็จ",
      data: new_admin,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({message: "Internal server error", error: error.message});
  }
};

module.exports.getAdminAll = async (req, res) => {
  try {
    const admin = await Admins.find();
    if (!admin) {
      return res
        .status(403)
        .send({status: false, message: "ดึงข้อมูลแอดมินไม่สำเร็จ"});
    } else {
      return res
        .status(200)
        .send({status: true, message: "ดึงข้อมูลแอดมินสำเร็จ", data: admin});
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({message: "Internal server error", error: error.message});
  }
};

module.exports.getAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await Admins.findById(id);
    if (!admin) {
      return res
        .status(403)
        .send({status: false, message: "ดึงข้อมูลแอดมินไม่สำเร็จ"});
    } else {
      return res
        .status(200)
        .send({status: true, message: "ดึงข้อมูลแอดมินสำเร็จ", data: admin});
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({message: "Internal server error", error: error.message});
  }
};

module.exports.updateAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.body) {
      return res
        .status(400)
        .send({status: false, message: error.details[0].message});
    }
    if (!req.body.admin_password) {
      const admin_new = await Admins.findByIdAndUpdate(id, req.body);
      if (!admin_new) {
        return res
          .status(400)
          .send({status: false, message: "ไม่สามารถแก้ไขผู้ใช้งานนี้ได้"});
      } else {
        return res.send({
          status: true,
          message: "แก้ไขข้อมูลผู้ใช้งานเรียบร้อย",
        });
      }
    } else {
      const hashPassword = await bcrypt.hash(req.body.admin_password, 10);
      const new_password = await Admins.findByIdAndUpdate(id, {
        ...req.body,
        admin_password: hashPassword,
      });
      if (!new_password) {
        return res.status(400).send({
          status: false,
          message: "ไม่สามารถแก้ไขรหัสผ่านผู้ใช้งานนี้ได้",
        });
      } else {
        return res.send({
          status: true,
          message: "แก้ไขข้อมูลผู้ใช้งานเรียบร้อย",
        });
      }
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({message: "Internal server error", error: error.message});
  }
};

module.exports.deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await Admins.findByIdAndDelete(id);
    if (!admin) {
      return res
        .status(403)
        .send({status: false, message: "ลบข้อมูลแอดมินไม่สำเร็จ"});
    } else {
      return res
        .status(200)
        .send({status: true, message: "ลบข้อมูลแอดมินสำเร็จ"});
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({message: "Internal server error", error: error.message});
  }
};

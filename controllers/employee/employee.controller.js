const {Employees, validateEmployee} = require("../../models/employee/employee.model");
const bcrypt = require("bcrypt");
const dayjs = require("dayjs");

module.exports.create = async (req, res) => {
  try {
    // const permission = ["owner", "admin", "manager"];

    // if (!permission.includes(req.user.level)) {
    //   return res.status(403).send({message: "Permission denied"});
    // }

    const {error} = validateEmployee(req.body);
    if (error) {
      return res.status(403).send({
        message: "Data validation failed",
        error: error.details[0].message,
      });
    }

    //save user
    const password = await bcrypt.hash(req.body.password, 10);
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

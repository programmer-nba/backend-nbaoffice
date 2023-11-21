const {Admins} = require("../models/admin/admin.model");
const {Employees} = require("../models/employee/employee.model");
const bcrypt = require("bcrypt");

exports.Login = async (req, res) => {
  try {
    let admin = await Admins.findOne({
      admin_username: req.body.username,
    });
    if (!admin) {
      await cheackEmployee(req, res);
    } else {
      const validPasswordAdmin = await bcrypt.compare(
        req.body.password,
        admin.admin_password
      );
      if (!validPasswordAdmin) {
        return res
          .status(404)
          .send({status: false, message: "Password is incorrect"});
      } else {
        const token = admin.generateAuthToken();
        const ResponesData = {
          name: admin.admin_name,
          lastname: admin.admin_lastname,
          username: admin.admin_username,
          phone: admin.admin_phone,
        };
        return res.status(200).send({
          status: true,
          message: "เข้าสู่ระบบสำเร็จ",
          token: token,
          data: ResponesData,
        });
      }
    }
  } catch (err) {
    return res
      .status(500)
      .send({status: false, message: "Internal Server Error"});
  }
};

const cheackEmployee = async (req, res) => {
  try {
    let employee = await Employees.findOne({
      username: req.body.username,
    });
    if (!employee) {
      return res
        .status(403)
        .send({status: false, message: "ไม่พบข้อมูลพนักงาน"});
    } else {
      const validPasswordEmployee = await bcrypt.compare(
        req.body.password,
        employee.password
      );
      if (!validPasswordEmployee) {
        return res
          .status(404)
          .send({status: false, message: "Password is incorrect"});
      } else {
        const token = employee.generateAuthToken();
        const ResponesData = {
          name: employee.name,
          lastname: employee.lastname,
          username: employee.username,
          phone: employee.tel,
          position: employee.position,
          department: employee.department,
        };
        return res.status(200).send({
          status: true,
          message: "เข้าสู่ระบบสำเร็จ",
          token: token,
          data: ResponesData,
        });
      }
    }
  } catch (err) {
    res.status(500).send({message: "Internal Server Error"});
  }
};

exports.me = async (req, res) => {
  try {
    const {decoded} = req;
    console.log("call me", decoded);
    if (decoded && decoded.row === "Admin") {
      const id = decoded._id;
      Admins.findOne({_id: id})
        .then((item) => {
          const data = {
            name: item.admin_name,
            lastname: item.admin_lastname,
            username: item.admin_username,
            level: "Admin"
          }
          return res.status(200).send({status: true, message: "Call Me Admin", data: data});
        })
        .catch(() =>
          res.status(400).send({message: "มีบางอย่างผิดพลาด", status: false})
        );
    } else if (decoded && decoded.row === "Employee") {
      const id = decoded._id;
      Employees.findOne({_id: id})
        .then((item) => {
          const data = {
            name: item.name,
            lastname: item.lastname,
            level: "Employee",
            position: item.position,
            department: item.department
          }
          return res.status(200).send({status: true, message: "Call Me Employee", data: data});
        })
        .catch(() =>
          res.status(400).send({message: "มีบางอย่างผิดพลาด", status: false})
        );
    }
  } catch (error) {
    res.status(500).send({message: "Internal Server Error", status: false});
  }
};

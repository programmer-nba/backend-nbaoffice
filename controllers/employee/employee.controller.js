const {
  Employees,
  validateEmployee,
} = require("../../models/employee/employee.model");
const bcrypt = require("bcrypt");
const dayjs = require("dayjs");

module.exports.create = async (req, res) => {
  try {
    const {decoded} = req;
    const id = decoded._id;
    Employees.findOne({_id: id}).then(async (item) => {
      const position = item.position;
      if (position === "owner" || position === "manager") {
        if (item.name === req.body.name) {
          return res.status(403).send({
            status: false,
            message: "ชื่อนี้มีอยู่ในระบบเรียบร้อยแล้ว",
          });
        } else {
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
            name: req.body.name,
            lastname: req.body.lastname,
            username: req.body.username,
            password: password,
            position: req.body.position,
            department: req.body.department,
            email: req.body.email,
            tel: req.body.tel,
            address: req.body.address,
            subdistrict: req.body.subdistrict,
            district: req.body.district,
            province: req.body.province,
            postcode: req.body.postcode,
            status: true,
            timestamp: dayjs(Date.now()).format(""),
          };
          const employee = new Employees(userData);
          const new_employee = await employee.save();
          return res.status(200).send({
            status: true,
            message: "เพิ่มข้อมูลพนักงานสำเร็จ",
            data: new_employee,
          });
        }
      }
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({message: "Internal server error", error: error.message});
  }
};

module.exports.getEmployeeAll = async (req, res) => {
  try {
    const {decoded} = req;
    const id = decoded._id;
    Employees.findOne({_id: id}).then(async (item) => {
      const position = item.position;
      if (position === "owner" || position === "manager") {
        const employee = await Employees.find();
        if (!employee) {
          return res
            .status(403)
            .send({message: "ดึงข้อมูลพนักงารไม่สำเร็จ", error: error.message});
        } else {
          return res.status(200).send({
            status: true,
            message: "ดึงข้อมูลพนักงานสำเร็จ",
            data: employee,
          });
        }
      }
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({message: "Internal server error", error: error.message});
  }
};

module.exports.getEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employees.findById(id);
    if (!employee) {
      return res
        .status(403)
        .send({message: "ดึงข้อมูลพนักงารไม่สำเร็จ", error: error.message});
    } else {
      return res.status(200).send({
        status: true,
        message: "ดึงข้อมูลพนักงานสำเร็จ",
        data: employee,
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({message: "Internal server error", error: error.message});
  }
};

module.exports.getEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employees.findById(id);
    if (!employee) {
      return res
        .status(403)
        .send({message: "ดึงข้อมูลพนักงารไม่สำเร็จ", error: error.message});
    } else {
      return res.status(200).send({
        status: true,
        message: "ดึงข้อมูลพนักงานสำเร็จ",
        data: employee,
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({message: "Internal server error", error: error.message});
  }
};

module.exports.updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.body) {
      return res
        .status(400)
        .send({status: false, message: error.details[0].message});
    }
    if (!req.body.admin_password) {
      const new_employee = await Employees.findByIdAndUpdate(id, req.body);
      if (!new_employee) {
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
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      const new_password = await Employees.findByIdAndUpdate(id, {
        ...req.body,
        password: hashPassword,
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

module.exports.deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employees.findByIdAndDelete(id);
    if (!employee) {
      return res
        .status(403)
        .send({status: false, message: "ลบข้อมูลพนักงานไม่สำเร็จ"});
    } else {
      return res
        .status(200)
        .send({status: true, message: "ลบข้อมูลพนักงานสำเร็จ"});
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({message: "Internal server error", error: error.message});
  }
};

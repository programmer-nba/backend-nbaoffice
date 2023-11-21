const {Employees} = require("../../models/employee/employee.model");
const {
  Timeworks,
  validateTimework,
} = require("../../models/employee/timework.model");
const dayjs = require("dayjs");

module.exports.checkin = async (req, res) => {
  try {
    const {decoded} = req;
    const id = decoded._id;
    Employees.findOne({_id: id}).then(async (item) => {
      const position = item.position;
      if (position === "employee") {
        const {error} = validateTimework(req.body);
        if (error) {
          return res.status(403).send({
            message: "Data validation failed",
            error: error.details[0].message,
          });
        }
        let timeData = {
          name: req.body.name,
          lastname: req.body.lastname,
          level: "Employee",
          position: req.body.position,
          department: req.body.department,
          checkin: true,
          time_checkin: dayjs(Date.now()).format(""),
        };
        const timework = new Timeworks(timeData);
        const new_timework = await timework.save();
        return res.status(200).send({
          status: true,
          message: "ลงเวลาเข้างานสำเร็จ",
          data: new_timework,
        });
      } else {
        return res
          .status(403)
          .send({status: false, message: "ลงเวลาเข้างานไม่สำเร็จ"});
      }
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({message: "Internal server error", error: error.message});
  }
};

module.exports.checkout = async (req, res) => {
  try {
    const {decoded} = req;
    const id = decoded._id;
    Employees.findOne({_id: id}).then(async (item) => {
      const position = item.position;
      if (position === "employee") {
        const id = req.params.id;
        const timework = await Timeworks.findByIdAndUpdate(id, {
          checkout: true,
          time_checkout: dayjs(Date.now()).format(""),
        });
        console.log(timework);
        if (timework) {
          return res.status(200).send({
            status: true,
            message: "ลงเวลาออกงานสำเร็จ",
          });
        } else {
          return res.status(403).send({
            status: false,
            message: "ลงเวลาออกงานไม่สำเร็จ",
          });
        }
      } else {
        return res.status(403).send({
          status: false,
          message: "ลงเวลาออกงานไม่สำเร็จ && คุณไม่ได้เป็นพนักงาน",
        });
      }
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({message: "Internal server error", error: error.message});
  }
};

module.exports.getTimeworksAll = async (req, res) => {
  try {
    const {decoded} = req;
    console.log("call me", decoded);
    const id = decoded._id;
    Employees.findOne({_id: id}).then(async (item) => {
      const position = item.position;
      if (position === "manager" || position === "owner") {
        const timework = await Timeworks.find();
        if (!timework) {
          return res.status(403).send({
            status: true,
            message: "ดึงข้อมูลลงเวลาพนักงานไม่สำเร็จ",
          });
        } else {
          return res.status(200).send({
            status: true,
            message: "ดึงข้อมูลลงเวลาพนักงานสำเร็จ",
            data: timework,
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

module.exports.getTimeworksById = async (req, res) => {
  try {
    const {decoded} = req;
    console.log("call me", decoded);
    const id = decoded._id;
    Employees.findOne({_id: id}).then(async (item) => {
      const position = item.position;
      if (position === "manager" || position === "owner") {
        const id = req.params.id;
        const timework = await Timeworks.findById(id);
        if (!timework) {
          return res.status(403).send({
            status: true,
            message: "ดึงข้อมูลลงเวลาพนักงานไม่สำเร็จ",
          });
        } else {
          return res.status(200).send({
            status: true,
            message: "ดึงข้อมูลลงเวลาพนักงานสำเร็จ",
            data: timework,
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

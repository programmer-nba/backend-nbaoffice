const {Admins} = require("../models/admin/admin.model");

exports.Login = async (req, res) => {
  try {
    const admin = await Admins.findOne({
      admin_username: req.body.username,
    });
    console.log(admin);
  } catch (err) {
    return res
      .status(500)
      .send({status: false, message: "Internal Server Error"});
  }
};

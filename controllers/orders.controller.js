const {model} = require("mongoose");
const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
    //console.log(file.originalname);
  },
});

module.exports.GetOrders = async (req, res) => {
  const axios = require("axios");
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${process.env.SHOP_API_URL}orderservice/list`,
    headers: {
      "auth-token": process.env.SHOP_API_KEY,
    },
  };

  await axios
    .request(config)
    .then((response) => {
      return res.status(200).send(response.data);
    })
    .catch((error) => {
      return res.status(500).send(error.message);
    });
};

//get order by id
module.exports.GetOrdersById = async (req, res) => {
  const axios = require("axios");

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${process.env.SHOP_API_URL}orderservice/list/${req.params.id}`,
    headers: {
      "auth-token": process.env.SHOP_API_KEY,
    },
  };

  await axios
    .request(config)
    .then((response) => {
      return res.status(200).send(response.data);
    })
    .catch((error) => {
      return res.status(500).send(error.message);
    });
};

module.exports.acceptOrder = async (req, res) => {
  const axios = require("axios");
  const permission = ["employee"];

  if (!permission.includes(req.user.level)) {
    return res.status(403).send({message: "Permission denied"});
  }

  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${process.env.SHOP_API_URL}orderservice/accept/${req.params.id}`,
    headers: {
      "auth-token": process.env.SHOP_API_KEY,
      "content-type": "application/json",
    },
  };

  await axios
    .request(config)
    .then((response) => {
      console.log(response);
      return res.status(200).send(response.data);
    })
    .catch((error) => {
      return res.status(500).send(error.message);
    });
};

const axios = require("axios");

module.exports.getOrderShop = async (req, res) => {
  try {
    const request = {
      method: "get",
      headers: {
        "auth-token": process.env.SHOP_API_KEY,
      },
      url: `${process.env.SHOP_API_URL}orderservice/list`,
    };
    await axios(request).then(async (response) => {
      return res.status(200).send(response.data);
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({message: "Internal server error", error: error.message});
  }
};

module.exports.getOrderShopById = async (req, res) => {
  try {
    const id = req.params.id;
    const request = {
      method: "get",
      headers: {
        "auth-token": process.env.SHOP_API_KEY,
      },
      url: `${process.env.SHOP_API_URL}orderservice/list/${id}`,
    };
    await axios(request).then(async (response) => {
      return res.status(200).send(response.data);
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({message: "Internal server error", error: error.message});
  }
};

module.exports.acceptOrderShop = async (req, res) => {
  try {
    const id = req.params.id;
    const request = {
      method: "put",
      headers: {
        "auth-token": process.env.SHOP_API_KEY,
      },
      url: `${process.env.SHOP_API_URL}orderservice/accept/${id}`,
    };
    await axios(request).then(async (response) => {
      return res.status(200).send(response.data);
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({message: "Internal server error", error: error.message});
  }
};

module.exports.submitOrderShop = async (req, res) => {
  try {
    const id = req.params.id;
    const request = {
      method: "put",
      headers: {
        "auth-token": process.env.SHOP_API_KEY,
      },
      url: `${process.env.SHOP_API_URL}orderservice/submit/${id}`,
    };
    await axios(request).then(async (response) => {
      return res.status(200).send(response.data);
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({message: "Internal server error", error: error.message});
  }
};


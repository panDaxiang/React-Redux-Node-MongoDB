const express = require("express");
const Router = express.Router();

// 获取表结构模型
const userModel = require("./model");
const FILTER = {"__v": 0}

// 新增用户
Router.post("/add", (req, res) => {
  const { name, age, address, tags } = req.body;
  new userModel({ name, age, address, tags }).save((err, doc) => {
    if (err) {
      console.log(err)
    } else {
      res.send({ code: 0, msg: "新增用户成功" });
    }
  });
});

Router.get("/list", (req, res) => {
  const {name, age, address, tags} = req.query;
  userModel.find({}, FILTER, (err, doc) => {
    if (err) {
      res.json({
        msg: "服务器出错"
      });
    } else {
      res.json(doc);
    }
  });
});

module.exports = Router;

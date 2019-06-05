const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017";

mongoose.connect(DB_URL, err => {
  if (err) {
    console.log("连接数据库失败");
  } else {
    console.log("连接数据库成功");
  }
});

const model = {
  name: { type: String, require: true },
  age: { type: String, require: true },
  address: { type: String, require: true },
  tags: { type: Array, require: true }
};

// 实例化文档document
module.exports = mongoose.model("user", new mongoose.Schema(model));

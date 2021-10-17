const mongoose = require("mongoose");

const configureDB = () => {
  mongoose
    .connect(process.env.MONGODBURI_DOCKER, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = configureDB;

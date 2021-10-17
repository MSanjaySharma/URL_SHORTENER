const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const urlSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  originalUrl: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isURL(value);
      },
      message: function () {
        return "enter a valid URL";
      },
    },
  },
  hashedUrl: {
    type: String,
    //unique: true,
    //index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
    //expires: 1 * 60 * 60 * 24 * 365, //1year
  },
  /* clicks: [
    {
      clickDateTime: { type: Date },
      ipAddress: { type: String },
      browser: { type: String },
      platform: { type: String },
      device: { type: String },
    },
  ], */
});

/* urlSchema.pre("save", function (next) {
  const originalUrl = this.originalUrl;
  const hash = shorthash.unique(originalUrl);
  this.hashedUrl = hash;
  console.log(hash);
  client.set(hash, originalUrl);
  next();
}); */

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;

const shorthash = require("shorthash");
const { nanoid } = require("nanoid");

const Url = require("../models/url");
const { client } = require("../../config/redis");

module.exports.create = (req, res) => {
  const body = req.body;
  const hash = nanoid();
  const urlObj = {
    title: body.title,
    originalUrl: body.url,
    hashedUrl: hash,
  };

  client.set(hash, urlObj.originalUrl);

  const url = new Url(urlObj);

  url
    .save()
    .then((url) => {
      res.json(url);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.redirect = (req, res) => {
  const hashREQ = req.params.hash;
  const userAgent = req.useragent;

  const clicksNew = {
    clickDateTime: new Date(),
    ipAddress: Object.keys(userAgent.geoIp).length
      ? ""
      : "Couldn't find the Ip",
    browser: userAgent.browser,
    platform: userAgent.platform,
    device: userAgent.isDesktop && !userAgent.isMobile ? "desktop" : "mobile",
  };

  //SEND CLICK DATA TO ANALYTICS ENGINE MICROSERVICE if any

  client.get(hash, function (err, reply) {
    // reply is null when the key is missing
    if (err) {
      console.log(err);
      //res.json({ msg: "Please check your URL again" });
    }

    if (reply === null) {
      Url.findOne({ hashedUrl: hash })
        .then((url) => {
          if (!url) {
            res.json({ msg: "Please check your URL again" });
          }
          res.redirect(url.originalUrl);
        })
        .catch((error) => {
          console.log(error);
          res.json({ msg: "Please check your URL again" });
        });
    } else {
      console.log(reply);
      res.redirect(reply);
    }
  });
};

/* 
module.exports.list = (req, res) => {
  Url.find()
    .then((urls) => {
      res.json(urls);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.show = (req, res) => {
  const id = req.params.id;
  Url.findById(id)
    .then((url) => {
      if (url) {
        res.json(url);
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Url.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    .then((url) => {
      res.json(url);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.destory = (req, res) => {
  const id = req.params.id;
  Url.findByIdAndDelete(id)
    .then((url) => {
      res.json(url);
    })
    .catch((err) => {
      res.json(err);
    });
};

 */

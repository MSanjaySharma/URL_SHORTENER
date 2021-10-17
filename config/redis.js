const redis = require("redis");

const client = redis.createClient({
  host: process.env.REDISHOST_DOCKER,
  port: "6379",
  //password: ''
});

const configureRedis = () => {
  client.on("connect", function () {
    console.log("Connected to redis");
  });

  client.on("error", (err) => {
    console.log("REDIS error " + err);
  });
};

module.exports = { configureRedis, client };

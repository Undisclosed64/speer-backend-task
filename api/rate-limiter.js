const redis = require("ioredis");
const moment = require("moment");
require("dotenv").config();

// const redisClient = new Redis({
//   url: process.env.REDIS_URL || "redis://localhost:6379",
// });

// const redisClient = redis.createClient({
//   password: "N1k4jWYNWCLioAskvSmq6rSQmGCjtEpx",
//   host: "redis-16335.c301.ap-south-1-1.ec2.cloud.redislabs.com",
//   port: 16335,
// });
const redisClient = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const RATELIMIT_DURATION_IN_SECONDS = 60;
const NUMBER_OF_REQUEST_ALLOWED = 10;

module.exports = {
  rateLimitter: async (req, res, next) => {
    const userId = req.user.id;
    const currentTime = moment().unix();
    // console.log(currentTime);

    const result = await redisClient.hgetall(userId);
    if (Object.keys(result).length === 0) {
      await redisClient.hset(userId, {
        createdAt: currentTime,
        count: 1,
      });
      return next();
    }
    if (result) {
      let diff = currentTime - result["createdAt"];

      if (diff > RATELIMIT_DURATION_IN_SECONDS) {
        await redisClient.hset(userId, {
          createdAt: currentTime,
          count: 1,
        });
        return next();
      }
    }
    if (result["count"] >= NUMBER_OF_REQUEST_ALLOWED) {
      return res.status(429).json({
        success: false,
        message: "user-ratelimited",
      });
    } else {
      await redisClient.hset(userId, {
        count: parseInt(result["count"]) + 1,
      });
      return next();
    }
  },
};

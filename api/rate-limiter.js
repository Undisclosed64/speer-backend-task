const { Redis } = require("@upstash/redis");
const moment = require("moment");
require("dotenv").config();

const redisClient = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const RATELIMIT_DURATION_IN_SECONDS = 60;
const NUMBER_OF_REQUEST_ALLOWED = 10;

module.exports = {
  rateLimitter: async (req, res, next) => {
    const userId = req.user.id;
    const currentTime = moment().unix();

    try {
      const result = await redisClient.hgetall(userId);

      if (!result || Object.keys(result).length === 0) {
        // if result is undefined or empty set initial values
        await redisClient.hset(userId, {
          createdAt: currentTime,
          count: 1,
        });
        return next();
      }

      let diff = currentTime - result["createdAt"];

      if (diff > RATELIMIT_DURATION_IN_SECONDS) {
        // if time duration has passed reset count
        await redisClient.hset(userId, {
          createdAt: currentTime,
          count: 1,
        });
        return next();
      }

      if (result["count"] >= NUMBER_OF_REQUEST_ALLOWED) {
        // if limit exceeded return user-ratelimited
        return res.status(429).json({
          success: false,
          message: "Sorry too many requests. User-ratelimited.",
        });
      } else {
        await redisClient.hset(userId, {
          count: parseInt(result["count"]) + 1,
        });
        return next();
      }
    } catch (error) {
      console.error("Error retrieving data from Redis:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};

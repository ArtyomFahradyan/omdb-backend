const fetch = require("node-fetch");
const redis = require("redis");
const { API_KEY } = require("../../constatnts");
const redisClient = redis.createClient();

redisClient.on("error", (error) => console.error(`Error : ${error}`));
redisClient.connect();

class Controller {
    static async getMovies(req, res) {
        const { title, year, type } = req.query;
        const redisKey = `${title}${year}${type}`;
        let results;
        let isCached = false;

        try {
            const cacheResults = await redisClient.get(redisKey);
            if (cacheResults) {
                isCached = true;
                results = JSON.parse(cacheResults);
            } else {
                const response = await fetch(
                    `http://www.omdbapi.com/?t=${title}&type=${type}&y=${year}&apikey=${API_KEY}`
                );
                results = await response.json();
                await redisClient.set(redisKey, JSON.stringify(results));
            }

            res.send({
                fromCache: isCached,
                data: results,
            });
        } catch (error) {
            res.status(400).json({ message: "Something went wrong.", error })
        }
    }
}

module.exports = Controller;

import fetch from "node-fetch";
import { createClient } from "redis";
import { API_KEY } from "../../constatnts";
const redisClient = createClient();

redisClient.on("error", (error) => console.error(`Error : ${error}`));
redisClient.connect();

class Controller {
    static async getMovies(req, res) {
        const { title, year, type } = req.query;
        const redisKey = `${title}${year}${type}`;
        let isCached = false;
        let results;

        try {
            const cacheResults = await redisClient.get(redisKey);
            if (cacheResults) {
                isCached = true;
                results = JSON.parse(cacheResults);
            } else {
                const response = await fetch(
                    `${process.env.OMDB_API}?t=${title}&type=${type}&y=${year}&apikey=${API_KEY}`
                );
                results = await response.json();
                await redisClient.setEx(redisKey, 3600, JSON.stringify(results));
            }

            res.send({
                fromCache: isCached,
                data: results,
            });
        } catch (error) {
            res.status(400).json({ message: "Something went wrong.", error });
        }
    }
}

export default Controller;

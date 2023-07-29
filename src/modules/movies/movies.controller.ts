import { createClient } from "redis";
import OMDBService from "../../services/OMDBService";
const redisClient = createClient();

redisClient.on("error", (error) => console.error(`Error : ${error}`));
redisClient.connect();

class MoviesController {
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
                results = await OMDBService.getMovie({ type, title, year });
                await redisClient.setEx(
                    redisKey,
                    3600,
                    JSON.stringify(results)
                );
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

export default MoviesController;

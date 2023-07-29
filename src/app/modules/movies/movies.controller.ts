import { Request, Response, NextFunction } from "express";
import OMDBService from "app/services/OMDBService";
import redisClient from "app/redis";

class MoviesController {
    static async getMovies(req: Request, res: Response, next: NextFunction) {
        const { title, year, type } = req.query;
        const redisKey = `${title}${year}${type}`;

        try {
            const results = await OMDBService.getMovie({ type, title, year });
            await redisClient.setEx(redisKey, 3600, JSON.stringify(results));

            res.send({
                fromCache: false,
                data: results,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default MoviesController;

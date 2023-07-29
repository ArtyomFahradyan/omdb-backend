import { Request, Response, NextFunction } from "express";
import redisClient from "app/redis";
async function cacheMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { title, year, type } = req.query;
    const redisKey = `${title}${year}${type}`;
    const data = await redisClient.get(redisKey);

    if (data && Object.keys(data).length) {
        res.send({
            fromCache: true,
            data: JSON.parse(data),
        });
    } else {
        next();
    }
}

export default cacheMiddleware;

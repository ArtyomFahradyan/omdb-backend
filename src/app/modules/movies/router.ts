import { Router } from "express";
import MoviesController from "./movies.controller";
import { RedisMiddleware } from "app/middlewares";

const router = Router();

router.get("/", RedisMiddleware, MoviesController.getMovies);

export default router;

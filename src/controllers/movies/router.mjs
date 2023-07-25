import Router from "express";
import Controller from "./controller.mjs";

const router = new Router();

router.get("/", Controller.getMovies);

export default router;

import { Router } from "express";
import Controller from "./controller";

const router = Router();

router.get("/", Controller.getMovies);

export default router;

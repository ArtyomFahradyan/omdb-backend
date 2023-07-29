import express, { Express } from "express";
import cors from "cors";
import { corsOptions } from "./config/cors.option";
import { moviesRouter } from "./modules";
import { ErrorHandlerMiddleware } from "./middlewares";

class Application {
    app: Express;

    constructor() {
        this.app = express();
        this.initApp();
    }
    initApp() {
        this.configApp();
        this.setRouter();
        this.setErrorHandler();
    }

    configApp() {
        this.app.use(cors(corsOptions)).use(express.json());
    }
    setRouter() {
        this.app.use("/movies", moviesRouter);
    }

    setErrorHandler() {
        this.app.use(ErrorHandlerMiddleware.handler);
    }
}

export default () => new Application().app;

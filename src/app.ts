import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { corsOptions } from "config/cors.option";
import { moviesRouter } from "modules";
import { ErrorHandlerMiddleware } from "middlewares";

dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/movies", moviesRouter);
app.use(ErrorHandlerMiddleware.handler);

async function start() {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();

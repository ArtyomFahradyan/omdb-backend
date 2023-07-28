import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import moviesRouter from "./controllers/movies/router";

dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();
// just for testing
app.use(cors());
app.use(express.json());
app.use("/movies", moviesRouter);

async function start() {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();

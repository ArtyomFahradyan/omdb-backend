import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { corsOptions } from "config/cors.option";
import { moviesRouter } from "modules";
import { BAD_REQUEST_CODE } from "constatnts";
import { ServiceUnavailable } from "errors";

dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(
    async (
        err: Error & { status: number; errors: any },
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if (!err.status) {
            next(new ServiceUnavailable(err.message));
        }

        let status = err.status || BAD_REQUEST_CODE;

        return res.status(status).json({
            status: status,
            data: null,
            message: err.message || "",
            errors: err.errors || null,
            body: req.body,
        });
    }
);

app.use("/movies", moviesRouter);

async function start() {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();

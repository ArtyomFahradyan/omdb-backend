const express = require("express");
const cors = require("cors");
const moviesRouter = require("./src/controllers/movies/router");

const PORT = process.env.PORT || 5001;
const app = express();


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


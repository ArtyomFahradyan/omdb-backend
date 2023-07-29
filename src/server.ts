import dotenv from "dotenv";
import App from "./app/app";
dotenv.config();

const PORT = process.env.PORT || 5001;
const app = App();

async function start() {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();

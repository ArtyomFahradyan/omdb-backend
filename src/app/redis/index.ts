import { createClient } from "redis";

const redisClient = createClient();

redisClient.on("error", (error) => console.error(`Error : ${error}`));
redisClient.connect();

export default redisClient;

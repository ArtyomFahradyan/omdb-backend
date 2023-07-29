import fetch from "node-fetch";
import { API_KEY } from "constatnts";

class OMDBService {
    static async getMovie({
        type,
        title,
        year,
    }: {
        title: string;
        type: string;
        year: string;
    }) {
        const response = await fetch(
            `${process.env.OMDB_API}?t=${title}&type=${type}&y=${year}&apikey=${API_KEY}`
        );
        return await response.json();
    }
}

export default OMDBService;

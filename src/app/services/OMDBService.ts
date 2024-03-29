import fetch from "node-fetch";
import { API_KEY, NOT_EXISTS, SOMETHING_WENT_WRONG } from "app/constatnts";
import { ExternalApiError, NotFound } from "app/errors";
import { ParsedQs } from "qs";

type Param = undefined | string | string[] | ParsedQs | ParsedQs[];

class OMDBService {
    static async getMovie({ type, title, year }: Record<string, Param>) {
        let response;
        try {
            response = await fetch(
                `${process.env.OMDB_API}?t=${title}&type=${type}&y=${year}&apikey=${API_KEY}`
            );
        } catch (err) {
            throw new ExternalApiError(SOMETHING_WENT_WRONG);
        }

        const res = await response.json();
        if (!res) {
            throw new NotFound(NOT_EXISTS("Movie"));
        }

        return res;
    }
}

export default OMDBService;

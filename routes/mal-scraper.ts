import * as express from "express";
import { AnimeSearchModel, search } from "mal-scraper";

const malScraperRouter = express.Router();

var searchAnime = search; // MalScraper client

malScraperRouter.get('/getFromMalScraper', async (req: any, res: any) => {
    var queryName: string = req.query.anime_name;

    var animeArray: AnimeSearchModel[] = await searchAnime.search("anime", { term: queryName });

    for (let i = 0; i < animeArray.length; i++) {
        const anime: AnimeSearchModel = animeArray[i];

        if (anime.title == queryName) {
            res.send(anime);
        }
    }

    if (!res.headersSent) {
        res.send({});
    }
});

export default malScraperRouter;
import * as express from "express";
import { AnimeCollection } from "../database/MongoDB";

const animeRouter = express.Router();
var pageLimit: number = 30;

animeRouter.get('/getPageData', async (req: any, res: any) => {
    const pageNumber: number = req.query.page_number || 7;

    console.log(pageNumber);

    const collection = await AnimeCollection;
    const animeArray = await collection.find().limit(pageNumber * pageLimit).toArray();
    const resArray = animeArray.slice(animeArray.length - pageLimit, animeArray.length);

    res.send(resArray);
});


animeRouter.get('/getAnimeByCategory', async (req: any, res: any) => {
    const queryCategoryName: string = req.query.category_name;
    const category_name = queryCategoryName.toLowerCase();
    const pageNumber: number = req.query.page_number || 1;

    console.log(pageNumber);

    const collection = await AnimeCollection;
    const animeArray = await collection.find({ tags: category_name }).limit(pageNumber * pageLimit).toArray();
    const resArray = animeArray.slice(animeArray.length - pageLimit, animeArray.length);

    res.send(resArray);
});

animeRouter.get('/findAnime', async (req: any, res: any) => {
    const animeName: string = req.query.anime_name;

    const collection = await AnimeCollection;
    const searchResult = await collection.find({ title: { $regex: new RegExp(animeName, "i") } }).toArray();

    res.send(JSON.stringify(searchResult));
});

export default animeRouter;
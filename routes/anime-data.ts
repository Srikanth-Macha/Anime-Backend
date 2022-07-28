import * as express from "express";
import { AnimeCollection } from "../database/MongoDB";

const animeRouter = express.Router();
var pageLimit: number = 30;

animeRouter.get('/getPageData', async (req: any, res: any) => {
    var pageNumber: number = req.query.page_number || 7;

    console.log(pageNumber);

    var collection = await AnimeCollection;
    var animeArray = await collection.find().limit(pageNumber * pageLimit).toArray();
    var resArray = animeArray.slice(animeArray.length - pageLimit, animeArray.length);

    res.send(resArray);
});


animeRouter.get('/getAnimeByCategory', async (req: any, res: any) => {
    var queryCategoryName: string = req.query.category_name;
    var category_name = queryCategoryName.toLowerCase();
    var pageNumber: number = req.query.page_number || 1;

    console.log(pageNumber);

    var collection = await AnimeCollection;
    var animeArray = await collection.find({ tags: category_name }).limit(pageNumber * pageLimit).toArray();
    var resArray = animeArray.slice(animeArray.length - pageLimit, animeArray.length);

    res.send(resArray);
});

animeRouter.get('/findAnime', async (req: any, res: any) => {
    var animeName: string = req.query.anime_name;

    var collection = await AnimeCollection;
    var searchResult = await collection.find({ title: { $regex: new RegExp(animeName, "i") } }).toArray();

    res.send(JSON.stringify(searchResult));
});

export default animeRouter;
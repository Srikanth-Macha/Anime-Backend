import { Router, Request, Response } from "express";
import { AnimeCollection } from "../database/MongoDB";

const animeRouter = Router();
const pageLimit: number = 30;

animeRouter.get('/getPageData', async (req: any, res: any) => {
    const pageNumber: number = req.query.page_number || 7;

    console.log(pageNumber);

    const collection = await AnimeCollection;

    const animeArray = await collection.find()
        .skip((pageNumber - 1) * pageLimit)
        .limit(pageLimit)
        .toArray();

    res.send(animeArray);
});


animeRouter.get('/getAnimeByCategory', async (req: any, res: any) => {
    const category_name: string = req.query.category_name.toLowerCase();
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
    const searchResult = await collection.find({
        title: {
            $regex: new RegExp(animeName, "i")
        }
    }).toArray();

    res.send(JSON.stringify(searchResult));
});


animeRouter.get('/findAnimeByTag', async (req: Request, res: Response) => {
    const animeTag = req.query.anime_tag;

    const collection = await AnimeCollection;
    const result = await collection.find({
        tags: {
            $in: [animeTag]
        }
    }).toArray();

    res.send(result);
});


animeRouter.get('/similarAnime', async (req: Request, res: Response) => {
    const animeTags = req.query.anime_tags as string[];

    const collection = await AnimeCollection;
    const animes = await collection.find({
        tags: {
            $in: [animeTags[0], animeTags[1]]
        }
    }).limit(25)
        .toArray();

    console.log(animes);
    res.send(animes);
});

animeRouter.get('/random', async (req, res) => {
    const collection = await AnimeCollection;

    const value = await collection.aggregate([{ $sample: { size: 1 } }]).toArray();
    // value.
    console.log(value[0]);
    res.send(value[0]);
});


export default animeRouter;
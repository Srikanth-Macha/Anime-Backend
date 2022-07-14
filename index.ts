import { config } from "dotenv";
import { Collection, WatchList } from './database/MongoDB';
import { AnimeSearchModel, search } from "mal-scraper";

var express = require('express')
var app = express();
app.use(express.json());

var searchAnime = search;

config();

const PORT = process.env.PORT as unknown as number || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.get('/getAllAnimeData', async (req: any, res: any) => {
    var collection = await Collection;
    var animeArray = await collection.find().toArray();

    res.send(animeArray);
});


var pageLimit: number = 30;

app.get('/getPageData', async (req: any, res: any) => {
    var pageNumber: number = req.query.page_number || 1;

    console.log(pageNumber);

    var collection = await Collection;
    var animeArray = await collection.find().limit(pageNumber * pageLimit).toArray();
    var resArray = animeArray.slice(animeArray.length - pageLimit, animeArray.length);

    res.send(resArray);
});


app.get('/getAnimeByCategory', async (req: any, res: any) => {
    var queryCategoryName: string = req.query.category_name;
    var category_name = queryCategoryName.toLowerCase();
    var pageNumber: number = req.query.page_number || 1;

    console.log(pageNumber);

    var collection = await Collection;
    var animeArray = await collection.find({ tags: category_name }).limit(pageNumber * pageLimit).toArray();
    var resArray = animeArray.slice(animeArray.length - pageLimit, animeArray.length);

    res.send(resArray);
});


app.get('/findAnime', async (req: any, res: any) => {
    var animeName: string = req.query.anime_name;

    var collection = await Collection;
    var searchResult = await collection.find({ title: { $regex: new RegExp(animeName) } }).toArray();

    res.send(JSON.stringify(searchResult));
});


app.get('/', (req: any, res: any) =>
    res.send('This is the default directory'));


app.get('/getFromMalScraper', async (req: any, res: any) => {
    var queryName: string = req.query.anime_name;

    var animeArray: AnimeSearchModel[] = await searchAnime.search("anime", { term: queryName });
    
    for (let i = 0; i < animeArray.length; i++) {
        const anime: AnimeSearchModel = animeArray[i];

        if (anime.title == queryName) {
            res.send(anime);
        }
    }
});


app.post("/addToWatchList", (req: any, res: any) => {
    WatchList.then(
        watchList => {
            watchList.insertOne(req.body).then(
                response => {
                    res.send(req.body);
                    console.log(req.body);
                    console.log(response);
                }
            ).catch(err => console.error(err));
        }
    ).catch(err => console.error(err));
});


app.get("/getWatchListData", async (req: any, res: any) => {
    var watchList = await WatchList;
    var watchListData = await watchList.find().toArray()

    res.send(watchListData);
});

app.listen(PORT, HOST, () => console.log(`Listening at port ${PORT}`));
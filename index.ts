import { config } from "dotenv";
import { AnimeCollection, Users, WatchList } from './database/MongoDB';
import { AnimeSearchModel, search } from "mal-scraper";

var express = require('express')
var app = express();
app.use(express.json());

var searchAnime = search; // MalScraper client

config(); // .env configuration

const PORT = process.env.PORT as unknown as number || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.get('/getAllAnimeData', async (req: any, res: any) => {
    var collection = await AnimeCollection;
    var animeArray = await collection.find().toArray();

    res.send(animeArray);
});


var pageLimit: number = 30;

app.get('/getPageData', async (req: any, res: any) => {
    var pageNumber: number = req.query.page_number || 7;

    console.log(pageNumber);

    var collection = await AnimeCollection;
    var animeArray = await collection.find().limit(pageNumber * pageLimit).toArray();
    var resArray = animeArray.slice(animeArray.length - pageLimit, animeArray.length);

    res.send(resArray);
});


app.get('/getAnimeByCategory', async (req: any, res: any) => {
    var queryCategoryName: string = req.query.category_name;
    var category_name = queryCategoryName.toLowerCase();
    var pageNumber: number = req.query.page_number || 1;

    console.log(pageNumber);

    var collection = await AnimeCollection;
    var animeArray = await collection.find({ tags: category_name }).limit(pageNumber * pageLimit).toArray();
    var resArray = animeArray.slice(animeArray.length - pageLimit, animeArray.length);

    res.send(resArray);
});


app.get('/findAnime', async (req: any, res: any) => {
    var animeName: string = req.query.anime_name;

    var collection = await AnimeCollection;
    var searchResult = await collection.find({ title: { $regex: new RegExp(animeName, "i") } }).toArray();

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


app.post("/addToWatchList", async (req: any, res: any) => {
    var watchList = await WatchList;
    var insertResponse = null;

    try {
        insertResponse = await watchList.insertOne(req.body);
    } catch (err) {
        console.log(err);
    }

    if (insertResponse?.acknowledged) {
        res.send(req.body);
    }
});


app.get("/getWatchListData", async (req: any, res: any) => {
    var watchList = await WatchList;
    console.log(req.query.email);

    var watchListData = await watchList.find({ email: req.query.email }).sort({ email: 1 }).toArray();

    res.send(watchListData);
});


app.post("/addUser", async (req: any, res: any) => {
    var users = await Users;
    var insertResponse = null;

    try {
        const usersArray = await users.find({ email: req.body.email }).toArray();

        if (usersArray.length == 0) {
            insertResponse = await users.insertOne(req.body);

            res.send(req.body);
        }
        else {
            for (let i = 0; i < usersArray.length; i++) {
                const doc = usersArray[i];

                if (doc.password == req.body.password) {
                    console.log(doc);
                    res.send(doc);
                }
            }

            res.send({});
        }

    } catch (err) {
        console.log(err);
    }
});


app.get("/validateUser", async (req: any, res: any) => {
    var usersCollection = await Users;

    usersCollection.findOne(req.body, user => {
        res.send(user);
    });
});

app.listen(PORT, HOST, () => console.log(`Listening at port ${PORT}`));
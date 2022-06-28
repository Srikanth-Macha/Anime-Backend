import { config } from "dotenv";
import { Collection } from './database/MongoDB';
import { AnimeSearchModel, search } from "mal-scraper";

var express = require('express');
var app = express();
app.use(express.json());

var searchAnime = search

config();

const PORT = process.env.PORT as unknown as number || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.get('/getAllAnimeData', (req: any, res: any) => {
    Collection.then(collection => {

        collection.find().toArray()
            .then(animeArray => res.json(animeArray))
            .catch(err => console.log(err));

    }).catch(err => console.log(err));
});


app.get('/getPageData', (req: any, res: any) => {
    var pageNumber: number = req.query.page_number || 1;
    var pageLimit: number = 30;

    console.log(pageNumber);

    Collection.then(collection => {

        collection.find().limit(pageNumber * pageLimit).toArray()
            .then(
                docArray => {
                    var resArray = docArray.slice(docArray.length - pageLimit, docArray.length);
                    res.send(JSON.stringify(resArray));
                }
            ).catch(err => console.log(err));
    });

});


app.get('/getAnimeByCategory', (req: any, res: any) => {
    var queryCategoryName: string = req.query.category_name;
    var category_name = queryCategoryName.toLowerCase();

    Collection.then(
        collection => {
            collection.find({ tags: category_name }).limit(30)
                .toArray().then(
                    arr => {
                        res.send(arr);
                    }
                ).catch(err => console.log(err));

        }
    ).catch(err => console.log(err));
});


app.get('/findAnime', (req: any, res: any) => {
    var animeName: string = req.query.anime_name;

    Collection.then(collection => {
        collection.find({ title: { $regex: new RegExp(animeName) } }).toArray()
            .then(
                arr => {
                    res.send(JSON.stringify(arr));
                }
            ).catch(err => console.log(err));
    });

});


app.get('/', (req: any, res: any) =>
    res.send('This is the default directory'));


app.get('/getFromMalScraper', (req: any, res: any) => {
    var queryName = req.query.anime_name;

    searchAnime.search("anime", { term: queryName })
        .then(
            animeArray => {
                for (let i = 0; i < animeArray.length; i++) {
                    const anime: AnimeSearchModel = animeArray[i];

                    if (anime.title == queryName) {
                        res.send(anime);
                    }
                }

                // res.send(animeArray);
            }
        ).catch(err => console.error(err));
});


app.listen(PORT, HOST, () => console.log(`Listening at port ${PORT}`));

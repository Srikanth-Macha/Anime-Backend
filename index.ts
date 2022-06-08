
import { config } from "dotenv";
import { Collection } from './database/MongoDB';

var express = require('express');
var app = express();
app.use(express.json());

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
            .then(docArray => {
                var resArray = docArray.slice(docArray.length - pageLimit, docArray.length);
                res.send(JSON.stringify(resArray));
            });
    });

});

app.get('/findAnime', (req: any, res: any) => {
    var animeName: string = req.query.anime_name;

    Collection.then(collection => {
        collection.findOne({ title: animeName }, { allowPartialResults: true }, (error, result)=> {
            if(error) throw error;

            res.send(result);
        });
    })

});


app.get('/', (req: any, res: any) =>
    res.send('This is the default directory'));


app.listen(PORT, HOST, () => console.log(`Listening at port ${PORT}`));
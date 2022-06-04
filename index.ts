
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
    var pageNumber: number = req.body.page_number || 1;

    Collection.then(collection => {

        collection.find().limit(pageNumber * 30).toArray()
            .then(docArray => {
                var resArray = docArray.slice(docArray.length - 20, docArray.length);
                res.send(JSON.stringify(resArray));
            });
    });

});

app.get('/findAnime', (req: any, res: any) => {
    var animeName: string = req.body.anime_name;

    Collection.then(collection => {
        collection.find({ title: animeName }, { allowPartialResults: true }).toArray((error, result) => {
            if (error) throw error;

            res.status(200).json(result);
        });
    })

});


app.get('/', (req: any, res: any) =>
    res.send('This is the default directory'));


app.listen(PORT, HOST, () => console.log(`Listening at port ${PORT}`));
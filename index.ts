import express from "express";
import { config } from "dotenv";
import { Collection } from './database/MongoDB';

var app = express();
app.use(express.json());

config();

const PORT = process.env.PORT as unknown as number || 3000;
const HOST = process.env.HOST || '';

app.get('/getAllAnimeData', (req, res) => {
    Collection.then(collection => {

        collection.findOne({ title: 'Naruto' })
            .then(doc => res.send(doc))
            .catch(err => console.log(err));

    }).catch(err => console.log(err));
});

app.get('/getPageData', (req, res) => {
    var pageNumber: number = req.body.page_number;

    Collection.then(collection => {

        collection.find().limit(pageNumber * 30).toArray()
            .then(docArray => {
                var resArray = docArray.slice(docArray.length - 20, docArray.length);
                res.send(JSON.stringify(resArray));
            });
    });

});

app.get('/', (req, res) => res.send('This is the default directory'));


app.listen(PORT, HOST, () => console.log(`Listening at port ${PORT}`));
import express from "express";
import { config } from "dotenv";
import { Collection } from './database/MongoDB';

var app = express();
config();

const PORT = process.env.PORT || 3000;

app.get('/getAllAnimeData', (req, res) => {
    Collection.then(collection => {

        collection.findOne({ title: 'Naruto' })
            .then(doc => res.send(doc))
            .catch(err => console.log(err));

    }).catch(err => console.log(err));
});

app.get('/', (req, res) => res.send('This is the default directory'));


app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
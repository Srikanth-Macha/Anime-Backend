import { MongoClient } from "mongodb";

const URL = process.env.DATABASE_URL || "mongodb+srv://srikanth:30025020@chattimecluster.zp9qs.mongodb.net/?retryWrites=true&w=majority";

export var Collection = MongoClient.connect(URL).then(value => {
    return value.db('animeDatabase').collection('animes');
});

export var WatchList = MongoClient.connect(URL).then(value => {
    return value.db('animeDatabase').collection('animeWatchList');
});
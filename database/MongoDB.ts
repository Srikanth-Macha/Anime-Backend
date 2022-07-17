import { MongoClient } from "mongodb";
import { config } from "dotenv";

config();

const URL = process.env.DATABASE_URL || "";

export var AnimeCollection = MongoClient.connect(URL).then(value => {
    return value.db('animeDatabase').collection('animes');
});

export var WatchList = MongoClient.connect(URL).then(value => {
    return value.db('animeDatabase').collection('animeWatchList');
});

export var Users = MongoClient.connect(URL).then(value => {
    return value.db("animeDatabase").collection("users");
});
import { MongoClient } from "mongodb";
import { config } from "dotenv";

config();

const URL = process.env.DATABASE_URL || "";

export const AnimeCollection = MongoClient.connect(URL).then(value => {
    return value.db('animeDatabase').collection('animes');
});

export const WatchList = MongoClient.connect(URL).then(value => {
    return value.db('animeDatabase').collection('animeWatchList');
});

export const Users = MongoClient.connect(URL).then(value => {
    return value.db("animeDatabase").collection("users");
});

export const Favourites = MongoClient.connect(URL).then(value => {
    return value.db("animeDatabase").collection("favourites");
});


export const Backup = MongoClient.connect(URL).then(value => {
    return value.db("animeDatabase").collection("backup");
});
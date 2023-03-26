"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Backup = exports.Favourites = exports.Users = exports.WatchList = exports.AnimeCollection = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const URL = process.env.DATABASE_URL || "";
exports.AnimeCollection = mongodb_1.MongoClient.connect(URL).then(value => {
    return value.db('animeDatabase').collection('animes');
});
exports.WatchList = mongodb_1.MongoClient.connect(URL).then(value => {
    return value.db('animeDatabase').collection('animeWatchList');
});
exports.Users = mongodb_1.MongoClient.connect(URL).then(value => {
    return value.db("animeDatabase").collection("users");
});
exports.Favourites = mongodb_1.MongoClient.connect(URL).then(value => {
    return value.db("animeDatabase").collection("favourites");
});
exports.Backup = mongodb_1.MongoClient.connect(URL).then(value => {
    return value.db("animeDatabase").collection("backup");
});

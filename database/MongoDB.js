"use strict";
exports.__esModule = true;
exports.Users = exports.WatchList = exports.AnimeCollection = void 0;
var mongodb_1 = require("mongodb");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var URL = process.env.DATABASE_URL || "";
exports.AnimeCollection = mongodb_1.MongoClient.connect(URL).then(function (value) {
    return value.db('animeDatabase').collection('animes');
});
exports.WatchList = mongodb_1.MongoClient.connect(URL).then(function (value) {
    return value.db('animeDatabase').collection('animeWatchList');
});
exports.Users = mongodb_1.MongoClient.connect(URL).then(function (value) {
    return value.db("animeDatabase").collection("users");
});

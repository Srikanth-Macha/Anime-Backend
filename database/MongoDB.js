"use strict";
exports.__esModule = true;
exports.WatchList = exports.Collection = void 0;
var mongodb_1 = require("mongodb");
var URL = process.env.DATABASE_URL || "mongodb+srv://srikanth:30025020@chattimecluster.zp9qs.mongodb.net/?retryWrites=true&w=majority";
exports.Collection = mongodb_1.MongoClient.connect(URL).then(function (value) {
    return value.db('animeDatabase').collection('animes');
});
exports.WatchList = mongodb_1.MongoClient.connect(URL).then(function (value) {
    return value.db('animeDatabase').collection('animeWatchList');
});

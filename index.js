"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
var MongoDB_1 = require("./database/MongoDB");
var express = require('express');
var app = express();
app.use(express.json());
(0, dotenv_1.config)();
var PORT = process.env.PORT || 3000;
var HOST = process.env.HOST || '0.0.0.0';
app.get('/getAllAnimeData', function (req, res) {
    MongoDB_1.Collection.then(function (collection) {
        collection.find().toArray()
            .then(function (animeArray) { return res.json(animeArray); })["catch"](function (err) { return console.log(err); });
    })["catch"](function (err) { return console.log(err); });
});
app.get('/getPageData', function (req, res) {
    var pageNumber = req.query.page_number || 1;
    var pageLimit = 30;
    console.log(pageNumber);
    MongoDB_1.Collection.then(function (collection) {
        collection.find().limit(pageNumber * pageLimit).toArray()
            .then(function (docArray) {
            var resArray = docArray.slice(docArray.length - pageLimit, docArray.length);
            res.send(JSON.stringify(resArray));
        });
    });
});
app.get('/findAnime', function (req, res) {
    var animeName = req.query.anime_name;
    MongoDB_1.Collection.then(function (collection) {
        collection.findOne({ title: animeName }, { allowPartialResults: true }, function (error, result) {
            if (error)
                throw error;
            res.send(result);
        });
    });
});
app.get('/', function (req, res) {
    return res.send('This is the default directory');
});
app.listen(PORT, HOST, function () { return console.log("Listening at port ".concat(PORT)); });

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
    var pageNumber = req.body.page_number || 1;
    MongoDB_1.Collection.then(function (collection) {
        collection.find().limit(pageNumber * 30).toArray()
            .then(function (docArray) {
            var resArray = docArray.slice(docArray.length - 20, docArray.length);
            res.send(JSON.stringify(resArray));
        });
    });
});
app.get('/findAnimeData', function (req, res) {
    var animeName = req.body.anime_name;
    MongoDB_1.Collection.then(function (collection) {
        collection.find({ title: animeName }, { allowPartialResults: true }).toArray(function (error, result) {
            if (error)
                throw error;
            res.status(200).json(result);
        });
    });
});
app.get('/', function (req, res) {
    return res.send('This is the default directory');
});
app.listen(PORT, HOST, function () { return console.log("Listening at port ".concat(PORT)); });

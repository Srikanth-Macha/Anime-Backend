"use strict";
exports.__esModule = true;

var express_1 = require("express");
var dotenv_1 = require("dotenv");
var MongoDB_1 = require("./database/MongoDB");
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
(0, dotenv_1.config)();

var PORT = process.env.PORT || 3000;
var HOST = process.env.HOST || '';

app.get('/getAllAnimeData', function (req, res) {
    MongoDB_1.Collection.then(function (collection) {
        collection.findOne({ title: 'Naruto' })
            .then(function (doc) { return res.send(doc); })["catch"](function (err) { return console.log(err); });
    })["catch"](function (err) { return console.log(err); });
});

app.get('/getPageData', function (req, res) {
    var pageNumber = req.body.page_number;
    MongoDB_1.Collection.then(function (collection) {
        collection.find().limit(pageNumber * 30).toArray()
            .then(function (docArray) {
                var resArray = docArray.slice(docArray.length - 20, docArray.length);
                res.send(JSON.stringify(resArray));
            });
    });
});
app.get('/', function (req, res) { return res.send('This is the default directory'); });
app.listen(PORT, HOST, function () { return console.log("Listening at port ".concat(PORT)); });

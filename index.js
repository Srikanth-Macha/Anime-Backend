"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
var watchlist_1 = require("./routes/watchlist");
var anime_data_1 = require("./routes/anime-data");
var mal_scraper_1 = require("./routes/mal-scraper");
var user_login_1 = require("./routes/user-login");
var express = require('express');
var app = express();
app.use(express.json());
(0, dotenv_1.config)(); // .env configuration
var PORT = process.env.PORT || 3000;
var HOST = process.env.HOST || '0.0.0.0';
// Home Directory
app.get('/', function (req, res) {
    return res.send('This is the default directory');
});
// Anime Data and searching anime routes
app.use(anime_data_1["default"]);
// From Mal-Scraper routers
app.use(mal_scraper_1["default"]);
// WatchList Routes
app.use(watchlist_1["default"]);
// User Login
app.use(user_login_1["default"]);
app.listen(PORT, HOST, function () { return console.log("Listening at port ".concat(PORT)); });

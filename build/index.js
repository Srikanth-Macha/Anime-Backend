"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const watchlist_1 = __importDefault(require("./routes/watchlist"));
const anime_data_1 = __importDefault(require("./routes/anime-data"));
const mal_scraper_1 = __importDefault(require("./routes/mal-scraper"));
const user_login_1 = __importDefault(require("./routes/user-login"));
var express = require('express');
var app = express();
app.use(express.json());
(0, dotenv_1.config)(); // .env configuration
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
// Home Directory
app.get('/', (req, res) => res.send('This is the default directory'));
// Anime Data and searching anime routes
app.use(anime_data_1.default);
// From Mal-Scraper routers
app.use(mal_scraper_1.default);
// WatchList Routes
app.use(watchlist_1.default);
// User Login
app.use(user_login_1.default);
app.listen(PORT, HOST, () => console.log(`Listening at port ${PORT}`));

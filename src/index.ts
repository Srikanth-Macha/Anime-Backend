import { config } from "dotenv";
import watchLisRouter from "./routes/watchlist";
import animeRouter from "./routes/anime-data";
import malScraperRouter from "./routes/mal-scraper";
import userRouter from "./routes/user-login";
import favouritesRouter from "./routes/favourites";

var express = require('express');

var app = express();
app.use(express.json());

config(); // .env configuration

const PORT = process.env.PORT as unknown as number || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Home Directory
app.get('/', (req: any, res: any) =>
    res.send('This is the default directory'));


// Anime Data and searching anime routes
app.use(animeRouter);


// From Mal-Scraper router
app.use(malScraperRouter);


// WatchList Router
app.use(watchLisRouter);


// User Login
app.use(userRouter);


// Favourites List router
app.use(favouritesRouter);


app.listen(PORT, HOST, () => console.log(`Listening at port ${PORT}`));
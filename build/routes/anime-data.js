"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MongoDB_1 = require("../database/MongoDB");
const animeRouter = (0, express_1.Router)();
const pageLimit = 30;
animeRouter.get('/getPageData', async (req, res) => {
    const pageNumber = req.query.page_number || 7;
    console.log(pageNumber);
    const collection = await MongoDB_1.AnimeCollection;
    const animeArray = await collection.find()
        .skip((pageNumber - 1) * pageLimit)
        .limit(pageLimit)
        .toArray();
    res.send(animeArray);
});
animeRouter.get('/getAnimeByCategory', async (req, res) => {
    const category_name = req.query.category_name.toLowerCase();
    const pageNumber = req.query.page_number || 1;
    console.log(pageNumber);
    const collection = await MongoDB_1.AnimeCollection;
    const animeArray = await collection.find({ tags: category_name }).limit(pageNumber * pageLimit).toArray();
    const resArray = animeArray.slice(animeArray.length - pageLimit, animeArray.length);
    res.send(resArray);
});
animeRouter.get('/findAnime', async (req, res) => {
    const animeName = req.query.anime_name;
    const collection = await MongoDB_1.AnimeCollection;
    const searchResult = await collection.find({
        title: {
            $regex: new RegExp(animeName, "i")
        }
    }).toArray();
    res.send(JSON.stringify(searchResult));
});
animeRouter.get('/findAnimeByTag', async (req, res) => {
    const animeTag = req.query.anime_tag;
    const collection = await MongoDB_1.AnimeCollection;
    const result = await collection.find({
        tags: {
            $in: [animeTag]
        }
    }).toArray();
    res.send(result);
});
animeRouter.get('/similarAnime', async (req, res) => {
    const animeTags = req.query.anime_tags;
    const collection = await MongoDB_1.AnimeCollection;
    const animes = await collection.find({
        tags: {
            $in: [animeTags[0], animeTags[1]]
        }
    }).limit(25)
        .toArray();
    console.log(animes);
    res.send(animes);
});
animeRouter.get('/random', async (req, res) => {
    const collection = await MongoDB_1.AnimeCollection;
    const value = await collection.aggregate([{ $sample: { size: 1 } }]).toArray();
    // value.
    console.log(value[0]);
    res.send(value[0]);
});
exports.default = animeRouter;

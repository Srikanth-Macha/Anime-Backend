"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MongoDB_1 = require("../database/MongoDB");
const favouritesRouter = (0, express_1.Router)();
favouritesRouter.get("/getFavouritesData", async (req, res) => {
    const favourites = await MongoDB_1.Favourites;
    const email = req.query.email;
    const favouritesData = await favourites.find({ "email": email }).toArray();
    res.send(favouritesData);
});
favouritesRouter.post("/addToFavourites", async (req, res) => {
    const anime = req.body;
    const favourites = await MongoDB_1.Favourites;
    const insertResponse = await favourites.insertOne(anime);
    console.log(insertResponse);
    res.send(anime);
});
exports.default = favouritesRouter;

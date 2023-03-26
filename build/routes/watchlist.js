"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MongoDB_1 = require("../database/MongoDB");
const watchListRouter = (0, express_1.Router)();
watchListRouter.post("/addToWatchList", async (req, res) => {
    const watchList = await MongoDB_1.WatchList;
    let insertResponse = null;
    try {
        insertResponse = await watchList.insertOne(req.body);
    }
    catch (err) {
        console.log(err);
    }
    if (insertResponse?.acknowledged) {
        res.send(req.body);
    }
});
watchListRouter.get("/getWatchListData", async (req, res) => {
    const watchList = await MongoDB_1.WatchList;
    console.log(req.query.email);
    const watchListData = await watchList.find({ "email": req.query.email }).sort({ "email": 1 }).toArray();
    res.send(watchListData);
});
watchListRouter.delete("/removeFromWatchList", async (req, res) => {
    const animeName = req.query.anime_name;
    const userEmail = req.query.email;
    console.log("DELETE");
    const watchList = await MongoDB_1.WatchList;
    const deleteResult = await watchList.deleteOne({ title: animeName, email: userEmail });
    console.log(deleteResult);
    res.send({});
});
exports.default = watchListRouter;

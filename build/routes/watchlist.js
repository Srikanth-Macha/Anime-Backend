"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const MongoDB_1 = require("../database/MongoDB");
const watchListRouter = express.Router();
watchListRouter.post("/addToWatchList", async (req, res) => {
    var watchList = await MongoDB_1.WatchList;
    var insertResponse = null;
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
    var watchList = await MongoDB_1.WatchList;
    console.log(req.query.email);
    var watchListData = await watchList.find({ "user.email": req.query.email }).sort({ "user.email": 1 }).toArray();
    console.log("from getWatchListData\n" + watchListData);
    res.send(watchListData);
});
exports.default = watchListRouter;

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
const animeRouter = express.Router();
var pageLimit = 30;
animeRouter.get('/getPageData', async (req, res) => {
    var pageNumber = req.query.page_number || 7;
    console.log(pageNumber);
    var collection = await MongoDB_1.AnimeCollection;
    var animeArray = await collection.find().limit(pageNumber * pageLimit).toArray();
    var resArray = animeArray.slice(animeArray.length - pageLimit, animeArray.length);
    res.send(resArray);
});
animeRouter.get('/getAnimeByCategory', async (req, res) => {
    var queryCategoryName = req.query.category_name;
    var category_name = queryCategoryName.toLowerCase();
    var pageNumber = req.query.page_number || 1;
    console.log(pageNumber);
    var collection = await MongoDB_1.AnimeCollection;
    var animeArray = await collection.find({ tags: category_name }).limit(pageNumber * pageLimit).toArray();
    var resArray = animeArray.slice(animeArray.length - pageLimit, animeArray.length);
    res.send(resArray);
});
animeRouter.get('/findAnime', async (req, res) => {
    var animeName = req.query.anime_name;
    var collection = await MongoDB_1.AnimeCollection;
    var searchResult = await collection.find({ title: { $regex: new RegExp(animeName, "i") } }).toArray();
    res.send(JSON.stringify(searchResult));
});
exports.default = animeRouter;

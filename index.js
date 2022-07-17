"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var dotenv_1 = require("dotenv");
var MongoDB_1 = require("./database/MongoDB");
var mal_scraper_1 = require("mal-scraper");
var express = require('express');
var app = express();
app.use(express.json());
var searchAnime = mal_scraper_1.search; // MalScraper client
(0, dotenv_1.config)(); // .env configuration
var PORT = process.env.PORT || 3000;
var HOST = process.env.HOST || '0.0.0.0';
app.get('/getAllAnimeData', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var collection, animeArray;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, MongoDB_1.AnimeCollection];
            case 1:
                collection = _a.sent();
                return [4 /*yield*/, collection.find().toArray()];
            case 2:
                animeArray = _a.sent();
                res.send(animeArray);
                return [2 /*return*/];
        }
    });
}); });
var pageLimit = 30;
app.get('/getPageData', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pageNumber, collection, animeArray, resArray;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pageNumber = req.query.page_number || 1;
                console.log(pageNumber);
                return [4 /*yield*/, MongoDB_1.AnimeCollection];
            case 1:
                collection = _a.sent();
                return [4 /*yield*/, collection.find().limit(pageNumber * pageLimit).toArray()];
            case 2:
                animeArray = _a.sent();
                resArray = animeArray.slice(animeArray.length - pageLimit, animeArray.length);
                res.send(resArray);
                return [2 /*return*/];
        }
    });
}); });
app.get('/getAnimeByCategory', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var queryCategoryName, category_name, pageNumber, collection, animeArray, resArray;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                queryCategoryName = req.query.category_name;
                category_name = queryCategoryName.toLowerCase();
                pageNumber = req.query.page_number || 1;
                console.log(pageNumber);
                return [4 /*yield*/, MongoDB_1.AnimeCollection];
            case 1:
                collection = _a.sent();
                return [4 /*yield*/, collection.find({ tags: category_name }).limit(pageNumber * pageLimit).toArray()];
            case 2:
                animeArray = _a.sent();
                resArray = animeArray.slice(animeArray.length - pageLimit, animeArray.length);
                res.send(resArray);
                return [2 /*return*/];
        }
    });
}); });
app.get('/findAnime', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var animeName, collection, searchResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                animeName = req.query.anime_name;
                return [4 /*yield*/, MongoDB_1.AnimeCollection];
            case 1:
                collection = _a.sent();
                return [4 /*yield*/, collection.find({ title: { $regex: new RegExp(animeName) } }).toArray()];
            case 2:
                searchResult = _a.sent();
                res.send(JSON.stringify(searchResult));
                return [2 /*return*/];
        }
    });
}); });
app.get('/', function (req, res) {
    return res.send('This is the default directory');
});
app.get('/getFromMalScraper', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var queryName, animeArray, i, anime;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                queryName = req.query.anime_name;
                return [4 /*yield*/, searchAnime.search("anime", { term: queryName })];
            case 1:
                animeArray = _a.sent();
                for (i = 0; i < animeArray.length; i++) {
                    anime = animeArray[i];
                    if (anime.title == queryName) {
                        res.send(anime);
                    }
                }
                return [2 /*return*/];
        }
    });
}); });
app.post("/addToWatchList", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var watchList, insertResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, MongoDB_1.WatchList];
            case 1:
                watchList = _a.sent();
                return [4 /*yield*/, watchList.insertOne(req.body)];
            case 2:
                insertResponse = _a.sent();
                if (insertResponse.acknowledged) {
                    res.send(req.body);
                }
                return [2 /*return*/];
        }
    });
}); });
app.get("/getWatchListData", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var watchList, watchListData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, MongoDB_1.WatchList];
            case 1:
                watchList = _a.sent();
                console.log(req.query.email);
                return [4 /*yield*/, watchList.find({ email: req.query.email }).toArray()];
            case 2:
                watchListData = _a.sent();
                res.send(watchListData);
                return [2 /*return*/];
        }
    });
}); });
app.post("/addUser", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, insertResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, MongoDB_1.Users];
            case 1:
                users = _a.sent();
                return [4 /*yield*/, users.insertOne(req.body)];
            case 2:
                insertResponse = _a.sent();
                if (insertResponse.acknowledged) {
                    res.send(req.body);
                }
                return [2 /*return*/];
        }
    });
}); });
app.get("/validateUser", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var usersCollection;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, MongoDB_1.Users];
            case 1:
                usersCollection = _a.sent();
                usersCollection.findOne(req.body, function (user) {
                    res.send(user);
                });
                return [2 /*return*/];
        }
    });
}); });
app.listen(PORT, HOST, function () { return console.log("Listening at port ".concat(PORT)); });

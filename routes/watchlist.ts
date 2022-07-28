import * as express from "express";
import { WatchList } from "../database/MongoDB";

const watchListRouter = express.Router();

watchListRouter.post("/addToWatchList", async (req: any, res: any) => {
    var watchList = await WatchList;
    var insertResponse = null;

    try {
        insertResponse = await watchList.insertOne(req.body);
    } catch (err) {
        console.log(err);
    }

    if (insertResponse?.acknowledged) {
        res.send(req.body);
    }
});


watchListRouter.get("/getWatchListData", async (req: any, res: any) => {
    var watchList = await WatchList;
    console.log(req.query.email);

    var watchListData =
        await watchList.find({ "user.email": req.query.email }).sort({ "user.email": 1 }).toArray();

    console.log("from getWatchListData\n" + watchListData);
    res.send(watchListData);
});

export default watchListRouter;
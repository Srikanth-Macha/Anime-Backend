import * as express from "express";
import { WatchList } from "../database/MongoDB";

const watchListRouter = express.Router();

watchListRouter.post("/addToWatchList", async (req: any, res: any) => {
    const watchList = await WatchList;
    let insertResponse = null;

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
    const watchList = await WatchList;
    console.log(req.query.email);

    const watchListData =
        await watchList.find({ "email": req.query.email }).sort({ "email": 1 }).toArray();

    console.log(watchListData);

    res.send(watchListData);
});

export default watchListRouter;
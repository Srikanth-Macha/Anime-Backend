import { Router, Request, Response } from "express";
import { WatchList } from "../database/MongoDB";

const watchListRouter = Router();

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

    res.send(watchListData);
});


watchListRouter.delete("/removeFromWatchList", async (req: Request, res: Response) => {
    const animeName = req.query.anime_name;
    const userEmail = req.query.email;

    console.log("DELETE");
    
    const watchList = await WatchList;
    const deleteResult = await watchList.deleteOne({ title: animeName, email: userEmail });

    console.log(deleteResult);
    res.send({});
});

export default watchListRouter;
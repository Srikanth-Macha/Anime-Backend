import { Request, Response, Router } from "express";
import { Favourites } from "../database/MongoDB";

const favouritesRouter = Router();

favouritesRouter.get("/getFavouritesData", async (req: Request, res: Response) => {
    const favourites = await Favourites;
    const email = req.query.email;

    const favouritesData = await favourites.find({ "email": email }).toArray();

    res.send(favouritesData);
});

favouritesRouter.post("/addToFavourites", async (req: Request, res: Response) => {
    const anime = req.body;
    const favourites = await Favourites;

    const insertResponse = await favourites.insertOne(anime);

    console.log(insertResponse);

    res.send(anime);
});


favouritesRouter.delete("/removeFromFavourites", async (req: Request, res: Response) => {
    const animeName = req.query.anime_name;
    const userEmail = req.query.email;

    console.log("DELETE");

    const favourites = await Favourites;
    const deleteResult = await favourites.deleteOne({ title: animeName, email: userEmail });

    console.log(deleteResult);
    res.send({});
});


export default favouritesRouter; 
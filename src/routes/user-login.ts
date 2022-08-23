import { hash, compare } from "bcryptjs";
import * as express from "express";
import { Users } from "../database/MongoDB";

const userRouter = express.Router();

userRouter.post("/addUser", async (req: express.Request, res: express.Response) => {
    const users = await Users;
    let insertResponse = null;
    const salt = req.body.password.length;

    var hashedString: string = await hash(req.body.password, salt);

    try {
        const usersArray = await users.find({ email: req.body.email }).toArray();

        if (usersArray.length == 0) {
            req.body.password = hashedString;
            insertResponse = await users.insertOne(req.body);

            console.log(insertResponse);

            res.send(req.body);
        }
        else {
            for (let i = 0; i < usersArray.length; i++) {
                const doc = usersArray[i];
                const check: boolean = await compare(req.body.password, doc.password);

                console.log(check);

                if (check) {
                    console.log(doc);
                    res.send(doc);
                }
            }

            if (!res.headersSent)
                res.send({});
        }

    } catch (err) {
        console.log(err);
    }
});

export default userRouter;
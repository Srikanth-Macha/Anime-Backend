"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MongoDB_1 = require("../database/MongoDB");
const router = (0, express_1.Router)();
router.get("/backup", async (req, res) => {
    const animeCollection = await MongoDB_1.AnimeCollection;
    const animeData = await animeCollection.find().toArray();
    let count = 0;
    for (const data of animeData) {
        const name = data.title;
        const id = data._id;
        if (!isLetter(name.charAt(0))) {
            console.log(name);
            animeCollection.deleteOne({ _id: id });
        }
    }
    res.send(count.toString());
});
exports.default = router;
function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
}

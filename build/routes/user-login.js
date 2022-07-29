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
const bcryptjs_1 = require("bcryptjs");
const express = __importStar(require("express"));
const MongoDB_1 = require("../database/MongoDB");
const userRouter = express.Router();
userRouter.post("/addUser", async (req, res) => {
    var users = await MongoDB_1.Users;
    var insertResponse = null;
    var salt = req.body.password.length;
    var hashedString = await (0, bcryptjs_1.hash)(req.body.password, salt);
    try {
        const usersArray = await users.find({ email: req.body.email }).toArray();
        if (usersArray.length == 0) {
            req.body.password = hashedString;
            insertResponse = await users.insertOne(req.body);
            res.send(req.body);
        }
        else {
            for (let i = 0; i < usersArray.length; i++) {
                const doc = usersArray[i];
                const check = await (0, bcryptjs_1.compare)(req.body.password, doc.password);
                console.log(check);
                if (check) {
                    console.log(doc);
                    res.send(doc);
                }
            }
            if (!res.headersSent)
                res.send({});
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = userRouter;

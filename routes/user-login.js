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
var bcryptjs_1 = require("bcryptjs");
var express = require("express");
var MongoDB_1 = require("../database/MongoDB");
var userRouter = express.Router();
userRouter.post("/addUser", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, insertResponse, salt, hashedString, usersArray, i, doc, check, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, MongoDB_1.Users];
            case 1:
                users = _a.sent();
                insertResponse = null;
                salt = req.body.password.length;
                return [4 /*yield*/, (0, bcryptjs_1.hash)(req.body.password, salt)];
            case 2:
                hashedString = _a.sent();
                _a.label = 3;
            case 3:
                _a.trys.push([3, 12, , 13]);
                return [4 /*yield*/, users.find({ email: req.body.email }).toArray()];
            case 4:
                usersArray = _a.sent();
                if (!(usersArray.length == 0)) return [3 /*break*/, 6];
                req.body.password = hashedString;
                return [4 /*yield*/, users.insertOne(req.body)];
            case 5:
                insertResponse = _a.sent();
                res.send(req.body);
                return [3 /*break*/, 11];
            case 6:
                i = 0;
                _a.label = 7;
            case 7:
                if (!(i < usersArray.length)) return [3 /*break*/, 10];
                doc = usersArray[i];
                return [4 /*yield*/, (0, bcryptjs_1.compare)(req.body.password, doc.password)];
            case 8:
                check = _a.sent();
                console.log(check);
                if (check) {
                    console.log(doc);
                    res.send(doc);
                }
                _a.label = 9;
            case 9:
                i++;
                return [3 /*break*/, 7];
            case 10:
                if (!res.headersSent)
                    res.send({});
                _a.label = 11;
            case 11: return [3 /*break*/, 13];
            case 12:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); });
exports["default"] = userRouter;

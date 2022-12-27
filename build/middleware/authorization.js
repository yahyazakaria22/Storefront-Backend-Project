"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var TOKEN_SECRET = process.env.TOKEN_SECRET;
var token_secret = TOKEN_SECRET || '';
var verifyAuthToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization || '';
        var token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, token_secret);
        next();
    }
    catch (error) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
};
exports.verifyAuthToken = verifyAuthToken;

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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var users_1 = require("../models/users");
var dotenv_1 = __importDefault(require("dotenv"));
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../index"));
var request = (0, supertest_1.default)(index_1.default);
dotenv_1.default.config();
var TOKEN_SECRET = process.env.TOKEN_SECRET;
var token_secret = TOKEN_SECRET || '';
var store = new users_1.UserStore();
describe('User Model', function () {
    it('should have an index method', function () {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', function () {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', function () {
        expect(store.create).toBeDefined();
    });
    it('should have a update method', function () {
        expect(store.put).toBeDefined();
    });
    it('should have a delete method', function () {
        expect(store.delete).toBeDefined();
    });
});
describe('User CRUD', function () {
    var token, user_Id, userIn_Id;
    var userIn2 = {
        username: 'test2',
        password: '1232',
    };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var userIn, Body, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userIn = {
                        username: 'test',
                        password: '123',
                    };
                    return [4 /*yield*/, request.post('/users').send(userIn)];
                case 1:
                    Body = (_a.sent()).body;
                    token = Body;
                    user = jsonwebtoken_1.default.verify(token, token_secret).user;
                    userIn_Id = user.id;
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .delete("/users/".concat(userIn_Id))
                        .set('Authorization', 'bearer ' + token)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets the /users endpoint', function (done) {
        request.get('/users').then(function (res) {
            expect(res.status).toBe(200);
            done();
        });
    });
    it('gets the /users/:id endpoint', function (done) {
        request.get("/users/".concat(userIn_Id)).then(function (res) {
            expect(res.status).toBe(200);
            done();
        });
    });
    it('add method test', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.create(userIn2)];
                case 1:
                    createUser = _a.sent();
                    user_Id = createUser.id;
                    expect(createUser.username).toEqual(userIn2.username);
                    return [4 /*yield*/, store.delete(user_Id.toString())];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('index method test', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createUser, users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.create(userIn2)];
                case 1:
                    createUser = _a.sent();
                    return [4 /*yield*/, store.index()];
                case 2:
                    users = _a.sent();
                    expect(users).toBeDefined;
                    return [4 /*yield*/, store.delete(user_Id.toString())];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('show method test', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createUser, userShow;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.create(userIn2)];
                case 1:
                    createUser = _a.sent();
                    user_Id = createUser.id;
                    return [4 /*yield*/, store.show(user_Id.toString())];
                case 2:
                    userShow = _a.sent();
                    expect(userShow).toEqual(createUser);
                    return [4 /*yield*/, store.delete(user_Id.toString())];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('update method test', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createUser, newUser, userShow;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.create(userIn2)];
                case 1:
                    createUser = _a.sent();
                    user_Id = createUser.id;
                    newUser = {
                        username: 'userUpdated',
                        password: '1234',
                    };
                    return [4 /*yield*/, store.put(user_Id.toString(), newUser.username, newUser.password)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, store.show(user_Id.toString())];
                case 3:
                    userShow = _a.sent();
                    expect(userShow.username).toEqual(newUser.username);
                    return [4 /*yield*/, store.delete(user_Id.toString())];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('delete method test', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createUser, userShow;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.create(userIn2)];
                case 1:
                    createUser = _a.sent();
                    user_Id = createUser.id;
                    return [4 /*yield*/, store.delete(user_Id.toString())];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, store.show(user_Id.toString())];
                case 3:
                    userShow = _a.sent();
                    expect(userShow).toBeNull;
                    return [4 /*yield*/, store.delete(user_Id.toString())];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});

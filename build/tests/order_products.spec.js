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
var orders_1 = require("../models/orders");
var products_1 = require("../models/products");
var order_products_1 = require("../models/order_products");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var users_1 = require("../models/users");
var dotenv_1 = __importDefault(require("dotenv"));
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../index"));
var request = (0, supertest_1.default)(index_1.default);
dotenv_1.default.config();
var TOKEN_SECRET = process.env.TOKEN_SECRET;
var token_secret = TOKEN_SECRET || '';
var store = new order_products_1.OrderProductsStore();
var userStore = new users_1.UserStore();
var orderStore = new orders_1.OrderStore();
var productStore = new products_1.ProductStore();
describe('Orders Product Model', function () {
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
describe('Order Products CRUD', function () {
    var token, user_Id = '1', order_id, userIn_Id;
    var order = {
        status: 'pending',
        user_id: user_Id,
    };
    var userIn = {
        username: 'test',
        password: '123',
    };
    var orderProduct = {
        quantity: 'string',
        order_id: 1,
        product_id: 1,
    };
    var product = {
        name: 'product1',
        price: 10,
    };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var userIn, userBody, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userIn = {
                        username: 'test',
                        password: '123',
                    };
                    return [4 /*yield*/, request.post('/users').send(userIn)];
                case 1:
                    userBody = (_a.sent()).body;
                    token = userBody;
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
    it('gets the /order_products endpoint', function (done) {
        request.get('/order_products').then(function (res) {
            expect(res.status).toBe(200);
            done();
        });
    });
    it('gets the /order_products/:id endpoint', function (done) {
        request.get("/order_products/".concat(user_Id)).then(function (res) {
            expect(res.status).toBe(200);
            done();
        });
    });
    it('add methods test', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createUser, createOrder, createProduct, createOrderProducts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userStore.create(userIn)];
                case 1:
                    createUser = _a.sent();
                    user_Id = createUser.id;
                    order = {
                        status: 'pending',
                        user_id: user_Id,
                    };
                    return [4 /*yield*/, orderStore.create(order)];
                case 2:
                    createOrder = _a.sent();
                    return [4 /*yield*/, productStore.create(product)];
                case 3:
                    createProduct = _a.sent();
                    order_id = createOrder.id;
                    orderProduct = {
                        quantity: '10',
                        order_id: order_id,
                        product_id: createProduct.id,
                    };
                    return [4 /*yield*/, store.create(orderProduct.quantity, orderProduct.order_id, orderProduct.product_id)];
                case 4:
                    createOrderProducts = _a.sent();
                    expect(createOrderProducts.quantity).toEqual(10);
                    return [4 /*yield*/, store.delete(order_id.toString())];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('index methods test', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createUser, createOrder, createProduct, createOrderProducts, indexOrderProducts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userStore.create(userIn)];
                case 1:
                    createUser = _a.sent();
                    user_Id = createUser.id;
                    order = {
                        status: 'pending',
                        user_id: user_Id,
                    };
                    return [4 /*yield*/, orderStore.create(order)];
                case 2:
                    createOrder = _a.sent();
                    return [4 /*yield*/, productStore.create(product)];
                case 3:
                    createProduct = _a.sent();
                    order_id = createOrder.id;
                    orderProduct = {
                        quantity: '10',
                        order_id: order_id,
                        product_id: createProduct.id,
                    };
                    return [4 /*yield*/, store.create(orderProduct.quantity, orderProduct.order_id, orderProduct.product_id)];
                case 4:
                    createOrderProducts = _a.sent();
                    return [4 /*yield*/, store.index()];
                case 5:
                    indexOrderProducts = _a.sent();
                    expect(indexOrderProducts).toBeTruthy;
                    return [4 /*yield*/, store.delete(createOrderProducts.id.toString())];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});

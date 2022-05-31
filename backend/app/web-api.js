"use strict";
/**
 * 2022 Patrik Forsberg <patrik.forsberg@coldmind.com>d
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.WebApi = void 0;
var express_1 = require("express");
var bodyParser = require("body-parser");
var express = require("express");
var cors_1 = require("cors");
var fileUpload = require("express-fileupload");
var tsyringe_1 = require("tsyringe");
var app_const_1 = require("./app.const");
var WebApi = /** @class */ (function () {
    function WebApi() {
        this.webRoutes = (0, express_1.Router)();
        this.initWebServer();
        this.listen();
    }
    WebApi.prototype.initWebServer = function () {
        console.log("Web Api initialize...");
        this.app = express();
        this.webRoutes.use(bodyParser.json());
        this.webRoutes.use(bodyParser.urlencoded({ extended: true }));
        this.webRoutes.use(fileUpload());
        this.webRoutes.use((0, cors_1["default"])());
        this.webRoutes.options('*', (0, cors_1["default"])());
        this.webRoutes.get("/", this.webRoot.bind(this));
        //this.webRoutes.post("/file-upload", this.onFileupload(this));
        // this.webRoutes.route('/file-upload').post(this.onFileupload);
        this.app.use(this.webRoutes);
    };
    WebApi.prototype.listen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        result = true;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, this.app.listen(app_const_1.Settings.listenPort, app_const_1.Settings.listenHost)];
                    case 2:
                        _a.server = _b.sent();
                        console.log("WebApi process successfully started :: ".concat(app_const_1.Settings.listenHost, ":").concat(app_const_1.Settings.listenPort));
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        console.error("Web Server :: bind :: error ::", err_1);
                        result = false;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, result];
                }
            });
        });
    };
    WebApi.prototype.webRoot = function (req, resp) {
        return __awaiter(this, void 0, void 0, function () {
            var test;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        test = {
                            kalle: "kula"
                        };
                        return [4 /*yield*/, resp.json(test)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WebApi.prototype.onFileupload = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var file;
            return __generator(this, function (_a) {
                console.log("onFileUpload");
                file = req['files'].thumbnail;
                console.log("File uploaded: ", file.name);
                return [2 /*return*/];
            });
        });
    };
    WebApi = __decorate([
        (0, tsyringe_1.injectable)()
    ], WebApi);
    return WebApi;
}());
exports.WebApi = WebApi;
new WebApi();

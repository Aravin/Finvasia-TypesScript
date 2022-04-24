"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.appConfig = {
    port: process.env.PORT || 3000,
    apiKey: process.env.API_KEY,
    basePath: process.env.FINVASIA_BASEPATH || 'https://shoonyatrade.finvasia.com/NorenWClientTP',
    apkVersion: process.env.FINVASIA_APK_VERSION || 'js:1.0.0',
    source: process.env.FINVASIA_SOURCE || 'API',
};

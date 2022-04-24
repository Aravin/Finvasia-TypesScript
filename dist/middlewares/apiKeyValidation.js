"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiKeyValidation = void 0;
var appConfig_1 = require("../config/appConfig");
var apiKeyValidation = function (req, res, next) {
    var apiKey = req.headers['x-api-key'];
    console.log(apiKey, appConfig_1.appConfig.apiKey);
    if (apiKey === appConfig_1.appConfig.apiKey) {
        next();
    }
    res.status(403).send('403 Forbidden');
};
exports.apiKeyValidation = apiKeyValidation;

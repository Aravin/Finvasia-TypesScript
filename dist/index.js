"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var serverless_http_1 = __importDefault(require("serverless-http"));
var express_1 = __importDefault(require("express"));
var http_errors_1 = __importDefault(require("http-errors"));
var appConfig_1 = require("./config/appConfig");
var helmet_1 = __importDefault(require("helmet"));
// routes
var login_1 = require("./routes/login");
var logout_1 = require("./routes/logout");
var search_1 = require("./routes/scripts/search");
var info_1 = require("./routes/scripts/info");
var quote_1 = require("./routes/scripts/quote");
var limit_1 = require("./routes/account/limit");
var list_1 = require("./routes/orders/list");
var position_1 = require("./routes/orders/position");
var trade_1 = require("./routes/orders/trade");
var place_1 = require("./routes/orders/place");
var apiKeyValidation_1 = require("./middlewares/apiKeyValidation");
var app = express_1.default();
app.use(express_1.default.json());
app.use(apiKeyValidation_1.apiKeyValidation);
app.use(helmet_1.default());
var port = appConfig_1.appConfig.port;
app.get('/', function (req, res) {
    res.send('Finvasia API Service!');
});
app.get('/test', function (req, res) {
    res.send('Test API Service!');
});
app.use('/login', login_1.router);
app.use('/logout', logout_1.router);
app.use('/scripts/search', search_1.router);
app.use('/scripts/info', info_1.router);
app.use('/scripts/quote', quote_1.router);
app.use('/account/limit', limit_1.router);
app.use('/orders/list', list_1.router);
app.use('/orders/position', position_1.router);
app.use('/orders/trade', trade_1.router);
app.use('/orders/place', place_1.router);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log('error middleware');
    res.status(err.status || 500).send(err.message);
});
app.listen(port, function () {
    console.log("Finvasia TypeScript app listening on port " + port);
});
module.exports.handler = serverless_http_1.default(app);

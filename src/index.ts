import serverless from 'serverless-http';
import express, { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { appConfig } from './config/appConfig';
import helmet from 'helmet';

// routes
import { router as loginRouter } from './routes/login';
import { router as logoutRouter } from './routes/logout';
import { router as searchScript } from './routes/scripts/search';
import { router as scriptInfo } from './routes/scripts/info';
import { router as scriptQuote } from './routes/scripts/quote';
import { router as accountLimit } from './routes/account/limit';
import { router as orderList } from './routes/orders/list';
import { router as ordersPosition } from './routes/orders/position';
import { router as ordersTrade } from './routes/orders/trade';
import { router as orderPlace } from './routes/orders/place';
import { apiKeyValidation } from './middlewares/apiKeyValidation';

const app = express();
app.use(express.json());
app.use(apiKeyValidation)
app.use(helmet())

const port = appConfig.port;

app.get('/', (req, res) => {
    res.send('Finvasia API Service!')
});

app.get('/test', (req, res) => {
    res.send('Test API Service!')
});

app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/scripts/search', searchScript);
app.use('/scripts/info', scriptInfo);
app.use('/scripts/quote', scriptQuote);
app.use('/account/limit', accountLimit);
app.use('/orders/list', orderList);
app.use('/orders/position', ordersPosition);
app.use('/orders/trade', ordersTrade);
app.use('/orders/place', orderPlace);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404));
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log('error middleware')
    res.status(err.status || 500).send(err.message);
});


// app.listen(port, () => {
//     console.log(`Finvasia TypeScript app listening on port ${port}`)
// });

module.exports.handler = serverless(app);

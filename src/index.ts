import express, { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { appConfig } from './config/appConfig';
import { router as loginRouter} from './routes/login';
import { router as logoutRouter} from './routes/logout';

const app = express();
app.use(express.json());
const port = appConfig.port;

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

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


app.listen(port, () => {
    console.log(`Finvasia TypeScript app listening on port ${port}`)
});

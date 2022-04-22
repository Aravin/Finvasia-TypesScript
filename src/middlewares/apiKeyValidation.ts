import { Request, Response, NextFunction } from 'express';
import { appConfig } from "../config/appConfig";

export const apiKeyValidation = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-api-key'];

    if (apiKey === appConfig.apiKey) {
        next()
    }
    
    res.status(403).send('403 Forbidden');
}
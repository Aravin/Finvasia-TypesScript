// official doc: https://www.finvasia.com/api-documentation#api-login
import axios from 'axios';
import { createHash } from 'crypto';
import { apiPath } from '../config/apiPath';
import { appConfig } from '../config/appConfig';
import express from 'express';

export const router = express.Router();

router.post('/', async (req, res) => {
    const result = await login(req.body);
    res.status(result.status).send(result.data);
});

const login = async (body: Record<string, any>) => {

    const pwdHash = createHash('sha256').update(body.pwd as string).digest('hex');
    const appKeyHash = createHash('sha256').update(`${body.userId}|${body.apiKey}`).digest('hex');

    const loginRequest = {
        apkversion: appConfig.apkVersion,
        uid: body.userId,
        pwd: pwdHash,
        factor2: body.factor2,
        vc: body.vc,
        imei: body.imei,
        source: appConfig.source,
        appkey: appKeyHash,
    };

    const jData = 'jData=' + JSON.stringify(loginRequest);

    try {
        const response =  await axios.post(appConfig.basePath + apiPath.login, jData);
        return { status: 200, data: response.data};
    }
    catch (err: any) {
        if (err.response) {
            console.log(err.response.status, err.response.data);
        } else if (err.request) {
            console.log(err.request);
        } else {
            console.log('Error', err.message);
        }
        // console.log(err.config); // for debug
        return { status: err.response.status || 500, data: err.response.data || err.message};
    }
};

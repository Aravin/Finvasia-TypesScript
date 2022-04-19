// https://www.finvasia.com/api-documentation#api-logout
import axios from 'axios';
import { apiPath } from '../../config/apiPath';
import { appConfig } from '../../config/appConfig';
import express from 'express';

export const router = express.Router();

router.post('/', async (req, res) => {
    const result = await searchScript(req.body);
    res.status(result.status).send(result.data);
});

const searchScript = async (body: Record<string, any>) => {

    const request = {
        uid: body.userId,
        stext: body.stext,
        exch: body.exch,
    };

    const jData = 'jData=' + JSON.stringify(request);
    const jKey = '&jKey=' + body.userToken;

    try {
        const response =  await axios.post(appConfig.basePath + apiPath.searchScript, jData + jKey);
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

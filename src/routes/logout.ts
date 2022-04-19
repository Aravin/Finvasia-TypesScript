// https://www.finvasia.com/api-documentation#api-logout
import axios from 'axios';
import { apiPath } from '../config/apiPath';
import { appConfig } from '../config/appConfig';
import express from 'express';

export const router = express.Router();

router.post('/', async (req, res) => {
    const result = await logout(req.body);
    res.status(result.status).send(result.data);
});

const logout = async (body: Record<string, any>) => {

    const loginRequest = {
        uid: body.userId,
    };

    const jData = 'jData=' + JSON.stringify(loginRequest);
    const jKey = '&jKey=' + body.userToken;

    try {
        const response =  await axios.post(appConfig.basePath + apiPath.logout, jData + jKey);
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

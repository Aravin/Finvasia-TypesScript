import axios from 'axios';
import { apiPath } from './config/apiPath';
import { appConfig } from './config/appConfig';
import { createHash } from 'crypto';

const login = async () => {

    const pwdHash = createHash('sha256').update(appConfig.pwd as string).digest('hex');
    const vendorCodeHash = createHash('sha256').update(appConfig.userId as string).digest('hex');

    const loginRequest = {
        apkversion: appConfig.apkVersion,
        uid: appConfig.userId,
        pwd: pwdHash,
        factor2: appConfig.login2fa,
        vc: appConfig.vendorCode,
        imei: appConfig.imei,
        source: appConfig.source,
        appKey: vendorCodeHash,
    };

    const jData = 'jData=' + JSON.stringify(loginRequest);

    try {
        const result = await axios.post(appConfig.basePath + apiPath.login, jData);
        console.log(result);
    }
    catch (err: any) {
        console.log(err);
    }
};

login();

import dotenv from 'dotenv';
dotenv.config();

export const appConfig = {
    userId: process.env.FINVASIA_USERID,
    pwd: process.env.FINVASIA_PWD,
    login2fa: process.env.FINVASIA_2FA,
    vendorCode: process.env.FINVASIA_VENDOR_CODE,
    apiKey: process.env.FINVASIA_API_KEY,
    imei: process.env.FINVASIA_IMEI,
    token: process.env.FINVASIA_TOKEN,
}

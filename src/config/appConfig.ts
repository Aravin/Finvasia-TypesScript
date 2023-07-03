import dotenv from 'dotenv';
dotenv.config();

export const appConfig = {
    port: process.env.PORT || 3000,
    apiKey: process.env.API_KEY,
    basePath: process.env.FINVASIA_BASEPATH || 'https://api.shoonya.com/NorenWClientTP',
    apkVersion: process.env.FINVASIA_APK_VERSION || 'js:1.0.0',
    source: process.env.FINVASIA_SOURCE || 'API',
}

import axios from 'axios';
import jsSHA from 'jssha';

const service = axios.create({
    // baseURL: 'https://ptx.transportdata.tw/MOTC'
});

function GetAuthorizationHeader() {
    let AppID = 'e3c094ff4237499c94407751d39cef1a';
    let AppKey = '1VHLF8NU_sKTMF88LeGX5V4yb3I';

    let GMTString = new Date().toGMTString();
    let ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    let HMAC = ShaObj.getHMAC('B64');
    let Authorization =
        'hmac username="' +
        AppID +
        '", algorithm="hmac-sha1", headers="x-date", signature="' +
        HMAC +
        '"';

    return { Authorization: Authorization, 'X-Date': GMTString /*,'Accept-Encoding': 'gzip'*/ }; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
}

service.interceptors.request.use(
    config => {
        // console.log(config);
        config.headers.Authorization = GetAuthorizationHeader();
        return config;
    },
    error => {
        console.error('Axios request error: ' + error);
        return Promise.resolve(error);
    }
);

service.interceptors.response.use(
    response => {
        const res = response.data;
        // console.log(res);
        return res;
    },
    error => {
        console.log('catch errrrrrr');
        console.error('Axios response error: ' + error);
        return Promise.resolve(error);
    }
);

export default service;

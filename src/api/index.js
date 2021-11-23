import request from '@/utils/request.js';

export function getAllCities() {
    return request({
        url: 'https://gist.motc.gov.tw/gist_api/V3/Map/Basic/City?$format=JSON',
        method: 'get'
    });
}

export function getCityBus(data) {
    return request({
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/Taichung?$format=JSON`,
        method: 'get',
        data
    });
}

export function getArrivalTime(data) {
    return request({
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/Streaming/City/${data.City}/${data.RouteName}`,
        method: 'get',
        data
    });
}

export function getNearByStops(data) {
    return request({
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Stop/NearBy?$top=30&$spatialFilter=nearby(24.9966271%2C%20121.5041027%2C%20200)&$format=JSON`,
        method: 'get',
        data
    });
}

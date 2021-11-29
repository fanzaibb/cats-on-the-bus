import request from '@/utils/request.js';

export function getAllCities() {
    return request({
        url: 'https://gist.motc.gov.tw/gist_api/V3/Map/Basic/City?$format=JSON',
        method: 'get'
    });
}

export function getCityBus(city) {
    return request({
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${city}?$format=JSON`,
        method: 'get'
    });
}

export function getArrivalTime(data) {
    console.log(data);
    const params = {
        $format: 'JSON',
        $filter: `RouteUID eq \'${data.route.RouteUID}\'`,
        $orderby: 'StopSequence asc'
    };
    return request({
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/${data.city}`,
        method: 'get',
        params
    });
}

export function getStopInfo(data) {
    console.log(data.route.name);
    const params = {
        $format: 'JSON'
    };
    return request({
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/${data.city}/${data.route.name}`,
        method: 'get',
        params
    });
}

export function getNearByStops(data) {
    const params = {
        $format: 'JSON',
        $top: 30,
        $spatialFilter: `nearby(${data}, 500)`
    };
    console.log(params)
    return request({
        url: 'https://ptx.transportdata.tw/MOTC/v2/Bus/Stop/NearBy',
        method: 'get',
        params
    });
}

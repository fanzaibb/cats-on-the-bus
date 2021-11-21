import request from '@/utils/request.js';

export function getAllCities() {
  return request({
    url: 'https://gist.motc.gov.tw/gist_api/V3/Map/Basic/City?$format=JSON',
    method: 'get'
  });
}

export function getCityBus(data) {
  return request({
    url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${data.City}?$top=30&$format=JSON`,
    method: 'get',
    data
  });
}

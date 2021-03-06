import { createStore } from 'vuex';
import { getArrivalTime, getCityBus, getStopInfo } from '@/api';
import mockRoute from './mockRoute.json';
import mockInfo from './mockInfo.json';

export default createStore({
    state: {
        path: '',
        openSelect: false,
        currentCity: {},
        allBus: [],
        routeData: [],
        stopInfo: {},
        location: [],
        currentRoute: {}
    },
    mutations: {
        SET_PATH(state, path) {
            state.path = path;
        },
        SET_CITY(state, city) {
            state.currentCity = city;
        },
        SET_BUS(state, list) {
            state.allBus = list;
        },
        SET_ROUTE(state, data) {
            state.routeData = data;
        },
        SET_STOP_INFO(state, data) {
            state.stopInfo = data;
        },
        SET_SELECT(state, value) {
            state.openSelect = value;
        },
        SET_LOCATION(state, arr) {
            state.location = arr;
        },
        SET_CURRENT_ROUTE(state, data) {
            state.currentRoute = data;
        }
    },
    actions: {
        setPath({ commit }, path) {
            commit('SET_PATH', path);
        },
        setSelect({ commit }, value) {
            commit('SET_SELECT', value);
        },
        setLocation({ commit }, arr) {
            commit('SET_LOCATION', arr);
        },
        async getAllBus({ state, commit }, city) {
            commit('SET_CITY', city);
            const res = await getCityBus(city.City);
            res.forEach(e => (e.name = e.RouteName.Zh_tw));
            commit('SET_BUS', res);
        },
        async getRoute({ state, commit }, payload) {
            const param = { city: state.currentCity.City, route: payload };
            const routeSchedule = await getArrivalTime(param);
            // const routeSchedule = mockRoute;
            const allStops = await getStopInfo(param);
            // const allStops = mockInfo;
            // console.log(allStops);
            const obj = {};
            allStops.forEach(e => {
                if (e.Direction === 0) obj.forward = [...e.Stops];
                else obj.backward = [...e.Stops];
            });
            const now = Date.now();
            routeSchedule.forEach(e => {
                if (e.EstimateTime === 0) e.arrival = e.EstimateTime;
                else
                    e.arrival =
                        e.EstimateTime / 60 ||
                        Math.round((Date.parse(e.NextBusTime) - now) / 1000 / 60);
            });
            commit('SET_CURRENT_ROUTE', payload);
            commit('SET_ROUTE', routeSchedule);
            commit('SET_STOP_INFO', obj);
        },
        resetRoute({ commit }) {
            commit('SET_LOCATION', []);
            commit('SET_CURRENT_ROUTE', []);
        }
    }
});

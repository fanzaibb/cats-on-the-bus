import { createStore } from 'vuex';
import { getArrivalTime, getCityBus, getStopInfo } from '@/api';
import mockRoute from './mockRoute.json';
import mockInfo from './mockInfo.json';

export default createStore({
    state: {
        path: '',
        allBus: [],
        routeData: [],
        stopInfo: {}
    },
    mutations: {
        SET_PATH(state, path) {
            state.path = path;
        },
        SET_BUS(state, path) {
            state.path = path;
        },
        SET_ROUTE(state, data) {
            state.routeData = data;
        },
        SET_STOP_INFO(state, data) {
            state.stopInfo = data;
        }
    },
    actions: {
        setPath({ commit }, path) {
            commit('SET_PATH', path);
        },
        async getAllBus({ commit }) {
            const res = await getCityBus();
            commit('SET_BUS', res);
        },
        async getRoute({ commit }, payload) {
            const routeSchedule = await getArrivalTime(payload);
            // mockRoute.sort(function (a, b) {
            //     return a.StopSequence > b.StopSequence ? 1 : -1;
            // });
            // const routeInfo = await getStopInfo();
            const obj = {};
            mockInfo.forEach(e => {
                if (e.Direction === 0) obj.forward = [...e.Stops];
                else obj.backward = [...e.Stops];
            });
            const now = Date.now();
            routeSchedule.forEach(e => {
                e.arrival = Math.round((Date.parse(e.NextBusTime) - now) / 1000 / 60);
            });
            commit('SET_ROUTE', routeSchedule);
            commit('SET_STOP_INFO', obj);
        }
    },
    getters: {}
});

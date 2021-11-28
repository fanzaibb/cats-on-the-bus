import { createStore } from 'vuex';
// import request from '@/utils/request.js';

export default createStore({
    state: {
        path: ''
    },
    mutations: {
        SET_PATH(state, path) {
            state.path = path;
        }
    },
    actions: {
        setPath({ commit }, path) {
            commit('SET_PATH', path);
        }
    },
    getters: {}
});

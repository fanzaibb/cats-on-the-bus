import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior() {
        return { top: 0 };
    },
    routes: [,
        {
            path: '/',
            component: () => import('@/views/Home.vue')
        },
        {
            path: '/',
            component: () => import('@/components/HelloWorld.vue'),
            children: [
                {
                    path: 'bus_search',
                    component: () => import('@/components/BusSearch.vue')
                },
                {
                    path: 'nearby_stop',
                    component: () => import('@/components/NearbyStop.vue')
                },
                {
                    path: 'route_search',
                    component: () => import('@/components/RouteSearch.vue')
                }
                // {
                //     path: 'live_route',
                //     component: () => import('@/components/LiveRoute.vue')
                // }
            ]
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    store.dispatch('setPath', to.path);
    next();
});

export default router;

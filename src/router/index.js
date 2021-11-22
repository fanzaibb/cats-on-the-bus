import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior() {
        return { top: 0 };
    },
    routes: [
        {
            path: '/',
            component: () => import('@/components/HelloWorld.vue')
        },
        {
            path: '/home',
            component: () => import('@/views/Home.vue')
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    next();
});

export default router;

<script setup>
import Map from '@/components/Map.vue';
import { getNearByStops } from '@/api';
import { cities, routes } from '@/utils/cities.json';
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import tc from '@/utils/tc.json';

console.log(tc.map(e => e.RouteName));
const router = useRouter();

const showMMenu = ref(false);
const toggleMenu = () => (showMMenu.value = !showMMenu.value);
</script>

<template>
    <div id="map-page">
        <div class="logo" @click="router.push('/home')">
            <img src="@/assets/logo.svg" alt="" />
        </div>
        <div class="icons">
            <div class="mb-10" @click="router.push('/nearby_stop')">
                <img src="@/assets/sidebar-stop.svg" alt="" width="60" />
            </div>
            <div class="mb-10" @click="router.push('/bus_search')">
                <img src="@/assets/bus-icon.svg" alt="" width="50" class="mx-auto" />
            </div>
            <div @click="router.push('/route_search')">
                <img src="@/assets/map-icon.svg" alt="" width="50" class="mx-auto" />
            </div>
        </div>
        <div class="menu" @click="toggleMenu">&#9776;</div>
    </div>
    <teleport to="body">
        <transition name="slide">
            <div v-if="showMMenu" class="m-icons">
                <div @click="router.push('/nearby_stop')">
                    <img src="@/assets/sidebar-stop.svg" alt="" width="50" />
                    <p>附近站牌</p>
                </div>
                <div @click="router.push('/bus_search')">
                    <img src="@/assets/bus-icon.svg" alt="" width="50" />
                    <p>公車查詢</p>
                </div>
                <div @click="router.push('/route_search')">
                    <img src="@/assets/map-icon.svg" alt="" width="50" />
                    <p>路線查詢</p>
                </div>
            </div>
        </transition>
    </teleport>
    <router-view></router-view>
    <Map />
</template>

<style lang="scss">
#map-page {
    z-index: 999;
    @media (max-width: 767px) {
        @apply bg-white w-full absolute top-0 left-0 flex justify-between px-8 pt-3;
        height: 91px;
        .logo {
            @apply w-16 cursor-pointer;
        }
        .icons {
            display: none;
        }
    }
    @media (min-width: 768px) {
        @apply bg-white w-24 h-full absolute top-0 left-0 flex items-center justify-center;
        .logo {
            @apply w-16 absolute top-2 cursor-pointer;
        }
        .icons {
            div {
                @apply cursor-pointer;
            }
        }
    }
}

.menu {
    @media (max-width: 767px) {
        @apply text-orange text-5xl pt-2 w-16;
    }
    @media (min-width: 768px) {
        display: none;
    }
}

.m-icons {
    @apply bg-white h-full w-full absolute left-0 p-6 pt-16 pl-8;
    top: 87px;
    z-index: 5000;
    div {
        @apply pb-6 flex justify-center;
        p {
            @apply py-3 text-black font-medium text-lg px-10;
        }
    }
}
.slide-leave-active,
.slide-enter-active {
    transition: all 0.9s ease;
}

.slide-leave-to,
.slide-enter-from {
    transform: translateX(-100%);
}
</style>

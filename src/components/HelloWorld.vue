<script setup>
// import BusSearch from '@/components/BusSearch.vue';
// import RouteSearch from '@/components/RouteSearch.vue';
// import NearByStop from '@/components/NearByStop.vue';
import Map from '@/components/Map.vue';
import { getNearByStops } from '@/api';
import { cities, routes } from '@/utils/cities.json';
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import tc from '@/utils/tc.json';

console.log(tc.map(e => e.RouteName));
const router = useRouter();
const backToHome = () => router.push('/home');
</script>

<template>
    <div id="map-page" class="" style="z-index: 999">
        <div class="w-16 absolute top-2 cursor-pointer" @click="backToHome">
            <img src="@/assets/logo.svg" alt="" />
        </div>
        <div>
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
    </div>
    <!-- <BusSearch /> -->
    <!-- <RouteSearch /> -->
    <!-- <NearByStop /> -->
    <router-view></router-view>
    <Map />
</template>

<style lang="scss" scoped>
#map-page {
    @apply bg-white w-24 h-full absolute top-0 left-0 flex items-center justify-center;
}
</style>

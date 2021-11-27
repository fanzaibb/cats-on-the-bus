<script setup>
// import BusSearch from '@/components/BusSearch.vue';
// import RouteSearch from '@/components/RouteSearch.vue';
import NearByStop from '@/components/NearByStop.vue';
import Map from '@/components/Map.vue';
import { getNearByStops } from '@/api';
import { cities, routes } from '@/utils/cities.json';
import { ref, onMounted, reactive } from 'vue';
import tc from '@/utils/tc.json';

console.log(tc.map(e => e.RouteName));

const setNearByStops = async () => {
    const res = await getNearByStops();
    res.forEach((e, index) => {
        // 待補：只顯示不同定位的最多五筆
        if (index < 5) {
            L.marker([e.StopPosition.PositionLat, e.StopPosition.PositionLon], {
                icon: nearByIcon
            })
                .addTo(mymap)
                .bindTooltip(e.StopName.Zh_tw)
                .openTooltip();
            console.log(e);
        }
    });
};
</script>

<template>
    <div id="map-page" class="" style="z-index: 999">
        <div class="w-16 absolute top-2">
            <img src="@/assets/logo.svg" alt="" />
        </div>
        <div>
            <div class="mb-10">
                <img src="@/assets/sidebar-stop.svg" alt="" width="60" />
            </div>
            <div class="mb-10">
                <img src="@/assets/bus-icon.svg" alt="" width="50" class="mx-auto" />
            </div>
            <div class="">
                <img src="@/assets/map-icon.svg" alt="" width="50" class="mx-auto" />
            </div>
        </div>
    </div>
    <!-- <BusSearch /> -->
    <!-- <RouteSearch /> -->
    <NearByStop />
    <Map />
</template>

<style lang="scss" scoped>
#map-page {
    @apply bg-white w-24 h-full absolute top-0 left-0 flex items-center justify-center;
}
</style>

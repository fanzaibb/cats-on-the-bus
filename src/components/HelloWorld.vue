<script setup>
import Sheet from '@/components/Sheet.vue';
import Map from '@/components/Map.vue';
import { getNearByStops } from '@/api';
import { cities, routes } from '@/utils/cities.json';
import { ref, onMounted, reactive } from 'vue';
import tc from '@/utils/tc.json';

console.log(tc.map(e => e.RouteName));
const textList = ['繞', '區', '延', '副', '黃', '綠', 'W', 'E', 'A'];

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
        <div>
            <div class="w-10 h-10 mb-12">
                <img src="@/assets/map-icon.svg" alt="" />
            </div>
            <div class="w-10 h-10">
                <img src="@/assets/bus-icon.svg" alt="" />
            </div>
            <button @click="setNearByStops">123</button>
        </div>
    </div>
    <Sheet />
    <Map />
</template>

<style lang="scss" scoped>
#map-page {
    @apply bg-white w-24 h-full absolute top-0 left-0 flex items-center justify-center;
}
</style>

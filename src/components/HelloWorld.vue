<script setup>
import sheet from '@/components/Sheet.vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getAllCities, getCityBus, getNearByStops } from '@/api';
import { cities, routes } from '@/utils/cities.json';
import { ref, onMounted, reactive } from 'vue';
import tc from '@/utils/tc.json';

console.log(tc.map(e => e.RouteName));
const textList = ['繞', '區延副黃綠', 'WEA'];
const count = ref(0);
const cityList = ref([]);
const busList = ref([]);
const toggle = ref(false);
const chooseVal = ref('選擇城市');

const getCities = async () => {
    // const res = await getAllCities();
    cityList.value = cities;
};
getCities();
const pos = ref([]);
var x = document.getElementById('demo');
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = 'Geolocation is not supported by this browser.';
    }
}

function showPosition(position) {
    console.log(position);
    pos.value = [position.coords.latitude, position.coords.longitude];
    console.log(pos.value);
    console.log(mymap);
    mymap.setView(pos.value, 13);
    // x.innerHTML =
    //     'Latitude: ' + position.coords.latitude + '<br>Longitude: ' + position.coords.longitude;
}

const switchToggle = () => (toggle.value = !toggle.value);
const selectCity = async city => {
    chooseVal.value = city.CityName;
    busList.value = routes;
    // const res = await getCityBus();
    // console.log(busList.value);
    // console.log(res);
};
selectCity(1);
let mymap;

let myIcon = reactive(
    L.icon({
        iconUrl: 'src/assets/locate.svg',
        iconSize: [38, 95],
        iconAnchor: [20, 54],
        popupAnchor: [-3, -76],
        riseOnHover: true,
        shadowUrl: 'src/assets/locate-2.svg',
        shadowSize: [68, 95],
        shadowAnchor: [35, 54]
    })
);
let nearByIcon = reactive(
    L.icon({
        iconUrl: 'src/assets/locate-bus.svg',
        iconSize: [38, 95],
        iconAnchor: [20, 54],
        popupAnchor: [-3, -76],
        riseOnHover: true,
        shadowUrl: 'src/assets/locate-bus2.svg',
        shadowSize: [68, 95],
        shadowAnchor: [35, 54]
    })
);

const setNearByStops = async () => {
    const res = await getNearByStops();
    res.forEach((e, index) => {
        // 待補：只顯示不同定位的最多五筆
        if (index < 5) {
            L.marker([e.StopPosition.PositionLat, e.StopPosition.PositionLon], {
                icon: nearByIcon
            }).addTo(mymap).bindTooltip(e.StopName.Zh_tw).openTooltip();
            console.log(e);
        }

        // let popup = L.popup({ className: 'stop-name-tag' })
        //     .setLatLng([e.StopPosition.PositionLat, e.StopPosition.PositionLon])
        //     .setContent(e.StopName.Zh_tw)
        //     .openOn(mymap);
    });
};
onMounted(() => {
    mymap = L.map('map').setView([24.9966271, 121.5041027], 16);
    L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
        {
            attribution:
                'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'fanzaibb/ckw8m6n2n5tul15o6m50qgefa',
            tileSize: 512,
            zoomOffset: -1,
            accessToken:
                'pk.eyJ1IjoiZmFuemFpYmIiLCJhIjoiY2t3OGxzdHF5Y3M2bjJ1cTE3NXpwNThvNyJ9.Ev_Nzbzssxl5qWd-qVW2uQ'
        }
    ).addTo(mymap);
    L.marker([24.9966271, 121.5041027], { icon: myIcon }).addTo(mymap);
    // marker.bindTooltip("my tooltip text").openTooltip();
});
</script>

<template>
    <div
        id="map-page"
        class="bg-white w-24 h-full absolute top-0 left-0 flex items-center justify-center"
        style="z-index: 999"
    >
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

    <div id="select" class="input-wrapper pointer" @click="switchToggle">
        <div style="display: flex">
            <slot name="title">{{ chooseVal }}</slot>
        </div>
    </div>
    <teleport v-if="toggle" to="#select">
        <transition id="option">
            <div v-show="toggle" class="option-wrapper">
                <div
                    v-for="city in cityList"
                    :key="city.CityName"
                    class="select-btn pointer"
                    @click="selectCity(city)"
                >
                    {{ city.CityName }}
                </div>
            </div>
        </transition>
    </teleport>
    <sheet />
    <div id="map"></div>
</template>

<style lang="scss" scoped>
#select {
    position: absolute;
    top: 0;
    left: 100px;
    z-index: 100;
}

.expand {
    transform: rotate(180deg);
}

.select-btn {
    &:hover {
        color: gray;
        background-color: pink;
        border-radius: 20px;
        padding-top: 4px;
    }
}

.input-wrapper {
    position: relative;
    width: 260px;
    margin: 23px 0;
    border: 1px solid goldenrod;
}

.option-wrapper {
    position: absolute;
    width: 100px;
    height: 200px;
    overflow: auto;
    top: 30px;
    left: 20px;
    z-index: 9999;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
    padding: 10px;
    background-color: white;
    border-radius: 20px;
    div {
        height: 32px;
    }
}
#map {
    height: 100vh;
    margin-left: 100px;

    .leaflet-marker-icon {
        animation: moveInBottom 5s ease-out;
        animation-fill-mode: backwards;
    }

    @keyframes moveInBottom {
        0% {
            opacity: 0;
            transform: scaleX(1.4) scaleY(1.6);
            // transform: translateY(30px);
        }

        100% {
            opacity: 1;
            transform: translateY(0px);
        }
    }
    :deep(.stop-name-tag) {
        // bottom: 32px !important;
    }
}
</style>

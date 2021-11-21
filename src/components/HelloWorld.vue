<script setup>
import { getAllCities, getCityBus } from '@/api';
import { cities, routes } from '@/utils/cities.json';
import { ref } from 'vue';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import { ref, onMounted } from 'vue';

defineProps({
    msg: String
});

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

const switchToggle = () => (toggle.value = !toggle.value);
const selectCity = async city => {
    chooseVal.value = city.CityName;
    busList.value = routes;
    // const res = await getCityBus(city);
    console.log(busList.value);
};

onMounted(() => {
    var mymap = L.map('map').setView([51.505, -0.09], 13);
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
});
</script>

<template>
    <h1>{{ msg }}</h1>

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
    <div id="map"></div>
</template>

<style lang="scss" scoped>
a {
    color: #42b983;
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
    height: 360px;
}
</style>

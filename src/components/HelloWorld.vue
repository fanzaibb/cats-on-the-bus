<script setup>
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import { ref, onMounted } from 'vue';

defineProps({
    msg: String
});

const count = ref(0);

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

    <div id="map"></div>
</template>

<style scoped>
a {
    color: #42b983;
}

#map {
    height: 360px;
}
</style>

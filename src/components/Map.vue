<script setup>
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getNearByStops } from '@/api';
import { ref, onMounted, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import mockInfo from '@/store/mockInfo.json';

const store = useStore();
const info = computed(() => store.state.stopInfo?.forward);
const pos = ref([]);

const test = mockInfo[0].Stops;
const lineList = mockInfo[0].Stops.map(e => [
    e.StopPosition.PositionLon,
    e.StopPosition.PositionLat
]);
let lineLayer;
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
        iconUrl: 'src/assets/locate-dot.svg',
        iconSize: [30, 125],
        iconAnchor: [20, 54],
        popupAnchor: [-3, -76],
        riseOnHover: true,
        // shadowUrl: 'src/assets/locate-bus2.svg',
        // shadowSize: [68, 95],
        // shadowAnchor: [35, 54]
    })
);

const myLines = [
    {
        type: 'LineString',
        coordinates: lineList
    }
];

var geojsonFeature = {
    type: 'Feature',
    properties: {
        name: 'Coors Field',
        amenity: 'Baseball Stadium',
        popupContent: 'This is where the Rockies play!'
    },
    geometry: {
        type: 'LineString',
        coordinates: lineList
    }
};

const myStyle = {
    color: '#FFD588',
    weight: 4,
    opacity: 1
};

const showAllStops = list => {
    list.forEach(e => {
        // console.log(e);
        L.marker([e.StopPosition.PositionLat, e.StopPosition.PositionLon], {
            icon: nearByIcon
        })
            .addTo(mymap)
            .bindTooltip(e.StopName.Zh_tw);
        // .openTooltip();
    });
};

const setNearByStops = async () => {
    const res = await getNearByStops();
    res.forEach((e, index) => {
        // 待補：只顯示不同定位的最多五筆
        if (index < 5) {
            L.marker([e.StopPosition.PositionLat, e.StopPosition.PositionLon], {
                icon: nearByIcon
            }).addTo(mymap);
            // .bindTooltip(e.StopName.Zh_tw)
            console.log(e);
        }

        // let popup = L.popup({ className: 'stop-name-tag' })
        //     .setLatLng([e.StopPosition.PositionLat, e.StopPosition.PositionLon])
        //     .setContent(e.StopName.Zh_tw)
        //     .openOn(mymap);
    });
};
onMounted(() => {
    mymap = L.map('map').setView([22.606123, 120.338443], 14);
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

    mymap.zoomControl.setPosition('bottomright');


    lineLayer = L.geoJSON(myLines, {
        style: myStyle
    }).addTo(mymap);

    // L.geoJSON(geojsonFeature, {
    //     style: myStyle
    // }).addTo(mymap);

    // lineLayer = L.geoJSON(geojsonFeature).addTo(mymap);
    // lineLayer.addData(geojsonFeature);

    mymap.fitBounds(lineLayer.getBounds());
    // L.marker([24.9966271, 121.5041027], { icon: myIcon }).addTo(mymap);
    // marker.bindTooltip("my tooltip text").openTooltip();
    showAllStops(test);
});
</script>

<template>
    <div id="map"></div>
</template>

<style lang="scss" scoped>
#map {
    height: 100vh;
    @media (min-width: 768px) {
        margin-left: 100px;
    }

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

    @media (max-width: 767px) {
        :deep(.leaflet-top) {
            display: none;
        }
    }
}
</style>

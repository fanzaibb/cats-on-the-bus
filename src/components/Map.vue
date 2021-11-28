<script setup>
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { ref, onMounted, reactive, computed, watch, watchEffect } from 'vue';
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
const map = ref(null);
let lineLayer;
const location = computed(() => {
    if (store.state.location.length !== 0) map.value.classList.remove('show-blur');
    return store.state.location;
});

watchEffect(
    () => {
        if (location.value.length !== 0) {
            showAllStops(test);
            drawRouteLine(lineList)
            // setNearByStops();
        }
        // stop();
    }
);

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
        riseOnHover: true
        // shadowUrl: 'src/assets/locate-bus2.svg',
        // shadowSize: [68, 95],
        // shadowAnchor: [35, 54]
    })
);

const showAllStops = list => {
    list.forEach(e => {
        L.marker([e.StopPosition.PositionLat, e.StopPosition.PositionLon], {
            icon: nearByIcon
        })
            .addTo(mymap)
            .bindTooltip(e.StopName.Zh_tw);
        // .openTooltip();
    });
};

const setNearByStops = async () => {
    mockInfo.forEach((e, index) => {
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

const drawRouteLine = lineList => {
    lineLayer = L.geoJSON(
        {
            type: 'LineString',
            coordinates: lineList
        },
        {
            style: {
                color: '#FFD588',
                weight: 4,
                opacity: 1
            }
        }
    ).addTo(mymap);
    mymap.fitBounds(lineLayer.getBounds());
};


const showBlur = computed(() => location.value.length === 0);

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

    // L.marker([24.9966271, 121.5041027], { icon: myIcon }).addTo(mymap);
    // marker.bindTooltip("my tooltip text").openTooltip();
    // showAllStops(test);
});
</script>

<template>
    <div ref="map" id="map" class="show-blur"></div>
</template>

<style lang="scss" scoped>
#map {
    height: 100vh;
    &.show-blur {
        background: hsla(0, 0%, 100%, 0.3);
        filter: blur(3px);
    }
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

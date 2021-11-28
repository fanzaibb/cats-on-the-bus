<script setup>
// import { getNearByStops } from '@/api';
import { useStore } from 'vuex';
import { ref } from 'vue';

const store = useStore();
const pos = ref([]);
var x = document.getElementById('demo');
const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = 'Geolocation is not supported by this browser.';
    }
};

const showPosition = async position => {
    pos.value = [position.coords.longitude, position.coords.latitude];
    store.dispatch('setLocation', pos.value);
    // const res = await getNearByStops(pos.value);
    // mymap.setView(pos.value, 13);
    // x.innerHTML =
    //     'Latitude: ' + position.coords.latitude + '<br>Longitude: ' + position.coords.longitude;
};

getLocation();
</script>

<template>
    <div class="sheet-wrapper">
        <div class="sheet input-sheet flex-grow-0">
            <div class="relative flex items-center pr-8">
                <img
                    src="@/assets/locate.svg"
                    alt="search icon"
                    class="pt-2 pr-2 pl-3"
                    width="52"
                />
                <label for="currentPosition">目前所在</label>
                <input type="text" placeholder="你的位置" id="currentPosition" />
            </div>
        </div>
        <div class="sheet flex-grow-1 py-7">
            <section>
                <h2 class="title">景新路口</h2>
                <div class="title-shadow"></div>
                <div class="px-6 pt-6 flex flex-wrap">
                    <div v-for="i in 8" :key="i" class="pill">101</div>
                </div>
            </section>
        </div>
        <!-- <div class="sheet fav-sheet flex-grow relative">
            <div class="no-fav">
                <img src="@/assets/no-locate.svg" alt="no-fav" class="mx-auto" />
                <p>你目前沒開啟定位</p>
                <p>或者手動輸入地址</p>
                <button>打開定位</button>
            </div>
        </div> -->
    </div>
</template>

<style lang="scss" scoped>
.sheet-wrapper {
    @apply absolute flex flex-col;
    top: 12px;
    left: 154px;
    z-index: 800;
    height: 96vh;
    .sheet {
        @apply bg-white rounded-2xl mb-4;
        width: 409px;
        box-shadow: 0px 8px 10px rgba(255, 197, 90, 0.25);
    }

    .input-sheet {
        @apply flex flex-col justify-center p-10;
        height: 83px;
        input {
            @apply text-base relative font-medium pt-3 pl-1;
            outline: none;
            width: 276px;
            border-color: #eeeeee;
            height: 36px;
            background-color: transparent;
        }

        label {
            @apply absolute top-0 left-14 font-medium text-gray-4 text-sm;
        }
    }

    section {
        @apply relative;
        .title {
            @apply text-xl bg-white py-3;
            width: 150px;
            position: relative;
            z-index: 3;
        }
        .title-shadow {
            @apply rounded-full;
            width: 64px;
            height: 64px;
            position: absolute;
            top: 12px;
            left: 40px;
            z-index: 0;
            background: linear-gradient(90deg, #cccccc 4.9%, rgba(204, 204, 204, 0) 100%);
            filter: blur(20px);
            transform: rotate(90deg);
        }

        .pill {
            @apply rounded-full bg-gray-5 text-gray-2 font-medium pt-2 text-sm ml-2 mb-2;
            width: 80px;
            height: 32px;
        }
    }
    .fav-sheet {
        @apply overflow-auto;
        max-height: 523px;
        background-color: #ffffff;
        background-image: url('@/assets/no-fav-bg.svg');
        background-size: cover;
        background-position: center;
        .no-fav {
            width: 300px;
            @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-medium break-normal;

            button {
                @apply text-white rounded-lg bg-orange mt-4  font-medium;
                width: 120px;
                height: 40px;
            }
        }
    }
}
</style>

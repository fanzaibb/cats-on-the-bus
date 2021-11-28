<script setup>
import { getAllCities, getCityBus } from '@/api';
import { cities, routes } from '@/utils/cities.json';
import { ref, defineProps, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

defineProps({
    type: {
        type: String,
        defalt: 'web'
    }
});
const store = useStore();
const list = cities;
const toggle = computed(() => store.state.openSelect);
const chooseVal = computed(() => store.state.currentCity);

const switchToggle = () => store.dispatch('setSelect', !toggle.value);
const selelctCity = async city => {
    if (city.City === chooseVal.value.City) return;
    store.dispatch('getAllBus', city);
};
selelctCity(cities[0]);
</script>

<template>
    <div :id="`select${type}`" class="input-wrapper ml-1" @click.stop="switchToggle">
        <div class="flex">
            <div class="w-12 text-black">
                {{ chooseVal.CityName }}
            </div>
            <img
                src="@/assets/arrow.svg"
                alt="arrow"
                class="ease cursor-pointer"
                :class="{ expand: toggle }"
            />
        </div>
    </div>
    <teleport v-if="toggle" :to="`#select${type}`">
        <transition id="option" name="slide">
            <div v-show="toggle" class="option-wrapper">
                <div v-for="city in list" :key="city" class="select-btn" @click="selelctCity(city)">
                    {{ city.CityName }}
                </div>
            </div>
        </transition>
    </teleport>
</template>

<style lang="scss" scoped>
#select {
}

.input-wrapper {
    @apply bg-white rounded-lg mr-1 pt-2 px-2;
    width: 82px;
    @media (max-width: 767px) {
        box-shadow: 0px 8px 10px rgba(255, 197, 90, 0.25);
    }
}

.expand {
    transform: rotate(180deg);
    transition: all 0.3s ease;
}

.option-wrapper {
    @apply bg-orange flex flex-wrap p-4 pb-2;
    position: absolute;
    width: 311px;
    min-height: 92px;
    top: 56px;
    left: 0;
    z-index: 999;
    border-radius: 20px;
    @media (max-width: 767px) {
        @apply w-full;
    }
    .select-btn {
        @apply bg-white text-orange rounded-xl px-2 py-1 text-sm cursor-pointer;
        min-width: 44px;
        height: 25px;
        margin: 0 10px 10px 0;
    }
}
</style>

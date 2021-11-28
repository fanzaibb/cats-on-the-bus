<script setup>
import { getAllCities, getCityBus } from '@/api';
import { cities, routes } from '@/utils/cities.json';
import { ref } from 'vue';
import tc from '@/utils/tc.json';

console.log(tc.map(e => e.RouteName));

const list = ['綠', '延', '副', '繞', '區', 'W', 'E', 'A'];
const toggle = ref(false);
const chooseVal = ref('路線名');

const switchToggle = () => (toggle.value = !toggle.value);
const selectText = async text => {
    chooseVal.value = text;
};
</script>

<template>
    <div id="select" class="input-wrapper pointer" @click="switchToggle">
        <div class="flex">
            <div
                class="w-12"
                :class="chooseVal !== '路線名' ? 'text-black' : 'text-gray-4'"
            >
                {{ chooseVal }}
            </div>
            <img src="@/assets/arrow.svg" alt="arrow" class="ease" :class="{ expand: toggle }" />
        </div>
    </div>
    <teleport v-if="toggle" to="#select">
        <transition id="option" name="slide">
            <div v-show="toggle" class="option-wrapper">
                <div
                    v-for="text in list"
                    :key="text"
                    class="select-btn pointer"
                    @click="selectText(text)"
                >
                    {{ text }}
                </div>
            </div>
        </transition>
    </teleport>
</template>

<style lang="scss" scoped>
#select {
}

.input-wrapper {
    @apply bg-white rounded-lg mr-1 pt-2 pl-1;
    width: 72px;
    box-shadow: 0px 8px 10px rgba(255, 197, 90, 0.25);
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
    top: 46px;
    left: 56px;
    z-index: 500;
    border-radius: 20px;
    .select-btn {
        @apply bg-white text-orange rounded-xl px-2 py-1 text-sm;
        min-width: 44px;
        height: 25px;
        margin: 0 10px 10px 0;
    }
}
</style>

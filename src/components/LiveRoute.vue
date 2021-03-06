<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref, computed, defineEmits } from 'vue';

const router = useRouter();
const store = useStore();
const emit = defineEmits(['back'])
const dir = ref(0);
const data = computed(() => store.state.routeData.filter(e => e.Direction === dir.value));
const route = computed(() => store.state.currentRoute);
const setStatus = stop => {
    if (stop.arrival < 0) return { text: '未發車', class: 'init' };
    else if (stop.arrival === 0) return { text: '即將進站', class: 'incoming' };
    else if (isNaN(Math.round(stop.arrival))) return { text: '無進站資訊', class: 'init' };
    else return { text: Math.round(stop.arrival), class: 'show-time' };
};
const back = () => {
    store.dispatch('resetRoute');
    emit('back');
}
</script>

<template>
    <div class="sheet-wrapper">
        <div class="sheet input-sheet flex-grow-0">
            <div class="bus-title">
                <div class="m-slide-toggle"></div>
                <button @click="back"><img src="@/assets/dir.svg" alt="back" /></button>
                <p class="z-10">{{ route.RouteName.Zh_tw }}</p>
            </div>
            <div class="tab">
                <button @click="dir = 0">{{ route.DepartureStopNameZh }}</button>
                <button @click="dir = 1">{{ route.DestinationStopNameZh }}</button>
            </div>
            <div class="stop-info">
                <div v-for="stop in data" :key="stop.StopID" class="flex items-center pb-5">
                    <div class="pill" :class="setStatus(stop).class">
                        {{ setStatus(stop).text }}
                    </div>
                    <span class="text-sm pl-8 pb-1">{{ stop.StopName.Zh_tw }}</span>
                </div>
                <div class="progress-line">
                    <div v-for="(stop, idx) in data" :key="stop.StopID">
                        <div class="dot bg-blue-2"></div>
                        <div v-if="idx !== data.length - 1" class="line"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@media (max-width: 767px) {
    .sheet-wrapper {
        @apply absolute overflow-hidden w-full;
        bottom: 0;
        z-index: 800;
        .sheet {
            @apply bg-white rounded-t-3xl w-full overflow-auto;
            max-height: calc(100vh - 178px);
            .bus-title {
                @apply relative font-semibold text-3xl text-gray-2 text-center flex justify-center items-center;
                background-image: url('@/assets/live-bg.svg');
                background-size: cover;
                height: 108px;
                button {
                    @apply absolute left-10 top-10;
                }
                &::after {
                    @apply absolute rounded-full;
                    content: '';
                    top: -80px;
                    left: 168px;
                    width: 215px;
                    height: 202px;
                    background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
                }
                &::before {
                    @apply absolute rounded-full;
                    content: '';
                    top: -9px;
                    left: 21px;
                    width: 195px;
                    height: 183px;
                    background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
                }
                .m-slide-toggle {
                    @apply w-20 h-1 bg-orange absolute top-3 rounded-3xl;
                }
            }
            .tab {
                @apply absolute bg-white rounded-2xl;
                box-shadow: 0px 8px 30px 0px #e25b6c1a;
                width: 310px;
                top: 90px;
                left: 44px;
                button {
                    @apply w-1/2 px-4 py-2 text-gray-3 font-medium text-lg;
                }
            }
        }

        .pill {
            @apply rounded-full bg-gray-5 text-gray-2 pt-3 text-sm ml-2 mb-2;
            width: 96px;
            height: 40px;
        }

        .progress-line {
            @apply h-full absolute right-7 w-5;
            top: 81px;
            .dot {
                @apply rounded-full w-2 h-2;
            }
            .line {
                @apply border-l-2 border-dotted border-blue-2;
                height: 60px;
                width: 5px;
                margin-left: 3px;
            }
        }
    }
}

@media (min-width: 768px) {
    .sheet-wrapper {
        @apply absolute overflow-hidden rounded-2xl mb-8;
        top: 12px;
        left: 154px;
        z-index: 800;
        max-height: 95vh;
        .sheet {
            @apply bg-white rounded-2xl;
            width: 409px;
            box-shadow: 0px 8px 10px rgba(255, 197, 90, 0.25);
            .bus-title {
                @apply relative font-semibold text-3xl text-gray-2 text-center flex justify-center items-center mb-16;
                background-image: url('@/assets/live-bg.svg');
                height: 108px;
                button {
                    @apply absolute left-10 top-10;
                }
                &::after {
                    @apply absolute rounded-full;
                    content: '';
                    top: -80px;
                    left: 168px;
                    width: 215px;
                    height: 202px;
                    background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
                }
                &::before {
                    @apply absolute rounded-full;
                    content: '';
                    top: -9px;
                    left: 21px;
                    width: 195px;
                    height: 183px;
                    background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
                }
            }
            .tab {
                @apply absolute bg-white rounded-2xl;
                box-shadow: 0px 8px 30px 0px #e25b6c1a;
                width: 310px;
                top: 90px;
                left: 44px;
                button {
                    @apply w-1/2 px-4 py-2 text-gray-3 font-medium text-lg;
                }
            }
            .stop-info {
                @apply px-10 relative overflow-auto;
                height: calc(90vh - 118px);
            }
        }

        .pill {
            @apply rounded-full text-gray-2 pt-3 text-sm ml-2 mb-2;
            width: 96px;
            height: 40px;

            &.init {
                @apply bg-gray-5;
            }
            &.incoming {
                @apply bg-red text-white;
            }
            &.show-time {
                @apply bg-orange text-white;
            }
        }

        .progress-line {
            @apply h-full absolute right-7 w-5;
            top: 16px;
            .dot {
                @apply rounded-full w-2 h-2;
            }
            .line {
                @apply border-l-2 border-dotted border-blue-2;
                height: 60px;
                width: 5px;
                margin-left: 3px;
            }
        }
    }
}
</style>

<script setup>
import Select from '@/components/Select.vue';
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();
const allBus = computed(() => store.state.allBus);
const favorite = ref([2]);
const input = ref('');
const searchResult = computed(() => {
    const list = [];
    if (input.value.length > 0) {
        allBus.value.forEach(e => {
            if (e.name.indexOf(input.value) >= 0) list.push(e);
        });
    }
    return list;
});

const showRouteInfo = async bus => {
    await store.dispatch('getRoute', bus);
    router.push('/live_route');
};
</script>

<template>
    <div class="sheet-wrapper">
        <div class="sheet input-sheet flex-grow-0">
            <div class="pt-4">
                <Select />
            </div>
            <button>
                <img src="@/assets/search.svg" alt="search icon" class="pt-3 pr-2" width="50" />
            </button>
            <div class="pt-4 mr-2">
                <input
                    v-model.trim="input"
                    type="text"
                    class="border-b-2"
                    placeholder="請輸入公車號碼"
                />
            </div>
        </div>
        <div class="m-input-sheet">
            <Select type="mobile" />
            <div class="m-input">
                <button @click="searchBus">
                    <img
                        src="@/assets/search.svg"
                        alt="search icon"
                        class="inline-block pt-1"
                        width="33"
                    />
                </button>
                <input
                    v-model.trim="input"
                    type="text"
                    class="border-b-2 ml-4 inline-block"
                    placeholder="請輸入公車號碼"
                    @keyup.enter="searchBus"
                />
            </div>
        </div>
        <!-- <div class="sheet dial-btn-sheet flex-grow-0">
            <div v-for="text in textList" :key="text" class="input-btn">{{ text }}</div>
        </div> -->
        <div v-if="favorite.length !== 0" class="sheet fav-sheet flex-grow relative">
            <p class="pl-10 pt-6 text-left text-gray-6 font-medium">搜尋結果</p>
            <div
                v-for="bus in searchResult"
                :key="bus.name"
                class="fav-box"
                @click="showRouteInfo(bus)"
            >
                <div class="text-left text-sm pl-4 font-medium" style="width: 241px">
                    <p class="text-blue-2">{{ bus.name }}</p>
                    <p>{{ bus.DepartureStopNameZh }}－{{ bus.DestinationStopNameZh }}</p>
                </div>
                <div class="pt-2">
                    <img src="@/assets/heart.svg" alt="heart" />
                </div>
            </div>
        </div>
        <div v-else class="sheet no-fav-sheet flex-grow relative">
            <div class="no-fav">
                <img src="@/assets/no-fav-search.svg" alt="no-fav" class="mx-auto" />
                <p>目前沒有任何收藏的路線</p>
                <p>將常用的公車路線加入『我的最愛』</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.sheet-wrapper {
    @apply absolute;
    z-index: 800;

    @media (max-width: 767px) {
        @apply w-full;
        top: 32px;
    }
    @media (min-width: 768px) {
        top: 32px;
        left: 154px;
        height: 96vh;
    }
    .sheet {
        @apply bg-white rounded-2xl mb-4;

        @media (min-width: 768px) {
            width: 409px;
        }
        box-shadow: 0px 8px 10px rgba(255, 197, 90, 0.25);
    }

    .input-sheet {
        @media (max-width: 767px) {
            display: none;
        }
        @media (min-width: 768px) {
            @apply flex justify-center;
            height: 73px;
            input {
                outline: none;
                width: 236px;
                border-color: #eeeeee;
                height: 36px;
            }
        }
        button:active {
            transform: scale(0.8);
        }
    }

    .m-input-sheet {
        @media (max-width: 767px) {
            @apply flex justify-center absolute w-full;
            z-index: 300;
            top: 64px;
            div {
                box-shadow: 0px 8px 10px rgba(255, 197, 90, 0.25);
            }
            input {
                @apply font-light;
                outline: none;
                width: 158px;
                border-color: #eeeeee;
            }
            .m-input {
                @apply bg-white rounded-lg ml-2 px-2;
            }
        }
        @media (min-width: 768px) {
            display: none;
        }
    }

    .dial-btn-sheet {
        @media (max-width: 767px) {
            display: none;
        }
        @apply grid grid-cols-5 px-8 py-6;
        height: 283px;
        .input-btn {
            @apply rounded-lg ml-2 flex justify-center items-center font-medium  text-gray-2 cursor-pointer;
            width: 52px;
            height: 53px;
            box-shadow: 0px 8px 10px 0px #5b81e240;
        }
    }

    .fav-sheet {
        @apply bg-white;
        .fav-box {
            @apply flex px-6 py-2 justify-between cursor-pointer;
            box-shadow: 0px -0.5px 0px 0px #00000033 inset;
            &:hover {
                text-shadow: 3px 3px 3px #cccccc;
            }
        }
        @media (max-width: 767px) {
            @apply overflow-auto absolute w-full top-10 pt-14;
            min-height: calc(100vh - 64px);
            z-index: 298;
        }

        @media (min-width: 768px) {
            @apply overflow-auto;
            min-height: 323px;
            max-height: calc(100vh - 133px);
        }
    }
    .no-fav-sheet {
        @media (max-width: 767px) {
            @apply overflow-auto;
            min-height: calc(100vh - 32px);
            background-color: #ffffff;
            background-image: url('@/assets/no-fav-bg.svg');
            background-size: 100%;
            background-repeat: no-repeat;
            background-position: center;
            .no-fav {
                width: 300px;
                @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-medium break-normal;
            }
        }

        @media (min-width: 768px) {
            @apply overflow-auto;
            min-height: 323px;
            background-color: #ffffff;
            background-image: url('@/assets/no-fav-bg.svg');
            background-size: cover;
            background-position: center;
            .no-fav {
                width: 300px;
                @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-medium break-normal;
            }
        }
    }
}
</style>

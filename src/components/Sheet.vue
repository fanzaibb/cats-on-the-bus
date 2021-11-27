<script setup>
import { ref } from 'vue';
const favorite = ref([]);
</script>

<template>
    <div class="sheet-wrapper">
        <div class="sheet input-sheet flex-grow-0">
            <div>
                <img src="@/assets/search.svg" alt="search icon" class="pt-5 pr-4" width="60" />
            </div>
            <div class="pt-4">
                <input type="text" class="border-b-2" placeholder="請輸入公車號碼" />
            </div>
        </div>
        <div class="sheet dial-btn-sheet flex-grow-0">
            <div v-for="i in 20" :key="i" class="input-btn">red</div>
        </div>
        <div v-if="favorite.length !== 0" class="sheet fav-sheet flex-grow relative">
            <p class="pl-10 pt-6 text-left text-gray-6 font-medium">我的最愛</p>
            <div v-for="i in 5" :key="i" class="fav-box">
                <div>
                    <img src="@/assets/fav-bus.svg" alt="favorite bus routes" />
                </div>
                <div class="text-left text-sm pl-4 font-medium" style="width: 241px">
                    <p class="text-blue-2">11</p>
                    <p>台大－新店</p>
                </div>
                <div class="pt-2">
                    <img src="@/assets/heart.svg" alt="heart" />
                </div>
            </div>
        </div>
        <div v-else class="sheet fav-sheet flex-grow relative">
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
    @apply absolute flex flex-col;
    top: 12px;
    left: 154px;
    z-index: 1234;
    height: 96vh;
    .sheet {
        @apply bg-white rounded-2xl mb-4;
        width: 409px;
        box-shadow: 0px 8px 10px rgba(255, 197, 90, 0.25);
    }

    .input-sheet {
        @apply flex justify-center;
        height: 73px;
        input {
            outline: none;
            width: 276px;
            border-color: #eeeeee;
            height: 36px;
        }
    }

    .dial-btn-sheet {
        @apply grid grid-cols-5 px-8 py-6;
        height: 283px;
        .input-btn {
            @apply rounded-lg ml-2 flex justify-center items-center font-medium;
            width: 52px;
            height: 53px;
            box-shadow: 0px 8px 10px 0px #5b81e240;
        }
    }

    .fav-sheet {
        @apply overflow-auto;
        min-height: 323px;
        background-color: #ffffff;
        background-image: url('@/assets/no-fav-bg.svg');
        background-size: cover;
        background-position: center;
        .fav-box {
            @apply flex px-10 py-2;
            box-shadow: 0px -0.5px 0px 0px #00000033 inset;
        }
        .no-fav {
            width: 300px;
            @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-medium break-normal;
        }
    }
}
</style>

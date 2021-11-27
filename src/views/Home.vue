<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
<template>
    <div class="main font-medium">
        <div class="main-bg-wrapper">
            <img src="@/assets/city.svg" alt="main logo" />
            <img src="@/assets/logo.svg" alt="main logo" />
        </div>
        <div class="bottom-wrapper">
            <div class="btn-group">
                <div class="btns" @click="router.push('/bus_search')">
                    <div>
                        <img src="@/assets/bus-icon.svg" alt="" />
                        <p>公車查詢</p>
                    </div>
                </div>
                <div class="btns" @click="router.push('/route_search')">
                    <div>
                        <img src="@/assets/map-icon.svg" alt="" />
                        <p>路線查詢</p>
                    </div>
                </div>
                <div class="btns" @click="router.push('/nearby_stop')">
                    <div>
                        <img src="@/assets/sidebar-stop.svg" alt="" width="60" />
                        <p>附近公車</p>
                    </div>
                </div>
            </div>
            <div class="bus"></div>
            <div class="stop"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@media (max-width: 767px) {
    .main {
        background-color: #f6f7f4;
        position: relative;
        overflow-x: hidden;
        .main-bg-wrapper {
            height: 55vh;
            position: relative;
            background-color: #ffffff;
            background-image: url('@/assets/banner-bg.svg');
            background-size: cover;
            background-position: center;
            img:first-child {
                @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;
                max-width: 1340px;
            }
            img:last-child {
                @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4;
                width: 200px;
            }
        }
        .bottom-wrapper {
            @apply pt-9 mx-auto;
            width: 100%;
            height: 45vh;
            .btn-group {
                @apply w-full flex justify-center flex-col items-center;
                .btns {
                    @apply flex justify-center items-center mb-3;
                    cursor: pointer;
                    width: 311px;
                    height: 80px;
                    border-color: #ffffff;
                    background: #ffffff;
                    box-shadow: 0px 8px 10px 0px #ffc55a40;
                    border-radius: 20px;
                    z-index: 10;
                    div {
                        @apply flex;
                        p {
                            @apply p-2;
                        }
                    }
                    img {
                        width: 40px;
                    }
                }
            }
            .bus {
                background-image: url('@/assets/bus.svg');
                width: 260px;
                height: 126px;
                position: absolute;
                bottom: 6px;
                left: 0;
            }
            .stop {
                background-image: url('@/assets/stop.svg');
                background-repeat: no-repeat;
                width: 109px;
                height: 203px;
                position: absolute;
                bottom: -6px;
                right: 0;
            }
        }
    }
}
@media (min-width: 768px) {
    .main {
        width: 100%;
        background-color: #f6f7f4;
        position: relative;
        overflow: hidden;
        .main-bg-wrapper {
            height: 45vh;
            position: relative;
            background-color: #ffffff;
            background-image: url('@/assets/banner-bg.svg');
            background-size: cover;
            img:first-child {
                @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;
            }
            img:last-child {
                @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4;
                width: 160px;
            }
        }
        .bottom-wrapper {
            @apply pt-9;
            width: 100%;
            height: 511px;
            .btn-group {
                @apply flex flex-row justify-center pt-9;
                .btns {
                    @apply flex justify-center items-center mx-3;
                    cursor: pointer;
                    width: 231px;
                    height: 206px;
                    border-color: #ffffff;
                    background: #ffffff;
                    box-shadow: 0px 8px 10px 0px #ffc55a40;
                    border-radius: 20px;
                    p {
                        @apply pt-6;
                    }
                }
            }
            .bus {
                background-image: url('@/assets/bus.svg');
                width: 260px;
                height: 126px;
                position: absolute;
                bottom: 6px;
                left: 15%;
            }
            .stop {
                background-image: url('@/assets/stop.svg');
                background-repeat: no-repeat;
                width: 109px;
                height: 203px;
                position: absolute;
                bottom: 0;
                right: 15%;
            }
        }
    }
}
</style>

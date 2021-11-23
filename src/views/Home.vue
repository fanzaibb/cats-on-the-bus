<template>
    <div class="main">
        <div class="main-bg-wrapper flex justify-center">
            <div class="city-bg flex justify-center items-center pl-20 pt-10">
                <img src="@/assets/logo.svg" alt="main logo" width="160"/>
            </div>
        </div>
        <div class="main-tab-wrapper">
            <div class="m-tabs flex justify-center">
                <div v-for="i in 3" :key="i" class="m-tab">
                    <div>
                        <img src="@/assets/bus-icon.svg" alt="" />
                        <p>公車查詢</p>
                    </div>
                </div>
            </div>
            <div class="bus-path">
                <div class="bus"></div>
                <div class="stop"></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main {
    width: 100%;
    height: 100vh;
    // position: relative;
    background-color: #f6f7f4;
    .main-bg-wrapper {
        // max-width: 1439px;
        // height: 310px;
        width: 100vw;
        background-color: #ffffff;
        background-image: url('@/assets/banner-bg.svg');
        background-size: cover;
        .city-bg {
            width: 1044px;
            background-image: url('@/assets/city.svg');
            background-size: cover;
            background-repeat: no-repeat;
        }
    }
    .main-tab-wrapper {
        width: 100%;
        .m-tabs {
            @apply flex justify-center;
            .m-tab {
                @apply flex justify-center items-center;
                cursor: pointer;
                width: 231px;
                height: 206px;
                border-color: #ffffff;
                background: #ffffff;
                box-shadow: 0px 8px 10px 0px #ffc55a40;
                border-radius: 20px;
                margin: 36px 12px 0 12px;
            }
        }
    }

    .bus-path {
        @apply m-auto;
        width: 1044px;
        height: 200px;
        position: relative;
        bottom: 13px;
        left: 0;
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
            bottom: 0;
            right: 0;
        }
    }
}
</style>

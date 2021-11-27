<script setup>
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
                <label for="from">From</label>
                <input type="text" placeholder="你的位置" id="from"/>
            </div>
            <div class="dash-path w-full flex justify-end pr-5">
                <button>
                    <img class="mx-auto" src="@/assets/change-dir.svg" alt="reverse direction" />
                </button>
            </div>
            <div class="relative flex items-center pr-8">
                <img
                    src="@/assets/destination.svg"
                    alt="search icon"
                    class="pt-1 px-1 ml-1"
                    width="52"
                />
                <label for="to">To</label>
                <input type="text" placeholder="目標地點" id="to" />
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
        @apply flex flex-col justify-center p-10;
        height: 226px;
        input {
            @apply text-base border-b-2 relative font-medium;
            outline: none;
            width: 276px;
            border-color: #eeeeee;
            height: 36px;
            background-color: transparent;
        }

        label {
            @apply absolute -top-1 left-14 font-medium text-gray-4 text-sm;
        }
    }
    .dash-path {
        @apply ml-7;
        min-height: 32px;
        border-left: 2px dashed #cccccc;
        button {
            @apply w-8 h-8 rounded-lg;
            outline: none;
            background-color: #eeeeee;
        }
    }
}
</style>

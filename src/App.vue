<script setup>
import { useStore } from 'vuex';
const store = useStore();

const el = document.getElementById('app');
el.addEventListener('click', () => store.dispatch('setSelect', false));
</script>

<template>
    <router-view></router-view>
</template>

<style>
body {
    margin: 0;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
    position: relative;
}
</style>

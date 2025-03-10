<script lang="ts" setup>
import {RouterView} from 'vue-router'
import Header from "@/components/navigation/header.vue";
</script>

<template>
  <div>
    <Header/>
    <router-view/>

  </div>
</template>

<style scoped>

</style>

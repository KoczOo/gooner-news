<script lang="ts" setup>
import {RouterView} from 'vue-router'
import Header from "@/components/navigation/header.vue";
import {firstLoad} from "@/composables/auth.ts";

const {loading} = firstLoad();

</script>

<template>
  <div v-if="loading" class="text-center m-5">
    <v-progress-circular
        color="warning"
        indeterminate
    />
  </div>
  <div v-else>
    <Header/>
    <router-view/>
  </div>
</template>

<style scoped>

</style>

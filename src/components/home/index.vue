<script setup lang="ts">
import AppCarousel from '@/utils/carousel.vue';

/// ARTICLE STORE
import { useArticleStore } from '@/stores/articles';
const articleStore = useArticleStore();

if(articleStore.homeArticles.length === 0){
  articleStore.getArticles(8);
}

</script>

<template>
  <div class="container">
    <AppCarousel/>
  </div>
</template>

<style scoped>

</style>

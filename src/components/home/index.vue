<script lang="ts" setup>
import AppCarousel from '@/utils/carousel.vue';

/// ARTICLE STORE
import {useArticleStore} from '@/stores/articles';
import Featured from "@/components/home/featured.vue";

const articleStore = useArticleStore();

if (articleStore.homeArticles.length === 0) {
  articleStore.getArticles(8);
}

</script>

<template>
  <div class="container">
    <AppCarousel/>
    <Featured/>
  </div>
</template>

<style scoped>

</style>

<script lang="ts" setup>
import 'vue3-carousel/dist/carousel.css';
import {Carousel, Pagination, Slide} from 'vue3-carousel'
import {useArticleStore} from "@/stores/articles.ts";

const articleStore = useArticleStore();


</script>

<template>
  <div v-if="articleStore.getFeaturesSlides">
    <carousel
        :items-to-show="1"
        :wrap-around="true"
        class="p_top"
    >
      <slide v-for="slide in articleStore.getFeaturesSlides" :key="slide.id">
        <div :style="{background:`url(${slide.postImg})`}" class="slider_bck">
          <div class="slide_content">
            <div class="item">
              <div>{{ slide.postTitle }}</div>
              <div>
                {{ slide.postText }}
              </div>
            </div>
          </div>
        </div>
      </slide>

      <template #addons>
        <pagination/>
      </template>

    </carousel>
  </div>
</template>

<style scoped>

</style>

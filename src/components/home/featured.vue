<script lang="ts" setup>
import {useArticleStore} from '@/stores/articles';

const articleStore = useArticleStore();

</script>

<template>
  <v-row class="pt-5" v-masonry transition-duration="0.7s">
    <v-col v-for="(article, index) in articleStore.getHomeArticles" :key="article.id" v-masonry-tile sm="4">

      <v-card>
        <v-img
            height="200"
            :src="article.postImg"
            cover
            class="text-white"
        />

        <v-card-item>
          <v-card-title>
            {{ article.postTitle }}
          </v-card-title>
          <v-card-subtitle>
            {{ article.postSubTitle }}
          </v-card-subtitle>
        </v-card-item>

        <v-card-text>
          {{ article.postText }}
        </v-card-text>

        <v-card-actions>
          <router-link :to="{name:'article',params:{id:article.id}}">
            <v-btn>
              Czytaj dalej...
            </v-btn>
          </router-link>
        </v-card-actions>
      </v-card>

    </v-col>
  </v-row>
</template>

<style scoped>

</style>

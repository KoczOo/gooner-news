<script lang="ts" setup>
import {ref} from 'vue';
// STORE
import {useArticleStore} from '@/stores/articles'
// ROUTER
import {useRoute} from 'vue-router'
import type Article from "@/dto/model/Article.ts";

const articleStore = useArticleStore();

const route = useRoute();

const loading = ref(true);
const article = ref(<Article>{});

articleStore.getArticleById(route.params['id'] as string)
    .then((response) => {
      article.value = {...response as Article};
    })
    .finally(() => {
      loading.value = false;
    })
</script>

<template>
  <div class="container p_top">
    <div v-if="loading" class="text-center m-3">
      <v-progress-circular
          color="primary"
          indeterminate
      />
    </div>
    <div v-else class="article_page">
      <div class="game_tag">
        {{ article.postTitle }}
      </div>

      <div
          :style="{backgroundImage:`url(${article.postImg})`}"
          class="article_featured"
      ></div>

      <div class="article_content">
        <div class="owner">
          Artykuł napisany przez: <b>{{ article.owner.firstName }} {{ article.owner.lastName }}</b>
        </div>
        <hr/>
        <h1>{{ article.postTitle }}</h1>
        <div class="editor" v-html="article.editor"></div>

        <hr/>

        <div class="article_rating">
          Ocena:<b>{{ article.postRating }}</b>
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>

</style>

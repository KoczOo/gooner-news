<script lang="ts" setup>
import {useArticleStore} from "@/stores/articles.ts";
import {ref} from "vue";
import {useRoute, useRouter} from 'vue-router';
import {Timestamp} from "firebase/firestore";

const router = useRouter();
const route = useRoute();

const articleStore = useArticleStore();

const loading = ref(false);
const btnLoad = ref(false);

const formatTimestamp = (timestamp: any) => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate().toDateString();
  }
  return "Invalid date"; // Fallback if it's not a Timestamp
};


/// LOAD MORE ARTICLES
const loadMoreHandler = () => {
  btnLoad.value = true;
  articleStore.getAdminMoreArticles(3)
      .finally(() => {
        btnLoad.value = false
      })
}


/// REMOVE BY ID
const removeHandler = (articleID: string) => {
  loading.value = true;
  articleStore.removeAdminArticle(articleID)
      .finally(()=>{ loading.value = false})
}

/// GET FIRST ARTICLES
if (articleStore.adminArticles.length === 0 || route.query.reload) {
  loading.value = true;
  articleStore.getAdminArticles(3)
      .finally(() => {
        loading.value = false;
      })
}

</script>

<template>
  <div v-show="loading" class="text-center m-3">
    <v-progress-circular
        color="primary"
        indeterminate
    />
  </div>
  <div v-show="!loading">
    <v-table theme="dark">
      <thead>
      <tr>
        <th class="text-left">
          Nazwa
        </th>
        <th class="text-left">
          Autor
        </th>
        <th class="text-left">
          Ocena
        </th>
        <th class="text-left">
          Data
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(article) in articleStore.adminArticles">
        <td>{{ article.postTitle }}</td>
        <td>{{ article.owner.firstName }} {{ article.owner.lastName }}</td>
        <td>{{ article.postRating }}</td>
        <td>{{ formatTimestamp(article.timestamp) }}</td>
        <td>
          <v-btn
              color="red"
              size="small"
              variant="outlined"
              @click="removeHandler(article.id)"
          >
            Remove
          </v-btn>
        </td>
        <td>
          <v-btn
              color="yellow"
              size="small"
              variant="outlined"
              @click="router.push({name:'admin_edit_article',params:{id:article.id}})"
          >
            Edit
          </v-btn>
        </td>
      </tr>
      </tbody>
    </v-table>

    <div v-if="btnLoad" class="text-center m-3">
      <v-progress-circular color="primary" indeterminate/>
    </div>
    <v-btn
        v-else
        class="mt-3"
        variant="outlined"
        @click="loadMoreHandler()"
    >
      Get more articles
    </v-btn>
  </div>
</template>

<style scoped>

</style>

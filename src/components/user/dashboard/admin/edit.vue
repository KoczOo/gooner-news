<script lang="ts" setup>
import {Field, Form} from "vee-validate"
import ArticleSchema from "./schema.ts"
import Wysiwyg from "@/utils/wysiwyg.vue";
import {ref} from "vue";
import {useRoute} from "vue-router";
//  ARTICLE STORE
import {useArticleStore} from "@/stores/articles.ts";
//  TOASTS
import {useToast} from "vue-toast-notification";
import type Article from "@/dto/model/Article.ts";

const $toast = useToast();

const articleStore = useArticleStore();

const ratingArray = [0, 1, 2, 3, 4, 5];
const veditor = ref('');
const loading = ref(false);
const route = useRoute();
const article = ref(<Article>{});

function onSubmit(values: Article, {resetForm}: { resetForm: () => void }) {
  loading.value = true;
  articleStore.updateArticleById((route.params['id'] as string), values)
      .finally(() => {
            loading.value = false;
          }
      )
}

function updateEditor(value: string) {
  veditor.value = value;
}

articleStore.getArticleById(route.params['id'] as string)
    .then((response) => {
      article.value = {...response as Article};
      updateEditor(article.value.editor);
      loading.value = false;
    })
    .catch((error) => {
      $toast.error(error.message);
    })


</script>

<template>
  <h1>Edytuj artykuł</h1>

  <hr/>

  <div class="text-center m-3">
    <v-progress-circular
        v-show="loading"
        color="warning"
        indeterminate
    />
  </div>

  <Form v-show="!loading" :validation-schema="ArticleSchema" class="mb-5" @submit="onSubmit">

    <div class="mb-4">
      <Field
          v-slot="{ field, errors, errorMessage }"
          v-model="article.postTitle"
          name="postTitle">
        <input
            :class="{'is-invalid': errors.length != 0}"
            class="form-control"
            placeholder="Tytuł artykułu"
            type="text"
            v-bind="field"
        />
        <div v-if="errors.length > 0" class="input_alert">
          {{ errorMessage }}
        </div>
      </Field>
    </div>

    <div class="mb-4">
      <Field
          v-slot="{ field, errors, errorMessage }"
          v-model="article.postSubTitle"
          name="postSubTitle">
        <input
            :class="{'is-invalid': errors.length != 0}"
            class="form-control"
            placeholder="Podtytuł artykułu"
            type="text"
            v-bind="field"
        />
        <div v-if="errors.length > 0" class="input_alert">
          {{ errorMessage }}
        </div>
      </Field>
    </div>

    <div class="mb-4">
      <Field
          v-slot="{ field, errors, errorMessage }"
          v-model="article.postText"
          name="postText">
        <textarea
            :class="{'is-invalid': errors.length != 0}"
            class="form-control"
            placeholder="Treść artykułu"
            rows="25"
            v-bind="field"
        />
        <div v-if="errors.length > 0" class="input_alert">
          {{ errorMessage }}
        </div>
      </Field>
    </div>

    <div class="mb-4">
      <Wysiwyg :content="article.editor" @update="updateEditor"/>
      <Field v-slot="{ field, errors, errorMessage }" v-model="veditor" name="editor">
        <input id="veditor" type="hidden" v-bind="field"/>
        <div v-if="errors.length > 0" class="input_alert">
          {{ errorMessage }}
        </div>
      </Field>
    </div>

    <div class="mb-4">
      <Field
          v-slot="{ field, errors, errorMessage }"
          v-model="article.postRating"
          name="postRating">
        <select :class="{'is-invalid': errors.length != 0}" class="form-select" v-bind="field">
          <option value="">Wybierz ocenę</option>
          <option v-for="rating in ratingArray" :key="rating" :value="rating">
            {{ rating }}
          </option>
        </select>
        <div v-if="errors.length > 0" class="input_alert">
          {{ errorMessage }}
        </div>
      </Field>
    </div>

    <div class="mb-4">
      <Field
          v-slot="{ field, errors, errorMessage }"
          v-model="article.postImg"
          name="postImg">
        <input
            :class="{'is-invalid': errors.length != 0}"
            class="form-control"
            placeholder="Podaj źródło do zdjęcia"
            type="text"
            v-bind="field"
        />
        <div v-if="errors.length > 0" class="input_alert">
          {{ errorMessage }}
        </div>
      </Field>
    </div>

    <v-btn color="red-darken-2" type="submut">
      Zapisz
    </v-btn>

  </Form>


</template>

<style scoped>

</style>

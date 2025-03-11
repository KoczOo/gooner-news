<script lang="ts" setup>
import {Field, Form} from "vee-validate"
import ArticleSchema from "./schema.ts"

const ratingArray = [0, 1, 2, 3, 4, 5];

function onSubmit(values: any, {resetForm}: { resetForm: () => void }) {
  console.log(values)
}
</script>

<template>
  <h1>Dodaj artykuł</h1>
  <hr/>

  <Form class="mb-5" @submit="onSubmit" :validation-schema="ArticleSchema">

    <div class="mb-4">
      <Field
          v-slot="{ field, errors, errorMessage }"
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
      <Field
          v-slot="{ field, errors, errorMessage }"
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

    <v-btn type="submut" color="red-darken-2">
      Dodaj artykuł
    </v-btn>

  </Form>


</template>

<style scoped>

</style>

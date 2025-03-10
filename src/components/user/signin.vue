<script lang="ts" setup>
import * as yup from 'yup';
import {ref} from "vue";
import {Field, Form} from "vee-validate";

const type = ref(false);

const formSchema = yup.object().shape({
  email: yup.string()
      .required('Email jest wymagany')
      .email('Niepoprawny format email'),
  password: yup.string()
      .required('Hasło jest wymagane')
});

function onSubmit(values: any, {resetForm}: { resetForm: () => void }) {
  console.log(values);
  resetForm();
}

</script>

<template>
  <div class="signin_container">
    <Form :validation-schema="formSchema" @submit="onSubmit">
      <h1 v-text="!type ? 'Zaloguj' : 'Zarejestruj'"></h1>

      <div class="form-group">

        <div class="form-group">
          <Field
              v-slot="{ field, errors, errorMessage }"
              name="email">
            <input
                :class="{'is-invalid': errors.length != 0}"
                class="form-control"
                placeholder="Email"
                type="text"
                v-bind="field"
            />
            <div
                v-if="errors.length > 0"
                class="input_alert"
            >
              {{ errorMessage }}
            </div>
          </Field>

          <Field
              v-slot="{ field, errors, errorMessage }"
              name="password">
            <input
                :class="{'is-invalid': errors.length != 0}"
                class="form-control"
                placeholder="Hasło"
                type="text"
                v-bind="field"
            />
            <div
                v-if="errors.length > 0"
                class="input_alert"
            >
              {{ errorMessage }}
            </div>
          </Field>
        </div>

        <button
            class="btn mb-3 btn-block"
            type="submit"
            v-text="!type ? 'Zaloguj' : 'Zarejestruj'">
        </button>

        <hr/>

        <div class="form_swap" @click="type = !type">
          <span v-if="type">
            <b>Zaloguj się</b>
          </span>
          <span v-else>
            <b>Zarejestruj się</b>
          </span>
        </div>

      </div>

    </Form>
  </div>
</template>

<style scoped>

</style>

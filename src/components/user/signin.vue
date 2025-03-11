<script lang="ts" setup>
import * as yup from 'yup';
import {ref} from "vue";
import {Field, Form} from "vee-validate";

/// TOASTS
import {useToast} from "vue-toast-notification";
const $toast =  useToast();

/// AUTH STORE
import {userUserStore} from "@/stores/user";
import errorCoders from "@/utils/error-codes.ts";
const userStore = userUserStore();

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
  //userStore.registerUser(values);
  resetForm();
  if (type.value) {
    userStore.registerUser(values);
  } else {
    userStore.signIn(values);
  }
}

userStore.$onAction(({ name, after, onError }) => {
  if (name === 'registerUser' || name === 'signIn') {
    after(() => {
      $toast.success('Welcome Gooner!')
    });
    onError((error) => {
      $toast.error(errorCoders((error as Error).message));
    });
  }
});


</script>

<template>
  <div class="signin_container">

    <div v-show="userStore.loading" class="text-center">
      <v-progress-circular
          color="warning"
          indeterminate
      />
    </div>

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

<script lang="ts" setup>
import {Field, Form} from 'vee-validate';
import {updateProfile} from '@/composables/user';

const {loading, formSchema, onSubmit, firstName, lastName} = updateProfile()
</script>

<template>
  <h1>Profil użytkownika</h1>
  <hr/>

  <Form :validation-schema="formSchema" class="mb-5 col-md-5" @submit="onSubmit">

    <div class="mb-4">
      <Field
          v-slot="{field, errors, errorMessage}"
          v-model="firstName"
          name="firstname"
      >
        <input
            :class="{'is-invalid':errors.length !== 0}"
            class="form-control"
            placeholder="Enter your firstname"
            type="text"
            v-bind="field"
        />
        <div
            v-if="errors.length !== 0"
            class="input_alert"
        >
          {{ errorMessage }}
        </div>
      </Field>
    </div>

    <div class="mb-4">
      <Field
          v-slot="{field, errors, errorMessage}"
          v-model="lastName"
          name="lastname"
      >
        <input
            :class="{'is-invalid':errors.length !== 0}"
            class="form-control"
            placeholder="Enter your lastname"
            type="text"
            v-bind="field"
        />
        <div
            v-if="errors.length !== 0"
            class="input_alert"
        >
          {{ errorMessage }}
        </div>
      </Field>
    </div>

    <v-btn
        :disabled="loading"
        :loading="loading"
        type="submit"
        variant="outlined"
    >
      Update profile
    </v-btn>

  </Form>
</template>

<style scoped>

</style>

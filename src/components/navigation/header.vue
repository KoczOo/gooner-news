<script lang="ts" setup>
import {userUserStore} from "@/stores/user.ts";

const userStore = userUserStore();

</script>

<template>
  <header>
    <div class="container header_container">

      <div class="logo">
        <router-link :to="{ name: 'home' }">
          Gooner news
        </router-link>
      </div>

      <div class="nav_panel_container">
        <ul>

          <li v-if="!userStore.auth">
            <router-link :to="{name: 'signin'}">Zaloguj</router-link>
          </li>

          <li v-if="userStore.auth">
            <router-link :to="{name: 'dashboard'}">Panel</router-link>
          </li>

          <li v-if="userStore.auth">
            <span @click="userStore.signOut()">Wyloguj</span>
          </li>

        </ul>
      </div>

    </div>
  </header>
</template>

<style scoped>

</style>

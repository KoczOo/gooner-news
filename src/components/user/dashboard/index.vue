<script lang="ts" setup>
import {userUserStore} from "@/stores/user.ts";
const userStore = userUserStore();

</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <nav id="sidebarMenu"
           class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div class="position-sticky pt-3">
          <ul class="nav flex-column">
            <li class="nav-item">
              <router-link :to="{name: 'dashboard'}" class="nav-link">
                <v-icon icon="mdi-view-dashboard"/>
                Panel
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'user_profile'}" class="nav-link">
                <v-icon icon="mdi-account-hard-hat"/>
                Profil
              </router-link>
            </li>
            <li class="nav-item" v-if="userStore.user.isAdmin">
              <router-link :to="{name: 'admin_articles'}" class="nav-link">
                <v-icon icon="mdi mdi-note-text"/>
                Artykuły
              </router-link>
            </li>
            <li class="nav-item" v-if="userStore.user.isAdmin">
              <router-link :to="{name: 'admin_add_article'}" class="nav-link">
                <v-icon icon="mdi mdi-note-plus"/>
                Dodaj artykuł
              </router-link>
            </li>
          </ul>
        </div>
      </nav>

      <main>
        <div
            id="admin_body"
            class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <router-view/>
        </div>
      </main>

    </div>
  </div>
</template>

<style scoped>

</style>

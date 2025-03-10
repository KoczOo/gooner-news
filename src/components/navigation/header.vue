<script lang="ts" setup>

</script>

<template>
  <header>
    <div class="container header_container">
      <div class="logo">
        <router-link :to="{ name: 'home' }">
          Gooner news
        </router-link>
      </div>
      <div>
        <ul>

          <li>
            <router-link :to="{name: 'signin'}">
              Zaloguj
            </router-link>
          </li>

          <span>
            <li>
              <span>
                Wyloguj
              </span>
            </li>
            <li>
              <span>
                Panel
              </span>
            </li>
          </span>

        </ul>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>

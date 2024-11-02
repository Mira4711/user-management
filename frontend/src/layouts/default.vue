<template>
  <v-app>
    <v-app-bar class="pa-2"><h1>Benutzerverwaltung</h1></v-app-bar>
    <v-navigation-drawer class="mt-2 py-5">
      <Navigation />
    </v-navigation-drawer>
    <v-main>
      <Suspense><router-view /></Suspense>
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script lang="ts" setup>
import Navigation from "@/components/Navigation.vue";

//
</script>

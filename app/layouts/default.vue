<template>
  <ClientOnly v-if="dev">
    <v-app>
      <v-app-bar color="primary" elevation="2">
        <template #prepend>
          <v-icon icon="mdi-tennis-ball" size="large" class="ml-2 mr-2"/>
        </template>
        <template #append>
          <v-app-bar-nav-icon class="d-flex d-sm-none" @click="drawer = !drawer"/>
        </template>
        <v-app-bar-title class="font-weight-bold text-h6">PTM BMUP</v-app-bar-title>
        <v-spacer/>
        <div class="d-none d-sm-flex">
          <v-btn variant="text" to="/" class="text-capitalize">Home</v-btn>
          <v-btn variant="text" to="/about" class="text-capitalize">Tentang Kami</v-btn>
          <v-btn variant="text" to="/schedule" class="text-capitalize">Jadwal</v-btn>
          <v-btn variant="text" to="/gallery" class="text-capitalize">Galeri</v-btn>
          <v-btn variant="text" to="/blog" class="text-capitalize">Blog</v-btn>
          <v-btn variant="text" to="/contact" class="text-capitalize">Kontak</v-btn>
        </div>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" location="right" temporary>
        <v-list density="comfortable">
          <v-list-item to="/" title="Home"/>
          <v-list-item to="/about" title="Tentang Kami"/>
          <v-list-item to="/schedule" title="Jadwal & Biaya"/>
          <v-list-item to="/gallery" title="Galeri"/>
          <v-list-item to="/blog" title="Berita & Artikel"/>
          <v-list-item to="/contact" title="Hubungi Kami"/>
        </v-list>
      </v-navigation-drawer>
      <v-main class="bg-grey-lighten-4">
        <slot />
      </v-main>
      <v-footer color="primary" class="d-flex flex-column pa-0">
        <div class="d-flex w-100 align-center px-4 py-2">
          <strong class="text-body-2">Terhubung dengan kami!</strong>
          <v-spacer/>
          <v-btn icon="mdi-instagram" variant="text" density="comfortable"/>
          <v-btn icon="mdi-facebook" variant="text" density="comfortable"/>
          <v-btn icon="mdi-whatsapp" variant="text" density="comfortable"/>
        </div>
        <div class="px-4 py-3 bg-black w-100 text-center text-caption">
          &copy; {{ year }} — <strong>PTM BMUP</strong>
        </div>
      </v-footer>
    </v-app>
  </ClientOnly>
  <v-app v-else>
    <v-app-bar color="primary" elevation="2">
      <template #prepend>
        <v-icon icon="mdi-tennis-ball" size="large" class="ml-2 mr-2"/>
      </template>
      <template #append>
        <v-app-bar-nav-icon class="d-flex d-sm-none" @click="drawer = !drawer"/>
      </template>
      <v-app-bar-title class="font-weight-bold text-h6">PTM BMUP</v-app-bar-title>
      <v-spacer/>
      <div class="d-none d-sm-flex">
        <v-btn variant="text" to="/" class="text-capitalize">Home</v-btn>
        <v-btn variant="text" to="/about" class="text-capitalize">Tentang Kami</v-btn>
        <v-btn variant="text" to="/schedule" class="text-capitalize">Jadwal</v-btn>
        <v-btn variant="text" to="/gallery" class="text-capitalize">Galeri</v-btn>
        <v-btn variant="text" to="/blog" class="text-capitalize">Blog</v-btn>
        <v-btn variant="text" to="/contact" class="text-capitalize">Kontak</v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" location="right" temporary>
      <v-list density="comfortable">
        <v-list-item to="/" title="Home"/>
        <v-list-item to="/about" title="Tentang Kami"/>
        <v-list-item to="/schedule" title="Jadwal & Biaya"/>
        <v-list-item to="/gallery" title="Galeri"/>
        <v-list-item to="/blog" title="Berita & Artikel"/>
        <v-list-item to="/contact" title="Hubungi Kami"/>
      </v-list>
    </v-navigation-drawer>
    <v-main class="bg-grey-lighten-4">
      <slot />
    </v-main>
    <v-footer color="primary" class="d-flex flex-column pa-0">
      <div class="d-flex w-100 align-center px-4 py-2">
        <strong class="text-body-2">Terhubung dengan kami!</strong>
        <v-spacer/>
        <v-btn icon="mdi-instagram" variant="text" density="comfortable"/>
        <v-btn icon="mdi-facebook" variant="text" density="comfortable"/>
        <v-btn icon="mdi-whatsapp" variant="text" density="comfortable"/>
      </div>
      <div class="px-4 py-3 bg-black w-100 text-center text-caption">
        &copy; {{ year }} — <strong>PTM BMUP</strong>
      </div>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { useState } from 'nuxt/app'
const year = useState('footer-year', () => new Date().getFullYear())
const dev = import.meta.env.DEV
const drawer = useState('nav-drawer', () => false)
</script>

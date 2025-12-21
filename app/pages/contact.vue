<template>
  <v-container class="py-16">
    <div class="text-center mb-12">
      <h1 class="text-h3 font-weight-bold text-primary mb-4">Hubungi Kami</h1>
      <p class="text-h6 text-medium-emphasis">Punya pertanyaan atau ingin bergabung? Jangan ragu menghubungi kami.</p>
    </div>

    <v-row>
      <!-- Contact Info & Map -->
      <v-col cols="12" md="5">
        <v-card class="mb-6 bg-primary text-white" elevation="4">
          <v-card-text class="pa-6">
            <h3 class="text-h5 font-weight-bold mb-6">Informasi Kontak</h3>
            
            <div class="d-flex mb-4 align-start">
              <v-icon icon="mdi-map-marker" class="mr-4 mt-1" size="large"/>
              <div>
                <div class="font-weight-bold">Alamat GOR:</div>
                <div>{{ data?.contact.address }}</div>
              </div>
            </div>

            <div class="d-flex mb-4 align-center">
              <v-icon icon="mdi-phone" class="mr-4" size="large"/>
              <div>
                <div class="font-weight-bold">Telepon / WhatsApp:</div>
                <div>{{ data?.contact.phone }}</div>
              </div>
            </div>

            <div class="d-flex mb-8 align-center">
              <v-icon icon="mdi-email" class="mr-4" size="large"/>
              <div>
                <div class="font-weight-bold">Email:</div>
                <div>{{ data?.contact.email }}</div>
              </div>
            </div>

            <div class="d-flex justify-space-around mt-8">
              <v-btn icon="mdi-instagram" variant="tonal" color="white"/>
              <v-btn icon="mdi-facebook" variant="tonal" color="white"/>
              <v-btn icon="mdi-youtube" variant="tonal" color="white"/>
            </div>
          </v-card-text>
        </v-card>

        <!-- Google Maps Embed -->
        <v-card elevation="2" class="overflow-hidden" height="300">
           <iframe
            :src="data?.contact.maps"
            width="100%"
            height="100%"
            style="border:0;"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
        </v-card>
      </v-col>

      <!-- Contact Form -->
      <v-col cols="12" md="7">
        <v-card elevation="2" class="pa-6 h-100">
          <h2 class="text-h4 font-weight-bold mb-6 text-primary">Kirim Pesan</h2>
          <v-form>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Nama Lengkap"
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="mdi-account"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Email / WhatsApp"
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="mdi-email-outline"
                />
              </v-col>
              <v-col cols="12">
                <v-select
                  label="Topik"
                  :items="['Info Pendaftaran', 'Jadwal Latihan', 'Sparring Partner', 'Lainnya']"
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="mdi-help-circle-outline"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Pesan Anda"
                  variant="outlined"
                  rows="5"
                  prepend-inner-icon="mdi-message-text-outline"
                />
              </v-col>
              <v-col cols="12">
                <v-btn color="secondary" size="large" block class="font-weight-bold">
                  Kirim Pesan
                  <v-icon icon="mdi-send" class="ml-2"/>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAsyncData, useSeoMeta } from 'nuxt/app'
import { useLandingData } from '~/composables/useLandingData'
defineOptions({ name: 'ContactPage' })

const { data } = await useAsyncData('landing', () => Promise.resolve(useLandingData()))

useSeoMeta({
  title: 'Hubungi Kami - PTM BMUP',
  description: 'Kontak PTM BMUP, lokasi GOR, dan formulir pendaftaran anggota baru.',
})
</script>

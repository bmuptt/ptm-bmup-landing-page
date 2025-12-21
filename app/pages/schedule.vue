<template>
  <v-container class="py-16">
    <div class="text-center mb-12">
      <h1 class="text-h3 font-weight-bold text-primary mb-4">Jadwal & Biaya</h1>
      <p class="text-h6 text-medium-emphasis">Informasi lengkap kegiatan rutin dan keanggotaan.</p>
    </div>

    <v-row>
      <!-- Schedule Table -->
      <v-col cols="12" md="8">
        <v-card class="mb-8" elevation="2">
          <v-card-title class="bg-primary text-white py-4 px-6">
            <v-icon icon="mdi-calendar-clock" class="mr-2"/>
            Jadwal Latihan
          </v-card-title>
          <v-table>
            <thead>
              <tr>
                <th class="text-left font-weight-bold">Hari</th>
                <th class="text-left font-weight-bold">Jam</th>
                <th class="text-left font-weight-bold">Kategori</th>
                <th class="text-left font-weight-bold">Pelatih/PJ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in data?.schedulePage.schedules" :key="index">
                <td class="font-weight-medium">{{ item.day }}</td>
                <td>{{ item.time }}</td>
                <td>
                  <v-chip size="small" color="secondary" variant="flat" class="font-weight-bold">
                    {{ item.category }}
                  </v-chip>
                </td>
                <td>{{ item.coach }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card>

        <!-- Additional Info -->
        <v-alert
          icon="mdi-information"
          title="Catatan Penting"
          text="Jadwal dapat berubah sewaktu-waktu menyesuaikan ketersediaan GOR. Harap konfirmasi ke pengurus sebelum datang untuk latihan perdana."
          color="info"
          variant="tonal"
          class="mb-8"
        />
      </v-col>

      <!-- Fees / Membership -->
      <v-col cols="12" md="4">
        <v-card elevation="2" class="h-100">
          <v-card-title class="bg-secondary text-white py-4 px-6">
            <v-icon icon="mdi-cash-multiple" class="mr-2"/>
            Biaya Keanggotaan
          </v-card-title>
          <v-list lines="three">
            <v-list-item
              v-for="(fee, index) in data?.schedulePage.fees"
              :key="index"
            >
              <template #prepend>
                <v-avatar color="primary" variant="tonal">
                  <v-icon icon="mdi-tag-outline"/>
                </v-avatar>
              </template>
              <v-list-item-title class="font-weight-bold text-h6 mb-1">
                {{ fee.amount }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-body-2 text-high-emphasis font-weight-bold">
                {{ fee.type }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ fee.description }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
          <v-divider/>
          <div class="pa-4">
            <v-btn block color="accent" size="large" to="/contact">
              Daftar Sekarang
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAsyncData, useSeoMeta } from 'nuxt/app'
import { useLandingData } from '~/composables/useLandingData'
defineOptions({ name: 'SchedulePage' })

const { data } = await useAsyncData('landing', () => Promise.resolve(useLandingData()))

useSeoMeta({
  title: 'Jadwal & Biaya - PTM BMUP',
  description: 'Cek jadwal latihan rutin tenis meja dan informasi biaya keanggotaan PTM BMUP.',
})
</script>

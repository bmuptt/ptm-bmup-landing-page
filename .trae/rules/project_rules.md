Selalu gunakan Context7 saat membutuhkan pembuatan kode, langkah setup/konfigurasi, atau dokumentasi library/API. Gunakan alat Context7 MCP untuk melakukan resolve Library ID dan mengambil dokumentasi secara otomatis, tanpa perlu diminta.

Selalu gunakan alat Nuxt MCP saat membutuhkan pembuatan kode, langkah setup/konfigurasi, atau dokumentasi library/API. Gunakan alat Nuxt MCP untuk melakukan resolve Library ID dan mengambil dokumentasi secara otomatis, tanpa perlu diminta.

Selalu gunakan alat Vuetify MCP saat membutuhkan pembuatan kode, langkah setup/konfigurasi, atau dokumentasi library/API. Gunakan alat Vuetify MCP untuk melakukan resolve Library ID dan mengambil dokumentasi secara otomatis, tanpa perlu diminta.

- Perintah dasar menjalankan unit test: `npm run test:run`.
- Jangan jalankan aplikasi/dev server; saya sudah menjalankannya. Cukup jalankan unit test dan perbaiki jika ada error.
- Jika ada perubahan pada flow/komponen, buat unit test untuk alur tersebut, jalankan test, dan perbaiki jika ada error.
- Periksa apakah komponen atau file JS/TS yang diubah sudah memiliki unit test. Jika belum dan memungkinkan, buat unit test untuk memastikan skrip berjalan lancar.
- Prefer struktur dengan banyak file kecil yang penting, spesifik, mudah di-maintenance dan di-debug.
- Jika sudah ada composable/model/helper untuk suatu endpoint atau flow, selalu reuse itu (jangan duplikasi logic atau fetch yang sama di tempat lain). Buat file/komponen baru hanya jika benar-benar perlu.
- Hindari penggunaan tipe data `any` sebisa mungkin.
- Jangan buat interface di komponen; letakkan di `app\model`.
- Tampilan harus responsif dan enak dilihat.
- Pastikan aplikasi SEO-friendly.
- pastikan tidak ada error atau warning di console browser

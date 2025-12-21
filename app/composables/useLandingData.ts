export const useLandingData = () => {
  return {
    hero: {
      title: 'Selamat Datang di PTM BMUP',
      subtitle: 'Komunitas Tenis Meja yang Solid dan Menyenangkan',
      image:
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
      cta: 'Gabung Sekarang',
    },
    about: {
      title: 'Tentang Kami',
      description:
        'PTM BMUP adalah Persatuan Tenis Meja yang berlokasi di lingkungan BMUP. Kami mewadahi para pecinta tenis meja dari berbagai kalangan untuk berlatih, bertanding, dan menjalin silaturahmi. Visi kami adalah menciptakan komunitas yang sehat, sportif, dan kekeluargaan.',
      image:
        'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2070&auto=format&fit=crop',
    },
    activities: [
      {
        id: 1,
        title: 'Latihan Rutin',
        description:
          'Setiap Sabtu & Minggu pukul 07:00 - 10:00 WIB. Latihan bebas dan bimbingan teknik dasar.',
        icon: 'mdi-table-tennis',
      },
      {
        id: 2,
        title: 'Turnamen Internal',
        description:
          'Diadakan setiap bulan untuk mengasah kemampuan dan mental bertanding anggota.',
        icon: 'mdi-trophy',
      },
      {
        id: 3,
        title: 'Sparring Partner',
        description:
          'Kunjungan ke PTM lain atau menerima kunjungan untuk menambah pengalaman dan relasi.',
        icon: 'mdi-handshake',
      },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1599586120429-48285b6a8a81?q=80&w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?q=80&w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=600&h=400&fit=crop',
    ],
    contact: {
      email: 'info@ptmbmup.com',
      phone: '+62 812-3456-7890',
      address: 'GOR BMUP, Jl. Contoh No. 123, Jakarta',
      maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.4363290457636!2d106.845599314769!3d-6.205775995507851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f46f3938d223%3A0x25a52861b58552c6!2sMonumen%20Nasional!5e0!3m2!1sid!2sid!4v1626245837640!5m2!1sid!2sid',
    },
    aboutPage: {
      history: [
        {
          year: '2015',
          title: 'Pendirian PTM BMUP',
          description: 'Berawal dari kumpul-kumpul warga BMUP yang hobi tenis meja, akhirnya sepakat membentuk komunitas resmi.',
        },
        {
          year: '2017',
          title: 'Renovasi GOR',
          description: 'Perbaikan fasilitas GOR BMUP agar lebih layak dan nyaman untuk latihan rutin.',
        },
        {
          year: '2020',
          title: 'Juara Turnamen Antar PTM',
          description: 'Meraih juara 1 kategori beregu pada turnamen persahabatan se-Jakarta Selatan.',
        },
        {
          year: '2023',
          title: 'Ekspansi Program',
          description: 'Membuka kelas pembinaan usia dini untuk mencetak bibit atlet baru.',
        },
      ],
      vision: 'Menjadi komunitas tenis meja terdepan yang menjunjung tinggi sportivitas dan kekeluargaan.',
      mission: [
        'Menyediakan fasilitas latihan yang memadai bagi anggota.',
        'Mengadakan kegiatan rutin untuk menjaga kebugaran dan silaturahmi.',
        'Mengembangkan potensi atlet muda berbakat.',
      ],
      teams: [
        {
          name: 'Budi Santoso',
          role: 'Ketua Umum',
          image: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
        {
          name: 'Siti Aminah',
          role: 'Sekretaris',
          image: 'https://randomuser.me/api/portraits/women/2.jpg',
        },
        {
          name: 'Joko Susilo',
          role: 'Bendahara',
          image: 'https://randomuser.me/api/portraits/men/3.jpg',
        },
        {
          name: 'Agus Setiawan',
          role: 'Pelatih Kepala',
          image: 'https://randomuser.me/api/portraits/men/4.jpg',
        },
      ],
    },
    schedulePage: {
      schedules: [
        {
          day: 'Selasa',
          time: '19:00 - 22:00',
          category: 'Latihan Umum',
          coach: 'Pak Agus',
        },
        {
          day: 'Kamis',
          time: '19:00 - 22:00',
          category: 'Latihan Umum',
          coach: 'Pak Agus',
        },
        {
          day: 'Sabtu',
          time: '07:00 - 10:00',
          category: 'Latihan Pagi & Junior',
          coach: 'Tim Pelatih',
        },
        {
          day: 'Minggu',
          time: '07:00 - 12:00',
          category: 'Game & Turnamen Mini',
          coach: '-',
        },
      ],
      fees: [
        {
          type: 'Iuran Bulanan',
          amount: 'Rp 50.000',
          description: 'Untuk biaya listrik, kebersihan, dan perawatan meja.',
        },
        {
          type: 'Member Insidental',
          amount: 'Rp 10.000',
          description: 'Per kedatangan (non-member rutin).',
        },
        {
          type: 'Program Coaching',
          amount: 'Rp 200.000',
          description: 'Paket 4x pertemuan (privat/kelompok kecil).',
        },
      ],
    },
    blogData: [
      {
        id: 1,
        title: 'Keseruan Turnamen Internal Bulan Juli',
        date: '2025-07-20',
        excerpt: 'Turnamen bulan ini diikuti oleh 30 peserta dengan persaingan yang sangat ketat di babak final.',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&h=400&fit=crop',
        content: '<p>Turnamen internal PTM BMUP bulan Juli 2025 berjalan dengan sangat meriah. Diikuti oleh lebih dari 30 peserta dari berbagai kategori usia, turnamen ini menjadi ajang pembuktian hasil latihan selama ini.</p><p>Pertandingan final mempertemukan Pak Budi melawan Mas Andi, yang dimenangkan oleh Pak Budi dengan skor tipis 3-2.</p>',
      },
      {
        id: 2,
        title: 'Tips Memilih Bet Tenis Meja untuk Pemula',
        date: '2025-08-05',
        excerpt: 'Jangan salah pilih! Simak panduan lengkap memilih kayu dan karet bet yang sesuai dengan gaya mainmu.',
        image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=600&h=400&fit=crop',
        content: '<p>Memilih bet tenis meja bisa membingungkan bagi pemula. Ada banyak jenis kayu (blade) dan karet (rubber) di pasaran.</p><p>Untuk pemula, disarankan menggunakan kayu tipe Allround (ALL) yang memiliki kontrol tinggi. Hindari penggunaan karet bintik atau anti-spin di awal belajar agar teknik dasar terbentuk dengan baik.</p>',
      },
      {
        id: 3,
        title: 'Kunjungan Persahabatan dari PTM Sebelah',
        date: '2025-08-15',
        excerpt: 'Minggu lalu kita kedatangan tamu spesial dari PTM Sahabat. Simak keseruannya di sini.',
        image: 'https://images.unsplash.com/photo-1599586120429-48285b6a8a81?q=80&w=600&h=400&fit=crop',
        content: '<p>Hari Minggu lalu menjadi hari yang spesial karena PTM BMUP kedatangan tamu dari PTM Sahabat. Kegiatan sparring partner ini bertujuan untuk mempererat tali silaturahmi antar komunitas tenis meja.</p><p>Acara ditutup dengan makan siang bersama dan pembagian doorprize menarik.</p>',
      },
    ],
  }
}


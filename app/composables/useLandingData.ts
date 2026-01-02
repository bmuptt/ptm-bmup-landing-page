import type { LandingActivityItem } from '~/model/landing-activities'
import type { AboutTimeline } from '~/model/about-timeline'
import { fetchCoreSetting } from './useCoreSetting'
import { fetchLandingSections } from './useLandingSections'
import { fetchLandingActivities } from './useLandingActivities'
import { fetchAboutTimelines } from './useAboutTimelines'
import { fetchAboutTeamMembers } from './useAboutTeamMembers'

export const useLandingData = async () => {
  const coreSetting = await fetchCoreSetting()
  const landingSections = await fetchLandingSections()

  let activities: LandingActivityItem[] = []

  const activitiesResponse = await fetchLandingActivities()
  activities = activitiesResponse.map(activity => ({
    id: activity.id,
    title: activity.title,
    description: activity.subtitle,
    icon: activity.icon?.name || 'mdi-table-tennis',
  }))

  const aboutTimelines: AboutTimeline[] = await fetchAboutTimelines()
  const aboutTeamMembers = await fetchAboutTeamMembers()

  // Helper to find item by page and key
  const findItem = (pageKey: string, itemKey: string) => {
    const section = landingSections?.find(s => s.section.page_key === pageKey)
    return section?.items.find(i => i.key === itemKey)
  }

  const heroItem = findItem('home', 'hero')
  const aboutItem = findItem('home', 'tentang_kami')
  const emailItem = findItem('home', 'contact_email')
  const phoneItem = findItem('home', 'contact_phone')
  const visionItem = findItem('about', 'visi')
  const missionItem = findItem('about', 'misi')

  const data = {
    core: coreSetting,
    hero: {
      title: heroItem?.title || '',
      subtitle: heroItem?.content || '',
      cta: heroItem?.button_label || '',
    },
    about: {
      title: aboutItem?.title || 'Tentang Kami',
      description: aboutItem?.content || '',
      image: aboutItem?.image_url || '',
    },
    contact: {
      email: emailItem?.content || '',
      phone: phoneItem?.content || '',
      address: coreSetting?.address || '',
      maps: coreSetting?.maps || '',
    },
    aboutPage: {
      vision: visionItem?.content || '',
      mission: missionItem?.content || '',
      history: aboutTimelines,
      teams: aboutTeamMembers.map((item) => ({
        name: item.member?.name || '',
        role: item.role,
        image: item.member?.photo || '',
      })),
    },
    activities,
    gallery: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1599586120429-48285b6a8a81?q=80&w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?q=80&w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=600&h=400&fit=crop',
    ],
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
  
  return data
}

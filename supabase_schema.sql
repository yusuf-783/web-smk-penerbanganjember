-- ================================================================
-- SKRIP DATABASE SUPABASE (AMAN & KOMPATIBEL DENGAN TABEL LAMA)
-- SMK PENERBANGAN JEMBER
-- Jalankan skrip ini di: Supabase Dashboard > SQL Editor
-- ================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ================================================================
-- 2. TABEL USERS (Autentikasi Admin)
-- ================================================================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.users ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS password_hash TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'admin';

-- ================================================================
-- 3. TABEL GURU & PENGAJAR (Teachers)
-- ================================================================
CREATE TABLE IF NOT EXISTS public.teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS code TEXT;
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS email TEXT;

-- ================================================================
-- 4. TABEL ABSENSI GURU (Attendance)
-- ================================================================
CREATE TABLE IF NOT EXISTS public.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES public.teachers(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  hours INT NOT NULL DEFAULT 0,
  month INT NOT NULL,
  year INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS teacher_id UUID;
ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS date DATE;
ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS hours INT DEFAULT 0;
ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS activity TEXT DEFAULT '';
ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS month INT;
ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS year INT;

-- Unique constraint agar 1 guru hanya punya 1 catatan per tanggal
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'uq_teacher_date'
  ) THEN
    ALTER TABLE public.attendance ADD CONSTRAINT uq_teacher_date UNIQUE (teacher_id, date);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_attendance_month_year ON public.attendance(month, year);
CREATE INDEX IF NOT EXISTS idx_attendance_teacher ON public.attendance(teacher_id);

-- ================================================================
-- 5. TABEL PROFIL SEKOLAH (School Info)
-- ================================================================
CREATE TABLE IF NOT EXISTS public.school_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_name TEXT NOT NULL,
  vision TEXT,
  mission TEXT,
  headmaster_name TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.school_info ADD COLUMN IF NOT EXISTS school_name TEXT;
ALTER TABLE public.school_info ADD COLUMN IF NOT EXISTS vision TEXT;
ALTER TABLE public.school_info ADD COLUMN IF NOT EXISTS mission TEXT;
ALTER TABLE public.school_info ADD COLUMN IF NOT EXISTS headmaster_name TEXT;
ALTER TABLE public.school_info ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE public.school_info ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.school_info ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.school_info ADD COLUMN IF NOT EXISTS website TEXT;

-- ================================================================
-- 6. TABEL JURUSAN / PROGRAM KEAHLIAN (Majors)
-- ================================================================
CREATE TABLE IF NOT EXISTS public.majors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  career TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.majors ADD COLUMN IF NOT EXISTS code TEXT;
ALTER TABLE public.majors ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.majors ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.majors ADD COLUMN IF NOT EXISTS icon TEXT;
ALTER TABLE public.majors ADD COLUMN IF NOT EXISTS career TEXT;
ALTER TABLE public.majors ADD COLUMN IF NOT EXISTS image_url TEXT;

-- ================================================================
-- 7. TABEL BERITA & ARTIKEL (News)
-- ================================================================
CREATE TABLE IF NOT EXISTS public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  content TEXT NOT NULL,
  image_url TEXT,
  category TEXT DEFAULT 'Berita',
  author TEXT DEFAULT 'Admin',
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.news ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.news ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE public.news ADD COLUMN IF NOT EXISTS content TEXT;
ALTER TABLE public.news ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.news ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Berita';
ALTER TABLE public.news ADD COLUMN IF NOT EXISTS author TEXT DEFAULT 'Admin';
ALTER TABLE public.news ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ DEFAULT now();

-- ================================================================
-- 8. TABEL PENGUMUMAN (Announcements)
-- ================================================================
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.announcements ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.announcements ADD COLUMN IF NOT EXISTS content TEXT;

-- ================================================================
-- 9. TABEL GALERI FOTO (Gallery)
-- ================================================================
CREATE TABLE IF NOT EXISTS public.gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'Kegiatan',
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.gallery ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.gallery ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.gallery ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Kegiatan';
ALTER TABLE public.gallery ADD COLUMN IF NOT EXISTS image_url TEXT;

-- ================================================================
-- 10. TABEL PESAN MASUK DARI FORM KONTAK (Messages)
-- ================================================================
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS subject TEXT;
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS message TEXT;
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS is_read BOOLEAN DEFAULT false;

-- ================================================================
-- 11. KEBIJAKAN KEAMANAN & AKSES (Row Level Security / RLS)
-- ================================================================
ALTER TABLE public.school_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.majors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Buat Policy jika belum ada (Aman dari duplicate error)
DO $$ 
BEGIN
  -- Read policies
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read school_info') THEN
    CREATE POLICY "Public Read school_info" ON public.school_info FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read majors') THEN
    CREATE POLICY "Public Read majors" ON public.majors FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read news') THEN
    CREATE POLICY "Public Read news" ON public.news FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read announcements') THEN
    CREATE POLICY "Public Read announcements" ON public.announcements FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read gallery') THEN
    CREATE POLICY "Public Read gallery" ON public.gallery FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Insert messages') THEN
    CREATE POLICY "Public Insert messages" ON public.messages FOR INSERT WITH CHECK (true);
  END IF;

  -- Service Full Access policies
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service Full Access users') THEN
    CREATE POLICY "Service Full Access users" ON public.users FOR ALL USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service Full Access teachers') THEN
    CREATE POLICY "Service Full Access teachers" ON public.teachers FOR ALL USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service Full Access attendance') THEN
    CREATE POLICY "Service Full Access attendance" ON public.attendance FOR ALL USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service Full Access messages') THEN
    CREATE POLICY "Service Full Access messages" ON public.messages FOR ALL USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service Full Access school_info') THEN
    CREATE POLICY "Service Full Access school_info" ON public.school_info FOR ALL USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service Full Access majors') THEN
    CREATE POLICY "Service Full Access majors" ON public.majors FOR ALL USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service Full Access news') THEN
    CREATE POLICY "Service Full Access news" ON public.news FOR ALL USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service Full Access announcements') THEN
    CREATE POLICY "Service Full Access announcements" ON public.announcements FOR ALL USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service Full Access gallery') THEN
    CREATE POLICY "Service Full Access gallery" ON public.gallery FOR ALL USING (true);
  END IF;
END $$;

-- ================================================================
-- 12. DATA AWAL (SEED DATA)
-- ================================================================

-- Isi atau Update Data Profil Sekolah
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.school_info LIMIT 1) THEN
    INSERT INTO public.school_info (school_name, vision, mission, headmaster_name, address, phone, email, website)
    VALUES (
      'SMK Penerbangan Jember',
      'Mewujudkan lembaga pendidikan kejuruan kedirgantaraan yang unggul, berkarakter disiplin semi-militer, bertakwa, dan berdaya saing internasional.',
      '1. Menyelenggarakan pendidikan vokasi penerbangan berstandar industri internasional.\n2. Membentuk karakter taruna yang berdisiplin tinggi, tangguh, dan berintegritas.\n3. Mengembangkan sarana laboratorium avionik, simulator, dan hangar pesawat mutakhir.\n4. Menjalin kemitraan link-and-match dengan maskapai dan bandara internasional.',
      'Drs. H. Ahmad Subagio, M.Pd.',
      'Jl. PB Sudirman No. 45, Patrang, Jember, Jawa Timur',
      '(0331) 487652',
      'info@smkpenerbangan-jember.sch.id',
      'https://smkpenerbangan-jember.sch.id'
    );
  END IF;
END $$;

-- Isi Data Guru Awal (Jika belum ada)
INSERT INTO public.teachers (code, name, phone, email) VALUES
  ('GUR-01', 'Kapten (Pnb) Hendra Pratama, S.T.', '081234567890', 'hendra@smkpenerbangan.sch.id'),
  ('GUR-02', 'Ir. Bambang Triyono, M.T.', '081234567891', 'bambang@smkpenerbangan.sch.id'),
  ('GUR-03', 'Siti Rahmawati, S.Pd., M.Si.', '081234567892', 'siti@smkpenerbangan.sch.id'),
  ('GUR-04', 'Lettu (Tek) Agus Setiawan, S.T.', '081234567893', 'agus@smkpenerbangan.sch.id'),
  ('GUR-05', 'Dedi Kurniawan, S.Kom., M.Kom.', '081234567894', 'dedi@smkpenerbangan.sch.id')
ON CONFLICT DO NOTHING;

-- Isi Data Jurusan (Jika belum ada)
INSERT INTO public.majors (code, name, description, icon, career) VALUES
  ('AP', 'Airframe and Powerplant (Teknik Pemeliharaan Pesawat Udara)', 'Mempelajari pemeliharaan, inspeksi, dan perbaikan sistem rangka (airframe) serta mesin turbin/piston penggerak pesawat udara.', '✈️', 'Aircraft Maintenance Technician, Ground Support Engineer, Quality Assurance Aviation'),
  ('EA', 'Electrical Avionics (Elektronika dan Instrumentasi Pesawat)', 'Fokus pada sistem kelistrikan, navigasi satelit, komunikasi radio, radar, dan instrumen kokpit digital modern.', '⚡', 'Avionics Technician, Radar & Navigation Specialist, Cockpit Instrument Inspector'),
  ('AT', 'Aviation Telecommunication (Telekomunikasi Penerbangan)', 'Kompetensi transmisi data lalu lintas udara (ATC), radar bandara, satelit cuaca, dan jaringan telekomunikasi penerbangan.', '📡', 'Air Traffic Communication Operator, Airport System Maintenance, Radio Engineer'),
  ('TKJ', 'Teknik Komputer dan Jaringan (Aviation IT Support)', 'Spesialisasi integrasi server bandara, sistem data manifest penerbangan, cybersecurity, dan jaringan komputer terpadu.', '💻', 'Aviation IT Support, Network Administrator, Airport Database Specialist')
ON CONFLICT DO NOTHING;

-- Isi Berita Awal (Jika belum ada)
INSERT INTO public.news (title, slug, content, image_url, category, author, published_at) VALUES
  (
    'Penerimaan Peserta Didik Baru (PPDB) SMK Penerbangan Jember Tahun Ajaran Baru Dibuka',
    'ppdb-smk-penerbangan-jember-dibuka',
    'SMK Penerbangan Jember resmi membuka pendaftaran peserta didik baru (PPDB) untuk tahun ajaran baru. Tersedia berbagai program beasiswa prestasi dan fasilitas laboratorium mutakhir untuk calon taruna-taruni berpotensi.',
    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    'Pengumuman',
    'Humas SMK Penerbangan',
    now()
  ),
  (
    'Kunjungan Edukasi dan Praktik Lapangan Taruna SMK Penerbangan di Hangar Bandara',
    'kunjungan-edukasi-hangar-bandara',
    'Siswa jurusan Airframe & Powerplant dan Electrical Avionics melaksanakan studi lapangan dan observasi langsung prosedur perawatan rutin pesawat komersial di pangkalan dan hangar bandara mitra.',
    'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80',
    'Kegiatan',
    'Tim Redaksi Taruna',
    now() - INTERVAL '3 days'
  ),
  (
    'Prestasi Membanggakan: Taruna SMK Penerbangan Jember Raih Juara LKS Tingkat Provinsi',
    'prestasi-juara-lks-provinsi',
    'Selamat kepada perwakilan taruna yang berhasil mengukir prestasi gemilang dalam Lomba Kompetensi Siswa (LKS) bidang teknologi kedirgantaraan dan avionic tingkat provinsi.',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    'Prestasi',
    'Kesiswaan',
    now() - INTERVAL '7 days'
  )
ON CONFLICT DO NOTHING;

-- Isi Pengumuman Awal (Jika belum ada)
INSERT INTO public.announcements (title, content) VALUES
  ('Jadwal Tes Fisik & Wawancara PPDB Gelombang I', 'Pelaksanaan tes kesamaptaan fisik dan wawancara calon taruna gelombang I akan dilaksanakan pada hari Sabtu pukul 07.30 WIB di kampus utama.'),
  ('Pemberitahuan Pelaksanaan Gladi Bersih Upacara Pelantikan', 'Seluruh calon taruna angkatan baru wajib hadir mengikuti gladi bersih upacara pelantikan taruna dengan mengenakan seragam PDL lengkap.')
ON CONFLICT DO NOTHING;

-- Isi Galeri Dokumentasi Awal (Jika belum ada)
INSERT INTO public.gallery (title, category, description, image_url) VALUES
  ('Praktik Pemeliharaan Mesin Turbin di Hangar', 'Praktik', 'Taruna melaksanakan inspeksi rutin mesin turbin pesawat latih di hangar sekolah.', 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80'),
  ('Upacara Tradisi Pelantikan Taruna Angkatan Baru', 'Kegiatan', 'Tradisi pelantikan taruna baru dengan penuh khidmat, kebanggaan, dan disiplin tinggi.', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'),
  ('Simulasi Sistem Instrumentasi & Navigasi Kokpit', 'Praktik', 'Pengujian sinyal radio komunikasi dan kalibrasi alat instrumen kokpit pada flight simulator.', 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80'),
  ('Gedung dan Kampus Utama SMK Penerbangan Jember', 'Fasilitas', 'Suasana lingkungan sekolah yang asri, modern, dan kondusif untuk menuntut ilmu kedirgantaraan.', 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80'),
  ('Latihan Kedisiplinan PBB & Korps Drum Band', 'Ekstrakurikuler', 'Penampilan tim drum band Gita Dirgantara saat atraksi parade hari kemerdekaan.', 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80'),
  ('Kunjungan Industri & Observasi di Bandara', 'Kegiatan', 'Studi lapangan mengenal operasional ground handling dan safety aircraft di bandara mitra.', 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80')
ON CONFLICT DO NOTHING;

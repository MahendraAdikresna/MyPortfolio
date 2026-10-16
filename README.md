# Portofolio — Junior Frontend Developer

Website portofolio pribadi bergaya **editorial minimal** (terinspirasi [constancesouville.com](https://constancesouville.com/)),
dibuat **hanya dengan HTML, CSS, dan JavaScript**. Tanpa framework, tanpa Tailwind, tanpa
proses build. Cukup buka `index.html` di browser.

Isi halaman mengikuti saran artikel Codecademy
["What To Include In A Junior Developer Portfolio"](https://www.codecademy.com/resources/blog/what-to-include-in-a-junior-developer-portfolio).

---

## Struktur file

```
Portfolio/
├── index.html    → seluruh isi & struktur halaman
├── style.css     → semua tampilan (bagian bernomor, token warna di :root)
├── script.js     → 5 fungsi kecil, semuanya berkomentar bahasa Indonesia
├── cv.pdf        → CV contoh (placeholder, buat sendiri lalu timpa file ini)
├── favicon.svg   → ikon tab browser
└── README.md     → panduan ini
```

## Cara menjalankan

Buka `index.html` langsung dengan klik dua kali, **atau** pakai live server agar perubahan
langsung terlihat tanpa refresh:

```bash
# kalau punya Python
python -m http.server 5500

# kalau punya Node.js
npx serve .
```

Lalu buka `http://localhost:5500`.

---

## Kesesuaian dengan rekomendasi Codecademy

| Rekomendasi artikel | Ada di halaman ini |
| --- | --- |
| Bio: latar belakang, pendidikan, penghargaan | bagian `#tentang` di panel krem (pernyataan singkat + paragraf pengenalan) |
| Sentuhan pribadi: hobi / hal menarik | belum ada — tambahkan sendiri bila perlu (lihat bagian 3 di bawah) |
| Kontak: nama & email mudah ditemukan | header (layar lebar), menu mobile, dan bagian `#kontak` |
| CV / resume bisa diunduh | belum ada tombolnya — file `cv.pdf` sudah disiapkan, lihat **bagian 2** untuk memasang tautannya |
| Proyek: peran, tantangan, hasil | tiap baris proyek di `#proyek` punya blok **Peran / Tantangan / Hasil** yang muncul saat dibuka |
| Keahlian teknis **dan** soft skill | `#keahlian` dibagi menjadi **Keahlian teknis** dan **Soft skill** |
| Rekomendasi / testimoni | belum ada — boleh ditambahkan kalau sudah punya |
| Personal branding (domain sendiri) | lihat bagian *publikasi* di bawah |

---

## Bagian yang perlu kamu ganti

Semua tempat yang perlu diubah sudah ditandai komentar `GANTI:` di `index.html`.
Cari dengan Ctrl+F kata `GANTI`.

### 1. Identitas

| Yang diubah | Lokasi di `index.html` |
| --- | --- |
| Nama depan & belakang | bagian `<h1 class="hero__title">` |
| Email | `.menu__mail`, `.header__mail`, dan `.clink` pertama |
| Judul & deskripsi tab | dalam `<head>` |
| Tautan GitHub / LinkedIn | `.clink` kedua (GitHub) |

Nama lengkap sengaja **tidak** diulang di navbar — di header hanya ada menu, email, dan tombol
burger. Nama besar sekali saja di hero, jadi tidak terkesan dobel.

**Huruf miring pada nama:** huruf yang dibungkus `<i>` tampil miring.
Contoh `Mahendr<i>a</i>` menghasilkan *Mahendra* dengan huruf `a` miring.

### 2. CV

File `cv.pdf` sudah ada di folder ini, tapi masih contoh. Halaman ini **belum menampilkan tombol
unduh** — di `#kontak` hanya ada tombol GitHub. Kalau ingin CV bisa diunduh pengunjung, tambahkan
satu tombol di dalam `<div class="contact__cv">`, di bawah tombol GitHub:

```html
<a class="btn" href="cv.pdf" download>Unduh CV (PDF)</a>
```

Lalu timpa `cv.pdf` dengan CV aslimu (nama file harus tetap `cv.pdf`). Kalau namanya berbeda,
samakan juga `href` pada tombol di atas.

### 3. Pengenalan diri (Tentang saya)

Bagian `#tentang` ada di **panel krem**, tepat di bawah nama besar — jadi pengunjung langsung
membaca siapa kamu. Isinya dua hal:

- Pernyataan singkat → `<p class="statement">`: satu kalimat besar, boleh dipakai untuk
  menegaskan cara kerjamu.
- Paragraf pengenalan → `<p>` di dalam `.about__body`. Ganti dengan ceritamu sendiri
  (asal sekolah, apa yang sedang dipelajari, dan hal yang ingin kamu kerjakan).

Mau menambah **pendidikan**, **penghargaan**, atau **hobi**? Tambahkan saja paragraf atau daftar
baru di dalam `.about__body`, lalu rapikan tampilannya di `style.css` kalau perlu.

### 4. Proyek

Setiap proyek adalah satu `<details class="project">`. Yang terlihat di halaman hanya **baris
judulnya** saja; rinciannya baru muncul setelah baris itu diketuk. Cara ini membuat bagian proyek
tetap pendek — penting untuk pengunjung yang membuka dari ponsel.

Bagian **Peran / Tantangan / Hasil** ada di dalam `<dl class="project__facts">` — ini yang paling
dicari perekrut, jadi tulis kendala nyata dan cara kamu mengatasinya.

```html
<details class="project" data-fade style="--accent: var(--c-red)">
  <summary class="project__row">
    <span class="project__dot" aria-hidden="true"></span>
    <span class="project__name">Judul Proyek</span>
    <span class="project__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
    </span>
  </summary>

  <div class="project__body">
    <p class="project__meta mono">Latihan · 2025</p>
    <p class="project__desc">Penjelasan singkat proyek kamu.</p>

    <dl class="project__facts">
      <div class="project__fact">
        <dt class="mono">Peran</dt>
        <dd>Apa yang kamu kerjakan sendiri.</dd>
      </div>
      <div class="project__fact">
        <dt class="mono">Tantangan</dt>
        <dd>Kendala yang kamu temui dan cara mengatasinya.</dd>
      </div>
      <div class="project__fact">
        <dt class="mono">Hasil</dt>
        <dd>Dampak atau pelajaran yang kamu dapat.</dd>
      </div>
    </dl>

    <div class="project__foot">
      <ul class="tags">
        <li class="tag">HTML</li>
        <li class="tag">CSS</li>
      </ul>
      <a class="project__link" href="https://tautan-proyek.com" target="_blank" rel="noopener">
        Lihat proyek
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </a>
    </div>
  </div>
</details>
```

- `--accent` menentukan warna titik di kiri judul: `var(--c-red)`, `var(--c-ochre)`,
  `var(--c-olive)`, atau `var(--c-ink)`.
- Mau menambah proyek? Salin satu `<details>` dan tempel di bawahnya. Cukup 3–4 proyek terbaik.
- Kalau kamu ingin rinciannya **terbuka otomatis**, tambahkan atribut `open` pada `<details>`.
- Buka-tutup ini memakai elemen asli HTML (`<details>`), jadi tetap jalan walau JavaScript mati.

### 5. Keahlian

Dua kelompok di `#keahlian`: `.skillgroup` pertama untuk keahlian teknis, kedua untuk soft skill.
Setiap baris adalah satu `<div class="skill">`.

### 6. Testimoni (opsional)

Versi ini belum punya bagian testimoni, dan gaya untuk itu juga belum ada di `style.css`.
Kalau nanti sudah ada orang yang bisa memberi rekomendasi, tambahkan satu bagian baru di panel abu
(setelah `#proyek`) dengan pola `<section class="section">` yang sudah ada, lalu tulis gayanya
sendiri mengikuti token warna di `:root`.

### 7. Warna & tipografi

Semua "tombol pengatur" ada di bagian atas `style.css` dalam `:root`:

```css
--c-cream: #fbefdf;   /* panel krem   */
--c-grey:  #d6d5cb;   /* panel abu    */
--c-ink:   #3f3b37;   /* panel gelap  */
--c-red:   #db4c44;   /* aksen merah  */
--c-ochre: #e7aa2c;   /* aksen kuning */
--c-olive: #8f9a72;   /* aksen hijau  */
```

Ganti satu nilai di sini dan seluruh halaman ikut berubah. Untuk font, ubah `--f-serif`,
`--f-sans`, dan `--f-mono` (jangan lupa perbarui tautan Google Fonts di `index.html` jika
memakai font lain).

---

## Catatan penting

**Form kontak belum punya server.** Saat ini form memvalidasi isian di browser lalu membuka
aplikasi email pengguna (`mailto:`). Kalau ingin pesan masuk otomatis, buat akun gratis di
[Formspree](https://formspree.io) lalu ubah `<form class="form" id="contactForm" novalidate>`
menjadi:

```html
<form class="form" id="contactForm" action="https://formspree.io/f/KODE-KAMU" method="POST">
```

dan hapus baris `event.preventDefault();` di dalam `form.addEventListener("submit", ...)`
pada `script.js`.

**Font.** Referensi aslinya memakai PP Editorial New & PP Neue Montreal (berbayar). Proyek ini
memakai padanan gratis dari Google Fonts: Instrument Serif, Inter, dan JetBrains Mono. Karena
diambil dari internet, saat offline halaman otomatis memakai font cadangan sistem.

**Animasi.** Cuma ada dua jenis, keduanya sederhana dan tanpa library:

1. **Muncul saat digulir.** Setiap komponen yang punya atribut `data-fade` naik sedikit sambil
   memudar masuk. Elemen dalam satu kelompok (misalnya 4 baris proyek) diberi nomor urut di
   variabel `--i` oleh `script.js`, lalu CSS memakai angka itu sebagai jeda bertingkat — jadi
   munculnya berurutan, bukan serentak.
2. **Reaksi hover.** Baris proyek, baris keahlian, tombol, dan tautan bergeser atau berubah warna
   sedikit saat kursor di atasnya. Ini hanya `transition` CSS biasa.

Keduanya otomatis mati bila pengunjung mengaktifkan "prefers-reduced-motion" di sistemnya.
Kalau kamu mau halaman benar-benar statis, hapus semua atribut `data-fade` —
tidak ada bagian lain yang perlu diubah.

**Navbar yang mengikuti scroll.** Selama header asli masih terlihat, navigasi cukup dari header.
Begitu header tergulir keluar layar, muncul pil navigasi kecil di tengah atas
(`<nav class="topbar" id="topbar">`) berisi Tentang / Keahlian / Proyek / Kontak. Pil ini hilang
lagi saat kembali ke atas.

Di dalam pil itu ada satu penanda gelap (`<span class="topbar__pill">`) yang **meluncur mulus**
dari satu menu ke menu lain mengikuti bagian yang sedang dilihat — bukan sekadar ganti warna.
Posisi dan lebarnya dihitung `script.js` (`translateX` + `width`), jadi lebarnya ikut menyesuaikan
panjang tiap label. Saat baru muncul, penanda langsung ditaruh di tempatnya (tanpa meluncur dari
ujung kiri).

Kalau mau diubah, tiga tempat yang perlu disentuh:

- **Tampilan** — blok `3b. NAVBAR YANG MENGIKUTI SCROLL` di `style.css`. Kecepatan luncur ada di
  `transition` milik `.topbar__pill` (sekarang 0.55 detik).
- **Kapan muncul** — fungsi `initTopbar()` di `script.js`. Saat ini pil muncul begitu bagian
  bawah header melewati tepi atas layar (`header.getBoundingClientRect().bottom < 0`); ubah angka
  itu kalau ingin muncul lebih awal/akhir. Karena memakai `position: fixed`, pil tetap bekerja
  meski panel memakai `overflow: hidden` — sesuatu yang biasanya mematikan `position: sticky`.
- **Bagian mana yang dianggap aktif** — di fungsi yang sama, cari `garis` (sekarang 35% tinggi
  layar): bagian terakhir yang tepinya sudah melewati garis itu yang dianggap aktif.

---

## Fitur yang ada di dalamnya

1. Animasi muncul halus + jeda bertingkat saat scroll (`IntersectionObserver`)
2. Menu layar penuh untuk layar kecil
3. Navbar pil yang mengikuti scroll + penanda bagian yang meluncur mulus
4. Daftar proyek yang bisa dibuka-tutup per baris (`<details>`, tanpa JavaScript)
5. Validasi form kontak tanpa library
6. Tahun di footer yang menyesuaikan sendiri

## Cara publikasi gratis (GitHub Pages)

```bash
git add .
git commit -m "Bangun ulang portofolio dengan HTML, CSS, JS"
git push
```

Lalu di GitHub: **Settings → Pages → Source: Deploy from a branch → main / (root) → Save**.
Situs akan tersedia di `https://nama-pengguna.github.io/nama-repo/`.

**Domain sendiri (opsional, sesuai saran artikel).** Beli domain pendek yang mudah diingat
(misal `rizkypratama.dev`), lalu di halaman **Settings → Pages → Custom domain** isi domain itu
dan arahkan DNS-nya ke GitHub Pages. Satu domain ini bisa dipakai juga untuk email profesional.

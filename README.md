# Portofolio — I Made Mahendra Adikresna

Website portofolio pribadi bergaya **editorial minimal**, dibuat **hanya dengan HTML, CSS, dan
JavaScript**. Tanpa framework, tanpa Tailwind, dan tanpa proses build.

**Live:** https://mahendraadikresna.github.io/MyPortfolio/

---

## Isi halaman

| Bagian | Isi |
| --- | --- |
| Hero | Nama besar sebagai pembuka |
| Perkenalan (`#tentang`) | Siapa saya dan apa yang sedang dipelajari |
| Keahlian (`#keahlian`) | Keahlian teknis & soft skill |
| Proyek (`#proyek`) | 3 proyek — rinciannya dibuka-tutup per baris |
| Kontak (`#kontak`) | Email, GitHub, dan form pesan |

Tampilan dibagi menjadi **tiga panel bertumpuk bersudut tumpul**: krem (header & perkenalan),
abu hangat (keahlian & proyek), lalu gelap (kontak & footer).

## Struktur file

```
Portfolio/
├── index.html    → seluruh isi & struktur halaman
├── style.css     → semua tampilan (bagian bernomor, warna di :root)
├── script.js     → 5 fungsi kecil, semuanya berkomentar bahasa Indonesia
├── favicon.svg   → ikon tab browser
├── cv.pdf        → CV (belum ditautkan ke halaman)
└── README.md     → penjelasan ini
```

## Cara menjalankan

Klik dua kali `index.html`, atau pakai server lokal:

```bash
python -m http.server 5500   # lalu buka http://localhost:5500
```

## Yang perlu diubah

Semua tempat yang perlu diganti sudah ditandai komentar `GANTI:` di `index.html`
(cari dengan Ctrl+F). Selain itu:

- **Warna & font** → bagian `:root` di paling atas `style.css`. Ganti satu nilai, seluruh
  halaman ikut berubah.
- **Proyek** → satu proyek = satu blok `<details class="project">`. Salin satu blok untuk
  menambah proyek, atau hapus untuk mengurangi.
- **CV** → timpa `cv.pdf` dengan CV aslimu, lalu tambahkan tombol unduhnya di `#kontak` bila perlu.

## Catatan teknis

- **Animasi**: elemen ber-atribut `data-fade` muncul berurutan saat masuk layar
  (`IntersectionObserver` + jeda bertingkat), ditambah reaksi hover. Semuanya mati otomatis
  bila pengunjung mengaktifkan *prefers-reduced-motion*.
- **Navbar**: setelah header asli tergulir ke atas, muncul pil navigasi kecil di tengah atas
  dengan penanda yang meluncur mulus mengikuti bagian yang sedang dilihat.
- **Form kontak** belum punya server — pesannya dikirim lewat aplikasi email pengguna
  (`mailto:`). Cara menggantinya ke Formspree ada di komentar `script.js`.
- **Responsif** dari 360 px sampai layar lebar; di layar kecil navigasi memakai menu burger.

## Publikasi

Situs ini tayang lewat **GitHub Pages** (Settings → Pages → Deploy from a branch → `main` / root).
Setiap kali di-push ke `main`, halaman otomatis diperbarui dalam 1–2 menit:

```bash
git add -A
git commit -m "perubahan"
git push
```

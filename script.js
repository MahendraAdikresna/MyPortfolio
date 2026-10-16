/* =====================================================================
   PORTFOLIO — JavaScript vanilla (tanpa library apa pun)
   Hanya 5 bagian kecil:
     1. Animasi muncul saat scroll    4. Tahun otomatis di footer
     2. Menu mobile                   5. Navbar mengikuti scroll
     3. Validasi form kontak
   ===================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     BANTUAN SINGKAT
     querySelector / querySelectorAll versi pendek
     ------------------------------------------------------------------ */
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const body = document.body;

  /* ==================================================================
     1. ANIMASI MUNCUL SAAT SCROLL
     Elemen yang diberi atribut data-fade akan naik perlahan saat masuk
     layar. Setelah muncul, elemen berhenti diamati.
     ================================================================== */
  function initReveal() {
    const targets = $$("[data-fade]");

    // Beri nomor urut pada tiap elemen, dihitung dari saudara-saudaranya.
    // Nomor ini disimpan di --i dan dipakai CSS untuk memberi jeda bertingkat,
    // supaya komponen muncul satu per satu, bukan serentak.
    targets.forEach((el) => {
      let urutan = 0;
      let sebelumnya = el.previousElementSibling;
      while (sebelumnya) {
        if (sebelumnya.hasAttribute("data-fade")) urutan += 1;
        sebelumnya = sebelumnya.previousElementSibling;
      }
      el.style.setProperty("--i", String(Math.min(urutan, 6)));
    });

    // Kalau browser lama tidak punya IntersectionObserver, tampilkan saja semua
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-inview"));
      return;
    }

    // Mulai sedikit lebih awal (120px sebelum elemen masuk layar) supaya
    // animasinya sudah berjalan mulus saat elemen terlihat, tidak "nembul".
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-inview");
          observer.unobserve(entry.target); // sudah muncul, berhenti diamati
        });
      },
      { rootMargin: "0px 0px 120px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
  }

  /* ==================================================================
     2. MENU MOBILE
     Tombol burger membuka panel menu di sepertiga atas layar.
     ================================================================== */
  function initMenu() {
    const burger = $("#burger");
    const menu = $("#menu");
    const closeBtn = $("#menuClose");
    if (!burger || !menu) return;

    let hideTimer = 0;

    function open() {
      window.clearTimeout(hideTimer);
      menu.hidden = false;
      // Biarkan browser menggambar posisi awal dulu (2 frame), baru mainkan
      // animasi. Tanpa jeda ini menu muncul mendadak tanpa meluncur.
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => menu.classList.add("is-open"));
      });
      burger.setAttribute("aria-expanded", "true");
      body.classList.add("is-locked"); // kunci scroll halaman
      closeBtn?.focus({ preventScroll: true });
    }

    function close() {
      menu.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      body.classList.remove("is-locked");
      burger.focus({ preventScroll: true });
      // tunggu animasi selesai sebelum benar-benar disembunyikan
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => {
        menu.hidden = true;
      }, 600);
    }

    burger.addEventListener("click", open);
    closeBtn?.addEventListener("click", close);

    // Menu tertutup otomatis setelah memilih salah satu tautan
    $$("a", menu).forEach((link) => link.addEventListener("click", close));

    // Klik/tap di luar panel menu (bagian halaman yang masih terlihat) ikut menutup
    document.addEventListener("click", (event) => {
      if (!menu.classList.contains("is-open")) return;
      if (menu.contains(event.target) || burger.contains(event.target)) return;
      close();
    });

    // Tombol Esc juga menutup menu
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("is-open")) close();
    });
  }

  /* ==================================================================
     3. VALIDASI FORM KONTAK
     Karena web ini tanpa server, pesan dikirim lewat aplikasi email
     pengguna (mailto). Catatan mengganti ke Formspree ada di README.md.
     ================================================================== */
  function initForm() {
    const form = $("#contactForm");
    if (!form) return;

    const status = $("#formStatus");

    // Alamat tujuan diambil dari tautan mailto pertama di halaman, supaya
    // alamat emailnya cukup ditulis sekali saja di index.html.
    const emailTarget = ($('a[href^="mailto:"]')?.getAttribute("href") || "").replace("mailto:", "");

    // Aturan sederhana: satu fungsi per kolom, hasilnya pesan error
    // (string kosong berarti isian sudah benar)
    const rules = {
      nama: (value) => (value.trim().length < 2 ? "Nama minimal 2 karakter." : ""),
      email: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()) ? "" : "Format email belum benar.",
      pesan: (value) => (value.trim().length < 10 ? "Tuliskan pesan minimal 10 karakter." : ""),
    };

    function validateField(input) {
      const rule = rules[input.name];
      if (!rule) return true;

      const message = rule(input.value);
      const field = input.closest(".field");

      field?.classList.toggle("has-error", Boolean(message));
      const errorBox = $(`[data-error-for="${input.name}"]`);
      if (errorBox) errorBox.textContent = message;

      return !message;
    }

    // Periksa saat pengguna selesai mengisi satu kolom
    $$("input, textarea", form).forEach((input) => {
      input.addEventListener("blur", () => validateField(input));
      input.addEventListener("input", () => {
        if (input.closest(".field")?.classList.contains("has-error")) validateField(input);
      });
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!emailTarget) {
        status.textContent = "Alamat email tujuan belum ada di index.html.";
        return;
      }

      const inputs = $$("input, textarea", form);
      const semuaBenar = inputs.map(validateField).every(Boolean);

      if (!semuaBenar) {
        status.textContent = "Mohon periksa kembali kolom yang ditandai.";
        $(".field.has-error input, .field.has-error textarea")?.focus();
        return;
      }

      const data = new FormData(form);
      const subject = encodeURIComponent(`Pesan portofolio dari ${data.get("nama")}`);
      const isi = encodeURIComponent(`${data.get("pesan")}\n\n— ${data.get("nama")} (${data.get("email")})`);

      status.textContent = "Terima kasih! Aplikasi email kamu akan terbuka.";
      window.location.href = `mailto:${emailTarget}?subject=${subject}&body=${isi}`;

      form.reset();
      $$(".field", form).forEach((field) => field.classList.remove("has-error"));
    });
  }

  /* ==================================================================
     4. TAHUN OTOMATIS DI FOOTER
     ================================================================== */
  function initYear() {
    const year = $("#year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  /* ==================================================================
     5. NAVBAR MENGIKUTI SCROLL
     Pil navigasi di atas muncul setelah header asli tergulir ke atas,
     dan pil gelap di dalamnya meluncur mulus ke bagian yang dilihat.
     ================================================================== */
  function initTopbar() {
    const topbar = $("#topbar");
    const pill = $("#topbarPill");
    const header = $(".header");
    if (!topbar) return;

    const links = $$("a", topbar);
    const sections = links.map((a) => $(a.getAttribute("href"))).filter(Boolean);

    let antre = 0; // id requestAnimationFrame, supaya tidak dihitung berkali-kali
    let pilTampil = false; // apakah pil sudah pernah ditaruh di posisinya

    /* Geser pil ke tautan yang aktif. Saat pertama kali muncul, pil
       langsung ditaruh di tempatnya (tanpa meluncur dari ujung kiri). */
    function geserPil(link) {
      if (!pill) return;

      if (!link) {
        pill.classList.remove("is-visible");
        pilTampil = false;
        return;
      }

      const tanpaAnimasi = !pilTampil;
      if (tanpaAnimasi) pill.style.transition = "none";

      pill.style.width = link.offsetWidth + "px";
      pill.style.transform = "translateX(" + link.offsetLeft + "px)";
      pill.classList.add("is-visible");

      // Kembalikan transisinya setelah posisi baru tergambar, supaya
      // pergeseran berikutnya tetap halus.
      if (tanpaAnimasi) {
        void pill.offsetWidth; // paksa browser menggambar posisi ini dulu
        pill.style.transition = "";
      }

      pilTampil = true;
    }

    function update() {
      antre = 0;

      // Muncul begitu bagian bawah header melewati tepi atas layar.
      const batas = header ? header.getBoundingClientRect().bottom : 0;
      topbar.classList.toggle("is-shown", batas < 0);

      // Tandai bagian yang sedang dilihat: bagian terakhir yang tepinya
      // sudah melewati garis 35% tinggi layar.
      const garis = window.innerHeight * 0.35;
      let aktif = null;
      sections.forEach((bagian) => {
        if (bagian.getBoundingClientRect().top <= garis) aktif = bagian;
      });

      let linkAktif = null;
      links.forEach((a) => {
        const iniAktif = aktif !== null && a.getAttribute("href") === "#" + aktif.id;
        a.classList.toggle("is-active", iniAktif);
        if (iniAktif) linkAktif = a;
      });

      geserPil(linkAktif);
    }

    function onScroll() {
      if (antre) return; // sudah ada hitungan yang menunggu
      antre = window.requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Lebar tiap tautan bisa berubah setelah font web selesai dimuat —
    // hitung ulang supaya pil tetap pas.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(onScroll).catch(() => {});
    }

    update();
  }

  /* ==================================================================
     JALANKAN SEMUA
     ================================================================== */
  initReveal();
  initMenu();
  initForm();
  initYear();
  initTopbar();

  // Tanda bahwa JS berhasil berjalan (dipakai jaring pengaman di index.html)
  document.documentElement.dataset.ready = "1";
})();

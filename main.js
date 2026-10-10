
"use strict";

// =====================================
// 1. PENGATURAN WEBSITE
// =====================================

// GANTI tanggal ini dengan tanggal jadian kalian.
// Format: TAHUN-BULAN-TANGGALT00:00:00
const anniversaryDate = new Date("2024-06-25T18:26:00");

// Masukkan nama file musik milikmu (default: anugerah terindah.mp3).
// Letakkan file musik di folder yang sama dengan index.html.
const musicFile = "anugerah terindah.mp3";

// =====================================
// 2. MENU NAVIGASI MOBILE
// =====================================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Tutup menu" : "Buka menu"
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// =====================================
// 3. PENGHITUNG LAMA HUBUNGAN
// =====================================

function updateLoveCounter() {
  const now = new Date();

  // Jika tanggal belum valid atau berada di masa depan,
  // tampilkan nol daripada angka negatif.
  if (
    Number.isNaN(anniversaryDate.getTime()) ||
    anniversaryDate > now
  ) {
    ["days", "hours", "minutes", "seconds"].forEach((id) => {
      document.getElementById(id).textContent = "0";
    });
    return;
  }

  const totalSeconds = Math.floor(
    (now.getTime() - anniversaryDate.getTime()) / 1000
  );

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.getElementById("days").textContent =
    days.toLocaleString("id-ID");

  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

updateLoveCounter();
setInterval(updateLoveCounter, 1000);

// =====================================
// 4. MODAL SURAT CINTA
// =====================================

const letterBtn = document.getElementById("letterBtn");
const letterModal = document.getElementById("letterModal");
const closeModal = document.getElementById("closeModal");

function openLetter() {
  letterModal.classList.add("show");
  letterModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  closeModal.focus();
}

function closeLetter() {
  letterModal.classList.remove("show");
  letterModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  letterBtn.focus();
}

letterBtn.addEventListener("click", openLetter);
closeModal.addEventListener("click", closeLetter);

letterModal.addEventListener("click", (event) => {
  if (event.target === letterModal) {
    closeLetter();
  }
});

// =====================================
// 4B. MODAL GALERI PERTEMUAN (BANYAK FOTO)
// =====================================

const galleryModal = document.getElementById("galleryModal");
const closeGalleryModal = document.getElementById("closeGalleryModal");
const galleryCategory = document.getElementById("galleryCategory");
const galleryTitle = document.getElementById("galleryTitle");
const galleryDesc = document.getElementById("galleryDesc");
const galleryPhotosGrid = document.getElementById("galleryPhotosGrid");

// Lightbox (zoom foto)
const lightboxModal = document.getElementById("lightboxModal");
const closeLightboxModal = document.getElementById("closeLightboxModal");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");

function openLightbox(src, alt) {
  if (!lightboxModal) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt || "Foto Kenangan Sofi & Zahro";
  if (lightboxCaption) {
    lightboxCaption.textContent = alt ? `${alt} ♡` : "Momen manis bersama Zahro sayang ♡";
  }
  lightboxModal.classList.add("show");
  lightboxModal.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  if (!lightboxModal) return;
  lightboxModal.classList.remove("show");
  lightboxModal.setAttribute("aria-hidden", "true");
}

if (closeLightboxModal) {
  closeLightboxModal.addEventListener("click", closeLightbox);
}

if (lightboxModal) {
  lightboxModal.addEventListener("click", (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });
}

// =====================================
// EFEK KLIK LOVE BURST (HATI & KILAU)
// =====================================
const burstSymbols = ["💖", "💕", "✨", "🌸", "🎀", "💗", "🌷", "♡"];

function createHeartBurst(x, y) {
  const posX = (typeof x === "number" && x !== 0) ? x : window.innerWidth / 2;
  const posY = (typeof y === "number" && y !== 0) ? y : window.innerHeight / 2;
  const count = 7;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "click-heart-particle";
    el.textContent = burstSymbols[Math.floor(Math.random() * burstSymbols.length)];
    el.style.left = `${posX}px`;
    el.style.top = `${posY}px`;
    el.style.fontSize = `${16 + Math.random() * 16}px`;

    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
    const distance = 40 + Math.random() * 55;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance - 20;
    const rot = `${(Math.random() - 0.5) * 60}deg`;

    el.style.setProperty("--tx", `${tx}px`);
    el.style.setProperty("--ty", `${ty}px`);
    el.style.setProperty("--rot", rot);

    document.body.appendChild(el);

    el.addEventListener(
      "animationend",
      () => {
        el.remove();
      },
      { once: true }
    );
  }
}

// Efek cinta muncul setiap mengklik foto atau kartu kenangan
document.addEventListener("click", (e) => {
  if (
    e.target.closest(".moment-card") ||
    e.target.closest(".gallery-photo-card") ||
    e.target.closest(".photo-frame") ||
    e.target.closest(".lightbox-frame") ||
    e.target.closest(".btn")
  ) {
    createHeartBurst(e.clientX, e.clientY);
  }
});

function openGallery(card) {
  if (!galleryModal) return;
  const category = card.querySelector(".moment-overlay span:first-child")?.textContent || "PERTEMUAN KITA";
  const title = card.querySelector(".moment-overlay h3")?.textContent || "Galeri Foto";
  const desc = card.getAttribute("data-desc") || "Koleksi foto indah pada momen ini ♡";

  galleryCategory.textContent = category;
  galleryTitle.innerHTML = title + " ♡";
  galleryDesc.textContent = desc;

  galleryPhotosGrid.innerHTML = "";

  const galleryData = card.querySelector(".moment-gallery-data");
  let images = [];

  if (galleryData) {
    images = Array.from(galleryData.querySelectorAll("img"));
  }

  // Jika belum ada foto di data, masukkan foto sampul sebagai foto pertama
  if (images.length === 0) {
    const mainImg = card.querySelector("img");
    if (mainImg) images.push(mainImg);
  }

  images.forEach((img) => {
    const cardEl = document.createElement("div");
    cardEl.className = "gallery-photo-card";
    cardEl.title = "Klik untuk perbesar foto ♡";

    const newImg = document.createElement("img");
    newImg.src = img.src;
    newImg.alt = img.alt || title;
    newImg.onerror = function() {
      this.onerror = null;
      this.src = "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=700&q=85";
    };

    cardEl.appendChild(newImg);
    cardEl.addEventListener("click", (e) => {
      e.stopPropagation();
      createHeartBurst(e.clientX, e.clientY);
      openLightbox(newImg.src, newImg.alt);
    });

    galleryPhotosGrid.appendChild(cardEl);
  });

  galleryModal.classList.add("show");
  galleryModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  closeGalleryModal.focus();
}

function closeGallery() {
  if (!galleryModal) return;
  galleryModal.classList.remove("show");
  galleryModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".moment-card").forEach((card) => {
  card.addEventListener("click", () => {
    openGallery(card);
  });
});

if (closeGalleryModal) {
  closeGalleryModal.addEventListener("click", closeGallery);
}

if (galleryModal) {
  galleryModal.addEventListener("click", (event) => {
    if (event.target === galleryModal) {
      closeGallery();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (lightboxModal && lightboxModal.classList.contains("show")) {
      closeLightbox();
    } else if (galleryModal && galleryModal.classList.contains("show")) {
      closeGallery();
    } else if (letterModal && letterModal.classList.contains("show")) {
      closeLetter();
    }
  }
});

// =====================================
// 5. ANIMASI HATI (OPTIMASI RINGAN & SMOOTH)
// =====================================

const heartsBackground = document.getElementById("heartsBackground");
const heartSymbols = ["♡", "♥", "💖", "💕", "💗", "🌸", "✨", "💓"];
const MAX_HEARTS = 14;

function createHeart() {
  // Jangan menambahkan animasi jika tab tidak aktif atau pengguna mengurangi gerakan
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    document.hidden ||
    heartsBackground.children.length >= MAX_HEARTS
  ) {
    return;
  }

  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

  const startLeft = Math.random() * 94 + 3;
  const size = 14 + Math.random() * 20;
  const opacity = 0.35 + Math.random() * 0.5;

  heart.style.left = `${startLeft}%`;
  heart.style.fontSize = `${size}px`;
  heart.style.setProperty("--heart-opacity", opacity);

  const duration = 6 + Math.random() * 5;
  heart.style.animationDuration = `${duration}s`;

  heartsBackground.appendChild(heart);

  // Hapus elemen secara otomatis begitu animasi selesai agar memori tetap bersih
  heart.addEventListener(
    "animationend",
    () => {
      heart.remove();
    },
    { once: true }
  );
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setInterval(createHeart, 650);
  for (let i = 0; i < 5; i++) {
    setTimeout(createHeart, i * 250);
  }
}

// =====================================
// 6. MUSIK ROMANTIS (MULTI-CONTROLLER)
// =====================================

const backgroundMusic = document.getElementById("backgroundMusic");
const musicBtn = document.getElementById("musicBtn");
const heroMusicPlayBtn = document.getElementById("heroMusicPlayBtn");
const musicDiscIcon = document.getElementById("musicDiscIcon");
const musicFloatBtn = document.getElementById("musicFloatBtn");
const floatDisc = document.getElementById("floatDisc");
const floatStatus = document.getElementById("floatStatus");
const floatStateIcon = document.getElementById("floatStateIcon");

if (musicFile.trim() && backgroundMusic) {
  backgroundMusic.src = encodeURI(musicFile);
}

let musicIsPlaying = false;

function updateMusicUI(isPlaying) {
  musicIsPlaying = isPlaying;

  // 1. Tombol Navbar / Hero Utama
  if (musicBtn) {
    musicBtn.textContent = isPlaying ? "Ⅱ Jeda musik" : "♫ Putar musik";
  }

  // 2. Kartu Mini Pemutar di Hero
  if (heroMusicPlayBtn) {
    heroMusicPlayBtn.innerHTML = isPlaying
      ? '<span id="heroMusicBtnIcon">⏸</span> Jeda Lagu'
      : '<span id="heroMusicBtnIcon">▶</span> Putar Lagu';
  }
  if (musicDiscIcon) {
    musicDiscIcon.classList.toggle("spinning", isPlaying);
  }

  // 3. Floating Player Widget (Pojok Bawah)
  if (floatStateIcon) {
    floatStateIcon.textContent = isPlaying ? "⏸" : "▶";
  }
  if (floatStatus) {
    floatStatus.textContent = isPlaying ? "Sedang Memutar" : "Lagu Kita";
  }
  if (floatDisc) {
    floatDisc.classList.toggle("spinning", isPlaying);
  }
}

async function toggleMusic() {
  if (!backgroundMusic) return;

  if (musicIsPlaying) {
    backgroundMusic.pause();
    return;
  }

  try {
    if (!backgroundMusic.src && musicFile.trim()) {
      backgroundMusic.src = encodeURI(musicFile);
    }
    await backgroundMusic.play();
  } catch (error) {
    // Coba fallback ke file 'lagu.mp3' jika ada kendala nama file
    try {
      backgroundMusic.src = "anugerah terindah.mp3";
      await backgroundMusic.play();
    } catch (err2) {
      alert("File musik belum bisa diputar. Pastikan file 'anugerah terindah.mp3' berada di folder yang sama ya ♡");
    }
  }
}

if (musicBtn) musicBtn.addEventListener("click", toggleMusic);
if (heroMusicPlayBtn) heroMusicPlayBtn.addEventListener("click", toggleMusic);
if (musicFloatBtn) musicFloatBtn.addEventListener("click", toggleMusic);

if (backgroundMusic) {
  backgroundMusic.addEventListener("play", () => updateMusicUI(true));
  backgroundMusic.addEventListener("pause", () => updateMusicUI(false));
  backgroundMusic.addEventListener("ended", () => updateMusicUI(false));
}

// =====================================
// 7. TOMBOL DARURAT PELUKAN VIRTUAL (HUG BUTTON)
// =====================================

const hugBtn = document.getElementById("hugBtn");
const hugMessageBox = document.getElementById("hugMessageBox");
const hugMessageText = document.getElementById("hugMessageText");
const hugCount = document.getElementById("hugCount");

const hugQuotes = [
  "Peluk erat dari jauh buat cewek tersayangku! Sabar ya sayang, rindu ini bakal segera terbayar lunas pas kita ketemu lagi nanti ♡",
  "Kalau kamu lagi capek, pusing, atau sedih, ingat ya Zahro, ada Sofi di sini yang selalu bangga dan sayang banget sama kamu ♡",
  "Pelukan hangat spesial LDR buat Zahro! Jangan pernah merasa sendirian ya sayang, hati Sofi selalu nemenin kamu 24 jam penuh ♡",
  "Semangat yaa sayangnya Sofi! Jarak ratusan kilometer ini nggak ada apa-apanya dibanding besarnya rasa sayangku ke kamu ♡",
  "Tutup matamu 5 detik dan rasakan pelukan hangat dari Sofi. I love you so much, Zahro tercantik di semesta ♡",
  "Setiap detak jantungku selalu ada nama kamu, Zahro. Terima kasih sudah terus berjuang bareng Sofi sampai hari ini ♡",
  "Kapan pun kamu butuh tempat bersandar, pundak dan pelukan Sofi selalu terbuka lebar cuma buat kamu seorang ♡"
];

let lastQuoteIndex = -1;

// Muat jumlah pelukan yang pernah diambil dari penyimpanan browser (opsional)
try {
  const savedHugs = localStorage.getItem("sofi_zahro_hug_count");
  if (savedHugs && hugCount) {
    hugCount.textContent = savedHugs;
  }
} catch (e) {
  // Abaikan jika localStorage tidak aktif
}

if (hugBtn) {
  hugBtn.addEventListener("click", (e) => {
    // 1. Pilih pesan romantis berikutnya secara acak tanpa mengulang pesan yang sama
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * hugQuotes.length);
    } while (nextIndex === lastQuoteIndex && hugQuotes.length > 1);
    lastQuoteIndex = nextIndex;

    if (hugMessageText) {
      hugMessageText.textContent = hugQuotes[nextIndex];
    }

    if (hugMessageBox) {
      hugMessageBox.style.display = "block";
      // Trigger re-animation
      hugMessageBox.style.animation = "none";
      void hugMessageBox.offsetHeight;
      hugMessageBox.style.animation = "popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
    }

    // 2. Tambah hitungan pelukan
    if (hugCount) {
      const currentHugs = parseInt(hugCount.textContent, 10) || 0;
      const newHugs = currentHugs + 1;
      hugCount.textContent = newHugs;
      try {
        localStorage.setItem("sofi_zahro_hug_count", newHugs);
      } catch (err) {}
    }

    // 3. Efek hujan kilau dan hati spektakuler
    createHeartBurst(e.clientX, e.clientY);
    setTimeout(() => {
      createHeartBurst(e.clientX - 60, e.clientY - 30);
      createHeartBurst(e.clientX + 60, e.clientY - 30);
    }, 120);

    // Getaran lembut pada smartphone jika didukung
    if ("vibrate" in navigator) {
      navigator.vibrate([80, 40, 80]);
    }
  });
}

// =====================================
// 8. TAHUN OTOMATIS DI FOOTER
// =====================================

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// =====================================
// 9. EFEK BUKA CERITA PERTENGKARAN
// =====================================

document.querySelectorAll(".fight-card").forEach((card) => {
  card.addEventListener("toggle", () => {
    if (!card.open) return;

    // Menutup cerita lain agar halaman tetap rapi.
    document.querySelectorAll(".fight-card").forEach((otherCard) => {
      if (otherCard !== card) {
        otherCard.open = false;
      }
    });
  });
});


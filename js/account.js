// HALAMAN AKUN
// ===============================
const imageUrl = "https://image.tmdb.org/t/p/w500"; // URL dasar gambar dari TMDB
const loginStatus = localStorage.getItem("login"); // Mengambil status login dari localStorage

if (loginStatus !== "true") {
  // Mengecek apakah user sudah login
  window.location.href = "login.html"; // Mengarahkan user ke halaman login
}

// PROFIL PENGGUNA
// ===============================
const userData = JSON.parse(localStorage.getItem("userData")); // Mengambil data pengguna dari localStorage

if (userData) {
  // Mengecek apakah data pengguna tersedia
  document.getElementById("account-name").textContent =
    userData.nama || "Pengguna MovieTime"; // Menampilkan nama pengguna
  document.getElementById("account-email").textContent = userData.email || "-"; // Menampilkan email pengguna
}

// LOGOUT
// ===============================
document
  .getElementById("account-logout-button")
  .addEventListener("click", function () {
    // Menjalankan fungsi saat tombol logout diklik
    localStorage.removeItem("login"); // Menghapus status login
    alert("Anda berhasil logout."); // Menampilkan pesan logout
    window.location.href = "../index.html"; // Mengarahkan user ke halaman utama
  });

// FAVORITE
// ===============================
const favoriteList = document.getElementById("favorite-list"); // Mengambil elemen daftar favorite
const favoriteA = JSON.parse(localStorage.getItem("favorite")) || []; // Mengambil data favorite utama
const favoriteB = JSON.parse(localStorage.getItem("favorites")) || []; // Mengambil data favorite lama
const semuaFavorite = [...favoriteA, ...favoriteB]; // Menggabungkan kedua data favorite

if (semuaFavorite.length === 0) {
  // Mengecek apakah favorite masih kosong
  const pesanKosong = document.createElement("p"); // Membuat elemen paragraf
  pesanKosong.textContent = "Belum ada film/TV show yang difavoritkan."; // Memberikan pesan saat favorite kosong
  favoriteList.appendChild(pesanKosong); // Menampilkan pesan ke halaman
} else {
  while (favoriteList.firstChild) {
    // Mengecek apakah masih ada isi pada daftar
    favoriteList.removeChild(favoriteList.firstChild); // Menghapus isi daftar sebelumnya
  }

  semuaFavorite.forEach(function (item) {
    // Mengulang seluruh data favorite
    const judul = item.title || item.name || "Tanpa Judul"; // Mengambil judul film atau TV show
    const poster = item.poster_path ? imageUrl + item.poster_path : ""; // Membuat URL poster
    const kartu = document.createElement("div"); // Membuat elemen kartu
    kartu.className = "movie-card"; // Memberikan class untuk kartu
    const posterDiv = document.createElement("div"); // Membuat bagian poster
    posterDiv.className = "poster"; // Memberikan class pada bagian poster

    if (poster) {
      // Mengecek apakah poster tersedia
      const gambar = document.createElement("img"); // Membuat elemen gambar
      gambar.src = poster; // Menentukan sumber gambar poster
      gambar.alt = judul; // Memberikan teks alternatif gambar
      posterDiv.appendChild(gambar); // Memasukkan gambar ke bagian poster
    }

    const judulEl = document.createElement("h3"); // Membuat elemen judul
    judulEl.textContent = judul; // Menampilkan judul film atau TV show
    kartu.appendChild(posterDiv); // Memasukkan poster ke dalam kartu
    kartu.appendChild(judulEl); // Memasukkan judul ke dalam kartu

    kartu.addEventListener("click", function () {
      // Menjalankan fungsi saat kartu diklik
      localStorage.setItem("detailMovie", JSON.stringify(item)); // Menyimpan data film untuk halaman detail
      localStorage.setItem("detailType", item.detailType || "movie"); // Menyimpan tipe konten
      localStorage.setItem(
        "detailBack",
        item.detailType === "tv" ? "tv-show.html" : "movies.html",
      ); // Menentukan halaman kembali
      window.location.href = "detail.html"; // Membuka halaman detail
    });

    favoriteList.appendChild(kartu); // Menampilkan kartu ke halaman
  });
}

// ===============================
// LOGOUT
// ===============================

const logoutButton = document.getElementById("account-logout-button");

// Mengecek apakah tombol logout tersedia
if (logoutButton) {
  logoutButton.addEventListener("click", function () {
    // Mengubah status login menjadi false
    localStorage.setItem("login", "false");

    // Menghapus data user
    localStorage.removeItem("userData");

    // Memberikan informasi bahwa logout berhasil
    alert("Anda berhasil logout.");

    // Kembali ke halaman Home
    window.location.href = "../index.html";
  });
}

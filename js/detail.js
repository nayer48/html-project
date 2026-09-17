const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDZkODBhMzczM2Q2NGVhYzU2ZTAxZTc1NTM0NmJjOCIsIm5iZiI6MTc4NzQ3ODYzOC45MzUwMDAyLCJzdWIiOiI2YThhYzI2ZTA4N2JiYWY3MmYwOTQzYTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-4ls6kA84dgHrFj6grIq35c-vWP8BKD5qszCjdGmYSU"; // Token TMDB untuk mengakses API
const pengaturan = {
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  },
}; // Pengaturan header request API

// DATA FILM
// ===============================
const movie = JSON.parse(localStorage.getItem("detailMovie")); // Mengambil data film dari localStorage
const tipe = localStorage.getItem("detailType"); // Mengambil tipe konten movie atau tv

// ELEMENT HALAMAN
// ===============================
const detailContent = document.querySelector("#detail-content"); // Mengambil area detail film
const castList = document.querySelector("#cast-list"); // Mengambil area daftar cast
const detailBox = document.querySelector(".detail-box"); // Mengambil kotak utama detail
const popup = document.querySelector("#trailer-popup"); // Mengambil popup trailer
const trailerVideo = document.querySelector("#trailer-video"); // Mengambil video trailer
const closeTrailer = document.querySelector("#close-trailer"); // Mengambil tombol tutup trailer

// TOMBOL KEMBALI
// ===============================
const backLink = document.querySelector("#back-link"); // Mengambil tombol kembali
if (backLink) {
  // Mengecek apakah tombol kembali tersedia
  backLink.href = localStorage.getItem("detailBack") || "movies.html"; // Menentukan halaman tujuan tombol kembali
}

// CEK DATA FILM
// ===============================
if (!movie) {
  // Mengecek apakah data film tersedia
  const pesan = document.createElement("p"); // Membuat elemen pesan
  pesan.textContent = "Data film tidak ditemukan."; // Memberikan teks pesan
  detailContent.appendChild(pesan); // Menampilkan pesan ke halaman
} else {
  // Jika data film tersedia
  tampilkanDetail(); // Menampilkan detail film
  ambilCast(); // Mengambil data cast dari TMDB
}

// MENAMPILKAN DETAIL FILM
// ===============================
function tampilkanDetail() {
  const judulFilm = movie.title || movie.name || "Untitled"; // Mengambil judul film atau TV show
  const tanggal = movie.release_date || movie.first_air_date || "-"; // Mengambil tanggal rilis

  // POSTER FILM
  // ===============================
  const poster = document.createElement("div"); // Membuat wadah poster
  poster.className = "detail-poster"; // Memberikan class pada poster
  const gambar = document.createElement("img"); // Membuat elemen gambar

  if (movie.poster_path) {
    // Mengecek apakah poster tersedia
    gambar.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path; // Menentukan URL poster TMDB
  } else {
    gambar.src = "../img/no-image.jpg"; // Menggunakan gambar cadangan
  }

  gambar.alt = judulFilm; // Memberikan teks alternatif gambar
  poster.appendChild(gambar); // Memasukkan gambar ke poster

  // INFORMASI FILM
  // ===============================
  const info = document.createElement("div"); // Membuat wadah informasi
  info.className = "detail-info"; // Memberikan class informasi
  const judul = document.createElement("h2"); // Membuat elemen judul
  judul.textContent = judulFilm; // Menampilkan judul film

  const rating = document.createElement("p"); // Membuat elemen rating
  const nilaiRating = Number(movie.vote_average || 0); // Mengubah rating menjadi angka
  rating.textContent = "⭐ Rating: " + nilaiRating.toFixed(1); // Menampilkan rating

  const tanggalRilis = document.createElement("p"); // Membuat elemen tanggal rilis
  tanggalRilis.textContent = "Release: " + tanggal; // Menampilkan tanggal rilis

  const jenis = document.createElement("p"); // Membuat elemen tipe konten
  jenis.textContent = tipe === "tv" ? "Type: TV Show" : "Type: Movie"; // Menampilkan tipe konten

  const deskripsi = document.createElement("p"); // Membuat elemen deskripsi
  deskripsi.textContent = movie.overview || "Tidak ada deskripsi."; // Menampilkan sinopsis film

  // TOMBOL AKSI
  // ===============================
  const buttons = document.createElement("div"); // Membuat wadah tombol
  buttons.className = "buttons"; // Memberikan class tombol

  // TOMBOL TRAILER
  // ===============================
  const trailer = document.createElement("button"); // Membuat tombol trailer
  trailer.className = "trailer"; // Memberikan class tombol trailer
  trailer.type = "button"; // Menentukan tipe tombol
  const iconTrailer = document.createElement("i"); // Membuat ikon trailer
  iconTrailer.className = "bx bx-play"; // Memberikan ikon play
  trailer.appendChild(iconTrailer); // Memasukkan ikon ke tombol
  trailer.appendChild(document.createTextNode(" Play Trailer")); // Menambahkan teks tombol

  // TOMBOL FAVORITE
  // ===============================
  const favorite = document.createElement("button"); // Membuat tombol favorite
  favorite.className = "favorite"; // Memberikan class tombol favorite
  favorite.type = "button"; // Menentukan tipe tombol
  const iconFavorite = document.createElement("i"); // Membuat ikon favorite
  iconFavorite.className = "bx bx-heart"; // Memberikan ikon hati
  favorite.appendChild(iconFavorite); // Memasukkan ikon ke tombol
  favorite.appendChild(document.createTextNode(" Favorite")); // Menambahkan teks tombol

  buttons.appendChild(trailer); // Memasukkan tombol trailer
  buttons.appendChild(favorite); // Memasukkan tombol favorite

  // MENYUSUN INFORMASI
  // ===============================
  info.appendChild(judul); // Memasukkan judul
  info.appendChild(rating); // Memasukkan rating
  info.appendChild(tanggalRilis); // Memasukkan tanggal rilis
  info.appendChild(jenis); // Memasukkan tipe konten
  info.appendChild(deskripsi); // Memasukkan deskripsi
  info.appendChild(buttons); // Memasukkan tombol aksi

  detailContent.appendChild(poster); // Memasukkan poster ke halaman
  detailContent.appendChild(info); // Memasukkan informasi ke halaman

  // BACKGROUND BLUR
  // ===============================
  if (movie.backdrop_path) {
    // Mengecek apakah backdrop tersedia
    detailBox.style.setProperty(
      "--bg",
      "url('https://image.tmdb.org/t/p/original" + movie.backdrop_path + "')",
    ); // Menampilkan backdrop sebagai background
  }

  // FAVORITE
  // ===============================
  favorite.addEventListener("click", function () {
    // Menjalankan fungsi saat favorite diklik
    const loginStatus = localStorage.getItem("login"); // Mengambil status login

    if (loginStatus !== "true") {
      // Mengecek apakah user belum login
      alert("Silakan login terlebih dahulu."); // Memberikan peringatan
      window.location.href = "login.html"; // Mengarahkan ke halaman login
      return; // Menghentikan fungsi
    }

    let favorites = JSON.parse(localStorage.getItem("favorite")) || []; // Mengambil daftar favorite

    const sudahAda = favorites.some(function (item) {
      // Mengecek apakah film sudah ada
      return item.id === movie.id && item.detailType === tipe; // Membandingkan ID dan tipe konten
    });

    if (sudahAda) {
      // Jika film sudah ada
      alert("Film sudah ada di Favorite."); // Menampilkan pesan
    } else {
      const favoriteData = { ...movie, detailType: tipe }; // Membuat data favorite
      favorites.push(favoriteData); // Menambahkan film ke daftar favorite
      localStorage.setItem("favorite", JSON.stringify(favorites)); // Menyimpan favorite
      alert("Berhasil ditambahkan ke Favorite."); // Menampilkan pesan berhasil
    }
  });

  // PLAY TRAILER
  // ===============================
  trailer.addEventListener("click", function () {
    // Menjalankan fungsi saat trailer diklik
    ambilTrailer(); // Mengambil data trailer
  });
}

// MENGAMBIL DATA CAST
// ===============================
async function ambilCast() {
  try {
    let url; // Menyimpan URL API cast

    if (tipe === "tv") {
      // Mengecek apakah konten berupa TV Show
      url = "https://api.themoviedb.org/3/tv/" + movie.id + "/credits"; // URL API cast TV Show
    } else {
      url = "https://api.themoviedb.org/3/movie/" + movie.id + "/credits"; // URL API cast Movie
    }

    const response = await fetch(url, pengaturan); // Mengirim request ke TMDB

    if (!response.ok) {
      // Mengecek response API
      throw new Error("Gagal mengambil cast"); // Membuat error jika request gagal
    }

    const data = await response.json(); // Mengubah response menjadi JSON
    tampilkanCast(data.cast || []); // Menampilkan data cast
  } catch (error) {
    console.error("Cast gagal diambil:", error); // Menampilkan error di console
    const pesan = document.createElement("p"); // Membuat pesan error
    pesan.textContent = "Cast tidak dapat dimuat."; // Memberikan teks error
    castList.appendChild(pesan); // Menampilkan pesan ke halaman
  }
}

// MENAMPILKAN CAST
// ===============================
function tampilkanCast(cast) {
  castList.replaceChildren(); // Menghapus isi daftar cast sebelumnya

  if (!cast || cast.length === 0) {
    // Mengecek apakah data cast kosong
    const pesan = document.createElement("p"); // Membuat pesan kosong
    pesan.textContent = "Data cast tidak tersedia."; // Memberikan teks pesan
    castList.appendChild(pesan); // Menampilkan pesan
    return; // Menghentikan fungsi
  }

  cast.forEach(function (actor) {
    // Mengulang seluruh data cast
    const card = document.createElement("div"); // Membuat card cast
    card.className = "cast-card"; // Memberikan class card

    const gambar = document.createElement("img"); // Membuat elemen foto
    if (actor.profile_path) {
      // Mengecek apakah foto tersedia
      gambar.src = "https://image.tmdb.org/t/p/w185" + actor.profile_path; // Menentukan URL foto cast
    } else {
      gambar.src = "../img/no-image.jpg"; // Menggunakan gambar cadangan
    }

    gambar.alt = actor.name || "Actor"; // Memberikan teks alternatif
    gambar.loading = "lazy"; // Memuat gambar secara lazy

    const nama = document.createElement("h3"); // Membuat elemen nama
    nama.textContent = actor.name || "Unknown"; // Menampilkan nama aktor

    const karakter = document.createElement("p"); // Membuat elemen karakter
    karakter.textContent = actor.character || "Actor"; // Menampilkan karakter aktor

    card.appendChild(gambar); // Memasukkan foto ke card
    card.appendChild(nama); // Memasukkan nama ke card
    card.appendChild(karakter); // Memasukkan karakter ke card
    castList.appendChild(card); // Menampilkan card ke halaman
  });
}

// MENGAMBIL TRAILER
// ===============================
async function ambilTrailer() {
  try {
    let url; // Menyimpan URL API trailer

    if (tipe === "tv") {
      // Mengecek apakah konten berupa TV Show
      url = "https://api.themoviedb.org/3/tv/" + movie.id + "/videos"; // URL API trailer TV Show
    } else {
      url = "https://api.themoviedb.org/3/movie/" + movie.id + "/videos"; // URL API trailer Movie
    }

    const response = await fetch(url, pengaturan); // Mengirim request ke TMDB

    if (!response.ok) {
      // Mengecek response API
      throw new Error("Trailer request gagal"); // Membuat error jika request gagal
    }

    const data = await response.json(); // Mengubah response menjadi JSON

    let trailer = data.results.find(function (video) {
      // Mencari trailer YouTube
      return video.site === "YouTube" && video.type === "Trailer"; // Memastikan video adalah trailer YouTube
    });

    if (!trailer) {
      // Jika trailer tidak ditemukan
      trailer = data.results.find(function (video) {
        // Mencari teaser YouTube
        return video.site === "YouTube" && video.type === "Teaser"; // Memastikan video adalah teaser
      });
    }

    if (trailer) {
      // Mengecek apakah trailer ditemukan
      trailerVideo.src = "https://www.youtube.com/embed/" + trailer.key; // Menentukan sumber video
      popup.style.display = "flex"; // Menampilkan popup trailer
    } else {
      alert("Trailer tidak tersedia."); // Memberikan pesan jika trailer tidak tersedia
    }
  } catch (error) {
    console.error("Trailer gagal:", error); // Menampilkan error di console
    alert("Trailer gagal dimuat."); // Memberikan pesan error
  }
}

// MENUTUP TRAILER
// ===============================
closeTrailer.addEventListener("click", function () {
  // Menjalankan fungsi saat tombol close diklik
  popup.style.display = "none"; // Menyembunyikan popup
  trailerVideo.src = ""; // Menghentikan video
});

// KLIK DI LUAR POPUP
// ===============================
popup.addEventListener("click", function (event) {
  // Menangani klik pada area popup
  if (event.target === popup) {
    // Mengecek apakah background popup diklik
    popup.style.display = "none"; // Menyembunyikan popup
    trailerVideo.src = ""; // Menghentikan video
  }
});

// TOMBOL ESC
// ===============================
document.addEventListener("keydown", function (event) {
  // Menangani tombol keyboard
  if (event.key === "Escape") {
    // Mengecek apakah tombol Escape ditekan
    popup.style.display = "none"; // Menyembunyikan popup
    trailerVideo.src = ""; // Menghentikan video
  }
});

// ================= PENGATURAN API =================
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDZkODBhMzczM2Q2NGVhYzU2ZTAxZTc1NTM0NmJjOCIsIm5iZiI6MTc4NzQ3ODYzOC45MzUwMDAyLCJzdWIiOiI2YThhYzI2ZTA4N2JiYWY3MmYwOTQzYTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-4ls6kA84dgHrFj6grIq35c-vWP8BKD5qszCjdGmYSU"; // token TMDB untuk mengakses API

const pengaturan = {
  headers: {
    Authorization: "Bearer " + token,
  },
};

// Menyimpan data halaman
let halaman = 1;
let genre = "all";
let kataKunci = "";

const searchInput = document.getElementById("search-input"); // Mengambil input pencarian

// ================= FAVORITE =================
let favorites = JSON.parse(localStorage.getItem("favorite")) || []; // Mengambil data favorite dari localStorage, nah di ls itu kan menyimpan dalam bentuk string
              // mengubah string json menjadi array/object js
function sudahFavorite(tvId) { // mengecek apakah tv sudah ada di favo 
  return favorites.some(function (item) { // adakah ata i dalam array yang memenuhi kondisi
    return item.id === tvId && item.detailType === "tv"; // cek apakah ada id yang sma dengan tvid dantipenya tv
  }); // Mengecek apakah TV Show sudah menjadi favorite
}

// ================= MENGAMBIL DATA TV SHOW =================
async function ambilTv() {
  const tempat = document.querySelector("#movie-list"); // Mengambil tempat daftar TV Show

  tempat.replaceChildren(); // Menghapus isi sebelumnya

  const pesanMuat = document.createElement("p"); // Membuat pesan loading
  pesanMuat.textContent = "Loading TV shows..."; // Memberikan teks loading
  tempat.appendChild(pesanMuat); // Menampilkan pesan loading

  try {
    let url; // Menyimpan URL API

    if (kataKunci) {
      url =
        "https://api.themoviedb.org/3/search/tv?query=" +
        encodeURIComponent(kataKunci) + // memastikan kata kunci idubah ke format yang aman untuk url
        halaman; // URL pencarian TV Show
    } else if (genre === "all") {
      url = "https://api.themoviedb.org/3/tv/popular?page=" + halaman; // URL TV Show populer
    } else {
      url =
        "https://api.themoviedb.org/3/discover/tv?with_genres=" +
        genre +
        "&page=" +
        halaman; // URL filter genre TV Show
    }

    const response = await fetch(url, pengaturan); // Mengirim request ke TMDB

    if (!response.ok) { // jika respone false
      throw new Error("TMDB gagal mengambil data TV Show"); // Membuat error jika request gagal
    }

    const data = await response.json(); // Mengubah response menjadi JSON

    tampilkanTv(data.results); // Menampilkan data TV Show
    tampilkanPagination(data.total_pages); // Menampilkan pagination
  } catch (error) {
    console.log("TV Show gagal diambil:", error); // Menampilkan error ke console

    tempat.replaceChildren(); // Menghapus pesan loading

    const pesanGagal = document.createElement("p"); // Membuat pesan gagal
    pesanGagal.textContent = "Gagal memuat TV Show. Periksa token TMDB."; // Memberikan teks error
    tempat.appendChild(pesanGagal); // Menampilkan pesan error
  }
}

// ================= MENAMPILKAN TV SHOW =================
function tampilkanTv(data) {
  const tempat = document.querySelector("#movie-list"); // Mengambil tempat daftar TV Show

  tempat.replaceChildren(); // Menghapus isi sebelumnya

  if (!data || data.length === 0) { // jika data tidak ada or or jumlah datanya === 0
    const pesanKosong = document.createElement("p"); // Membuat pesan kosong
    pesanKosong.textContent = "TV Show tidak ditemukan."; // Memberikan teks pesan
    tempat.appendChild(pesanKosong); // Menampilkan pesan
    return;
  }

  for (let i = 0; i < data.length; i++) {
    const tv = data[i]; // Mengambil data TV Show

    if (!tv.poster_path) {
      continue; // Melewati TV Show yang tidak memiliki poster
    }

    const card = document.createElement("div"); // Membuat card TV Show
    card.className = "movie-card"; // Memberikan class card

    const poster = document.createElement("div"); // Membuat wadah poster
    poster.className = "poster"; // Memberikan class poster

    const gambar = document.createElement("img"); // Membuat elemen gambar

    gambar.src = "https://image.tmdb.org/t/p/w500" + tv.poster_path; // Menentukan URL poster TMDB

    gambar.alt = tv.name; // Memberikan teks alternatif gambar

    poster.appendChild(gambar); // Memasukkan gambar ke poster

    // ================= FAVORITE BUTTON =================
    const favoriteButton = document.createElement("button"); // Membuat tombol favorite
    favoriteButton.className = "favorite-button"; // Memberikan class tombol favorite

    const icon = document.createElement("span"); // Membuat elemen ikon
    icon.className = "material-symbols-outlined"; // Memberikan class ikon

    if (sudahFavorite(tv.id)) { // cek apakah sudah ada i daftar favorite pengguna
      favoriteButton.classList.add("active"); // Memberikan class active jika sudah favorite
      icon.textContent = "favorite"; // Menampilkan ikon favorite
    } else {
      icon.textContent = "favorite_border"; // Menampilkan ikon favorite kosong
    }

    favoriteButton.appendChild(icon); // Memasukkan ikon ke tombol

    favoriteButton.addEventListener("click", function (event) {
      event.stopPropagation(); // Mencegah atau menhan card ikut diklik atau biar tidak merembet ke elemen inuk
      toggleFavorite(tv, favoriteButton, icon); // Menjalankan fungsi favorite untuk menambah atau menghapus data dari daftar favorite
    });

    poster.appendChild(favoriteButton); // Memasukkan tombol favorite ke poster

    // ================= INFO TV SHOW =================
    const info = document.createElement("div"); // Membuat wadah informasi
    info.className = "movie-info"; // Memberikan class informasi

    const judul = document.createElement("h3"); // Membuat elemen judul
    judul.textContent = tv.name; // Menampilkan nama TV Show

    const meta = document.createElement("div"); // Membuat wadah metadata
    meta.className = "movie-meta"; // Memberikan class metadata

    const rating = document.createElement("span"); // Membuat elemen rating
    rating.className = "rating"; // Memberikan class rating

    rating.textContent =
      "★ " + (tv.vote_average ? tv.vote_average.toFixed(1) : "0.0"); // Menampilkan rating

    const tahun = document.createElement("span"); // Membuat elemen tahun

    tahun.textContent = tv.first_air_date
      ? tv.first_air_date.substring(0, 4)
      : "----"; // Menampilkan tahun tayang

    meta.appendChild(rating); // Memasukkan rating ke metadata
    meta.appendChild(tahun); // Memasukkan tahun ke metadata

    info.appendChild(judul); // Memasukkan judul ke informasi
    info.appendChild(meta); // Memasukkan metadata ke informasi

    card.appendChild(poster); // Memasukkan poster ke card
    card.appendChild(info); // Memasukkan informasi ke card

    // ================= KLIK CARD =================
    card.addEventListener("click", function () {
      localStorage.setItem("detailMovie", JSON.stringify(tv)); // Menyimpan data TV Show

      localStorage.setItem("detailType", "tv"); // Menyimpan tipe konten

      localStorage.setItem("detailBack", "tv-show.html"); // Menyimpan halaman kembali

      window.location.href = "detail.html"; // Membuka halaman detail
    });

    tempat.appendChild(card); // Menampilkan card ke halaman
  }
}

// ================= FAVORITE FUNCTION =================
function toggleFavorite(tv, button, icon) {
  const login = localStorage.getItem("login"); // Mengambil status login

  if (login !== "true") {
    alert("Silakan login terlebih dahulu."); // Memberikan peringatan login
    window.location.href = "login.html"; // Mengarahkan ke halaman login
    return;
  }

  if (sudahFavorite(tv.id)) {
    favorites = favorites.filter(function (item) {
      return !(item.id === tv.id && item.detailType === "tv"); // Menghapus TV Show dari favorite
    });

    button.classList.remove("active"); // Menghapus status active
    icon.textContent = "favorite_border"; // Mengubah ikon menjadi kosong
  } else {
    favorites.push({
      ...tv,
      detailType: "tv",
    }); // Menambahkan TV Show ke favorite

    button.classList.add("active"); // Menambahkan status active
    icon.textContent = "favorite"; // Mengubah ikon menjadi favorite

    alert("Berhasil ditambahkan ke Favorite."); // Memberikan pesan berhasil
  }

  localStorage.setItem("favorite", JSON.stringify(favorites)); // Menyimpan favorite ke localStorage
}

// ================= PILIH GENRE =================
const tombolGenre = document.querySelectorAll(".genre"); // Mengambil semua tombol genre

tombolGenre.forEach(function (tombol) { // menjalankan function satu kali untuk setiap item dalam kumpulan data
  tombol.addEventListener("click", function () {
    tombolGenre.forEach(function (item) {
      item.classList.remove("active"); // Menghapus active dari semua tombol
    });

    tombol.classList.add("active"); // Memberikan active pada tombol yang dipilih

    genre = tombol.dataset.genre; // Mengambil genre yang dipilih
    kataKunci = ""; // Menghapus kata kunci pencarian

    if (searchInput) {
      searchInput.value = ""; // Mengosongkan input pencarian
    }

    halaman = 1; // Mengembalikan halaman ke halaman pertama
    ambilTv(); // Mengambil data TV Show
  });
});

// ================= SEARCH =================
if (searchInput) {
  searchInput.addEventListener("keyup", function (event) {
    if (event.key !== "Enter") {
      return; // Hanya menjalankan pencarian saat Enter ditekan
    }

    kataKunci = searchInput.value.trim(); // Mengambil kata kunci pencarian
    halaman = 1; // Mengembalikan halaman ke halaman pertama
    ambilTv(); // Mengambil data berdasarkan pencarian
  });
}

// ================= MEMBUAT PAGINATION =================
function tampilkanPagination(total) {
  const pagination = document.querySelector("#pagination"); // Mengambil elemen pagination

  pagination.replaceChildren(); // Menghapus pagination sebelumnya

  const jumlah = Math.min(total, 10); // Menentukan jumlah halaman yang ditampilkan

  for (let i = 1; i <= jumlah; i++) {
    const tombol = document.createElement("button"); // Membuat tombol halaman

    tombol.className = "page-button"; // Memberikan class tombol halaman
    tombol.textContent = i; // Menampilkan nomor halaman

    if (i === halaman) {
      tombol.classList.add("active"); // Memberikan active pada halaman saat ini
    }

    tombol.addEventListener("click", function () {
      halaman = i; // Mengubah halaman aktif
      ambilTv(); // Mengambil data halaman yang dipilih

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      }); // Mengembalikan scroll ke bagian atas
    });

    pagination.appendChild(tombol); // Menampilkan tombol pagination
  }
}

// ================= JALANKAN =================
ambilTv(); // Menjalankan fungsi untuk mengambil data TV Show

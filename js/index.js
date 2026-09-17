// ================= PENGATURAN API =================
// Konfigurasi token dan header untuk mengakses API TMDB.
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDZkODBhMzczM2Q2NGVhYzU2ZTAxZTc1NTM0NmJjOCIsIm5iZiI6MTc4NzQ3ODYzOC45MzUwMDAyLCJzdWIiOiI2YThhYzI2ZTA4N2JiYWY3MmYwOTQzYTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-4ls6kA84dgHrFj6grIq35c-vWP8BKD5qszCjdGmYSU";
const pengaturan = { // membuat variabel
  headers: { // mengirim informasi tambahan ketika meminta data ke server tmdb tersebut
    Authorization: "Bearer " + token, // ini sebagai bukti bahwa kita tuh punya izin untuk mengakses tmdb
    "Content-Type": "application/json", // memberitahu bahwa format data yang kita gunakan adalah json
  },
};

// Menyimpan data film untuk kebutuhan slider.
let film = []; // array kosong untuk menampung data film yang digunakan sebagai slider
let nomor = 0; // menandai indeks/urutan film yang sedang tampil di slider (dimulai dari 0)

// ================= AMBIL DATA MOVIE =================
// Mengambil data movie populer dan movie dengan rating tertinggi.
async function ambilMovie() { // fungsi yang akan menjalankan proses yang membutuhkan waktu, seperti mengambil data dari internet
  try { // memulai bagian kode yang akan dijalankan
    const responseUpcoming = await fetch( // meminta data dari api(fetch) await itu menunggu respon
      "https://api.themoviedb.org/3/movie/upcoming", // endpoint
      pengaturan,
    );
    const dataUpcoming = await responseUpcoming.json(); // mengubah response dari server menjai js dalam format json

    const responsePopular = await fetch(
      "https://api.themoviedb.org/3/movie/popular",
      pengaturan,
    );
    const dataPopular = await responsePopular.json();

    const responseTop = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated",
      pengaturan,
    );
    const dataTop = await responseTop.json();

    film = dataUpcoming.results.slice(0, 5); // mengambil 5 film pertama dari data upcoming // result berisi bayak film
    tampilkanSlider();  // memanggil fungsi slider
    tampilkanMovie(dataPopular.results, "popular-movie-list"); // memanggil fungsi tampilkan film populer dalam bentuk kartu atau card
    tampilkanMovie(dataTop.results, "top-rated-movie-list");
  } catch (error) { // jika terjadi error akan kesini dan menampilkan pesan dibawah
    console.log("Data movie gagal diambil:", error);
  }
}

// ================= AMBIL DATA TV SHOW =================
// Mengambil data TV Show populer dan TV Show dengan rating tertinggi.
async function ambilTv() {
  try {
    const responsePopular = await fetch(
      "https://api.themoviedb.org/3/tv/popular",
      pengaturan,
    );
    const dataPopular = await responsePopular.json();

    const responseTop = await fetch(
      "https://api.themoviedb.org/3/tv/top_rated",
      pengaturan,
    );
    const dataTop = await responseTop.json();

    tampilkanMovie(dataPopular.results, "popular-tv-list");
    tampilkanMovie(dataTop.results, "top-rated-tv-list");
  } catch (error) {
    console.log("Data TV Show gagal diambil:", error);
  }
}

// ================= TAMPILKAN SLIDER =================
// Menampilkan film pada bagian hero slider.
function tampilkanSlider() {
  if (film.length === 0) { // 
    return;
  }

  const data = film[nomor];
  const hero = document.querySelector(".hero");
  const modeTerang = document.body.classList.contains("light");

  const gradient = modeTerang
    ? "linear-gradient(90deg, #F4F6FA 15%, rgba(244,246,250,.9) 50%, rgba(74,105,179,.15)), "
    : "linear-gradient(90deg, #111 15%, rgba(17,17,17,.9) 50%, rgba(74,105,179,.2)), ";

  hero.style.backgroundImage =
    gradient +
    "url('https://image.tmdb.org/t/p/original" +
    data.backdrop_path +
    "')";

  hero.style.backgroundSize = "cover";
  hero.style.backgroundPosition = "center";

  document.querySelector("#judul-film").textContent = data.title;
  document.querySelector("#deskripsi-film").textContent =
    data.overview || "Tidak ada deskripsi film.";

  tampilkanIndicator();
}

// ================= INDIKATOR SLIDER =================
// Membuat titik indikator sesuai jumlah film pada slider.
function tampilkanIndicator() {
  const tempat = document.querySelector("#slider-indicator");
  tempat.replaceChildren();

  for (let i = 0; i < film.length; i++) {
    const titik = document.createElement("span");

    if (i === nomor) {
      titik.className = "active";
    }

    tempat.appendChild(titik);
  }
}

// ================= TOMBOL SLIDER =================
// Mengatur tombol untuk berpindah ke film sebelumnya.
document.querySelector("#slider-prev").addEventListener("click", function () {
  nomor--;

  if (nomor < 0) {
    nomor = film.length - 1; // jika posisi di film pertama, putar ke film paling akhir
  }

  tampilkanSlider();
});

// Mengatur tombol untuk berpindah ke film berikutnya.
document.querySelector("#slider-next").addEventListener("click", function () {
  nomor++;

  if (nomor >= film.length) {
    nomor = 0; // jika sudah di akhir film, kembali ke film pertama
  }

  tampilkanSlider();
});

// ================= SLIDER OTOMATIS =================
// Mengubah slide secara otomatis setiap 5 detik.
setInterval(function () {
  if (film.length > 0) {
    nomor++;

    if (nomor >= film.length) {
      nomor = 0;
    }

    tampilkanSlider();
  }
}, 5000);

// ================= TAMPILKAN CARD MOVIE / TV =================
// Membuat card movie atau TV Show berdasarkan data dari TMDB.
function tampilkanMovie(data, id) {
  const tempat = document.querySelector("#" + id);
  tempat.replaceChildren();

  data.slice(0, 5).forEach(function (movie) {
    const card = document.createElement("div");
    card.className = "movie-card";

    const poster = document.createElement("div");
    poster.className = "poster";

    const gambar = document.createElement("img");

    if (movie.poster_path) {
      gambar.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
    }

    gambar.alt = movie.title || movie.name;

    const judul = document.createElement("h3");
    judul.textContent = movie.title || movie.name;

    poster.appendChild(gambar);
    card.appendChild(poster);
    card.appendChild(judul);
    tempat.appendChild(card);

    // Menentukan tipe konten berdasarkan daftar yang digunakan.
    const tipeKonten =
      id === "popular-tv-list" || id === "top-rated-tv-list" ? "tv" : "movie";

    // Membuka halaman detail ketika card diklik.
    card.addEventListener("click", function () {
      localStorage.setItem("detailMovie", JSON.stringify(movie));
      localStorage.setItem("detailType", tipeKonten);
      localStorage.setItem("detailBack", "../index.html");
      window.location.href = "html/detail.html";
    });
  });
}

// ================= VIEW DETAIL DARI SLIDER =================
// Menyimpan data film slider lalu membuka halaman detail.
document.querySelector("#detail-button").addEventListener("click", function () {
  if (film.length === 0) {
    return;
  }

  const movie = film[nomor];

  localStorage.setItem("detailMovie", JSON.stringify(movie));
  localStorage.setItem("detailType", "movie");
  localStorage.setItem("detailBack", "../index.html");

  window.location.href = "html/detail.html";
});

// ================= FAVORITE DARI SLIDER =================
// Menambahkan film yang sedang tampil ke daftar favorite.
document
  .querySelector("#favorite-button")
  .addEventListener("click", function () {
    if (film.length === 0) {
      return;
    }

    const movie = film[nomor];
    const login = localStorage.getItem("login");

    if (login !== "true") {
      alert("Silakan login terlebih dahulu.");
      window.location.href = "html/login.html";
      return;
    }

    let favorite = JSON.parse(localStorage.getItem("favorite")) || [];

    const sudahAda = favorite.some(function (item) {
      return item.id === movie.id;
    });

    if (!sudahAda) {
      favorite.push(movie);
      localStorage.setItem("favorite", JSON.stringify(favorite));
      alert("Film berhasil ditambahkan ke Favorite.");
    } else {
      alert("Film sudah ada di Favorite.");
    }
  });

// ================= SEARCH =================
// Mengarahkan pencarian dari halaman Home ke halaman Movies.
const searchInputHome = document.querySelector("#search-input"); // mencari atribut dengan id = search-innput kemudian hasilnya akan di simpan di searchinputhome

if (searchInputHome) {
  searchInputHome.addEventListener("keyup", function (event) {
    if (event.key !== "Enter") {
      return;
    }

    const keyword = searchInputHome.value.trim();

    if (keyword === "") {
      return;
    }

    window.location.href = "html/movies.html?q=" + encodeURIComponent(keyword);
  });
}

// Menjalankan pengambilan data movie dan TV Show saat halaman dibuka.
ambilMovie();
ambilTv();

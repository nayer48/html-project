// ================= PENGATURAN API =================

// Token TMDB untuk mengakses API
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDZkODBhMzczM2Q2NGVhYzU2ZTAxZTc1NTM0NmJjOCIsIm5iZiI6MTc4NzQ3ODYzOC45MzUwMDAyLCJzdWIiOiI2YThhYzI2ZTA4N2JiYWY3MmYwOTQzYTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-4ls6kA84dgHrFj6grIq35c-vWP8BKD5qszCjdGmYSU";

// URL dasar API TMDB
const baseUrl = "https://api.themoviedb.org/3";

// URL dasar untuk gambar/poster TMDB
const imageUrl = "https://image.tmdb.org/t/p/w500";

// ================= ELEMENT HTML =================

const movieList = document.getElementById("movie-list");
const genreButtons = document.querySelectorAll(".genre");
const searchInput = document.getElementById("search-input");
const pagination = document.getElementById("pagination");

// ================= VARIABEL =================

let currentGenre = "all";
let currentPage = 1;
let totalPages = 1;

// ================= FAVORITE =================

// Mengambil data favorite yang tersimpan di localStorage
let favorites = JSON.parse(localStorage.getItem("favorite")) || [];

function sudahFavorite(movieId) {
  // Mengecek apakah film sudah ada di daftar favorite
  return favorites.some(function (item) {
    return item.id === movieId && item.detailType === "movie";
  });
}

// ================= AMBIL DATA MOVIE =================

async function getMovies(page = 1) {
  movieList.replaceChildren();

  const pesanMuat = document.createElement("p");
  pesanMuat.textContent = "Loading movies...";
  movieList.appendChild(pesanMuat);

  currentPage = page;

  // Membuat URL untuk mengambil daftar film
  let url =
    baseUrl +
    "/discover/movie?language=id-ID&sort_by=popularity.desc&page=" +
    page;

  // Menambahkan filter genre jika bukan "all"
  if (currentGenre !== "all") {
    url += "&with_genres=" + currentGenre;
  }

  try {
    const response = await fetch(url, {
      headers: {
        // Mengirim token untuk autentikasi API
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("TMDB gagal mengambil data");
    }

    const data = await response.json();

    totalPages = data.total_pages;

    tampilkanMovies(data.results);
    tampilkanPagination();
  } catch (error) {
    console.error(error);

    movieList.replaceChildren();

    const pesanGagal = document.createElement("p");
    pesanGagal.textContent = "Gagal memuat film. Periksa TOKEN TMDB.";
    movieList.appendChild(pesanGagal);
  }
}

// ================= TAMPILKAN MOVIE =================

function tampilkanMovies(movies) {
  movieList.replaceChildren();

  if (!movies || movies.length === 0) {
    const pesanKosong = document.createElement("p");
    pesanKosong.textContent = "Film tidak ditemukan.";
    movieList.appendChild(pesanKosong);
    return;
  }

  movies.forEach(function (movie) {
    // Membuat card film
    const card = document.createElement("div");
    card.className = "movie-card";

    // ================= KLIK CARD → DETAIL =================

    card.addEventListener("click", function () {
      // Menyimpan data film sebelum pindah ke halaman detail
      localStorage.setItem("detailMovie", JSON.stringify(movie));
      localStorage.setItem("detailType", "movie");
      localStorage.setItem("detailBack", "movies.html");

      window.location.href = "detail.html";
    });

    // ================= POSTER =================

    const poster = document.createElement("div");
    poster.className = "poster";

    const img = document.createElement("img");

    // Mengecek apakah film memiliki poster
    if (movie.poster_path) {
      img.src = imageUrl + movie.poster_path;
    } else {
      img.src = "https://placehold.co/500x750/111111/FFFFFF?text=No+Poster";
    }

    img.alt = movie.title || "Movie";
    poster.appendChild(img);

    // ================= FAVORITE BUTTON =================

    const favoriteButton = document.createElement("button");
    favoriteButton.className = "favorite-button";

    const icon = document.createElement("span");
    icon.className = "material-symbols-outlined";

    // Menentukan tampilan tombol berdasarkan status favorite
    if (sudahFavorite(movie.id)) {
      favoriteButton.classList.add("active");
      icon.textContent = "favorite";
    } else {
      icon.textContent = "favorite_border";
    }

    favoriteButton.appendChild(icon);

    // Klik tombol favorite
    favoriteButton.addEventListener("click", function (event) {
      // Mencegah card ikut terbuka ketika tombol favorite diklik
      event.stopPropagation();

      toggleFavorite(movie, favoriteButton, icon);
    });

    poster.appendChild(favoriteButton);

    // ================= INFO MOVIE =================

    const info = document.createElement("div");
    info.className = "movie-info";

    const title = document.createElement("h3");
    title.textContent = movie.title || "Unknown";

    // ================= RATING + TAHUN =================

    const meta = document.createElement("div");
    meta.className = "movie-meta";

    const rating = document.createElement("span");
    rating.className = "rating";

    const nilaiRating = movie.vote_average
      ? movie.vote_average.toFixed(1)
      : "0.0";

    // Menampilkan simbol bintang + nilai rating
    rating.textContent = "★ " + nilaiRating;

    const tahun = document.createElement("span");

    // Mengambil 4 angka pertama dari tanggal rilis
    if (movie.release_date) {
      tahun.textContent = movie.release_date.substring(0, 4);
    } else {
      tahun.textContent = "----";
    }

    meta.appendChild(rating);
    meta.appendChild(tahun);

    info.appendChild(title);
    info.appendChild(meta);

    // ================= GABUNG CARD =================

    card.appendChild(poster);
    card.appendChild(info);

    movieList.appendChild(card);
  });
}

// ================= FAVORITE FUNCTION =================

function toggleFavorite(movie, button, icon) {
  const login = localStorage.getItem("login");

  // Mengecek apakah user sudah login
  if (login !== "true") {
    alert("Silakan login terlebih dahulu.");

    window.location.href = "login.html";
    return;
  }

  // Jika film sudah favorite → hapus
  if (sudahFavorite(movie.id)) {
    favorites = favorites.filter(function (item) {
      return !(item.id === movie.id && item.detailType === "movie");
    });

    button.classList.remove("active");
    icon.textContent = "favorite_border";
  }

  // Jika belum favorite → tambahkan
  else {
    favorites.push({
      ...movie,
      detailType: "movie",
    });

    button.classList.add("active");
    icon.textContent = "favorite";

    alert("Berhasil ditambahkan ke Favorite.");
  }

  // Menyimpan kembali data favorite ke localStorage
  localStorage.setItem("favorite", JSON.stringify(favorites));
}

// ================= PAGINATION =================

function tampilkanPagination() {
  if (!pagination) {
    return;
  }

  pagination.replaceChildren();

  // ================= PREVIOUS =================

  const previous = document.createElement("button");
  previous.className = "page-button";
  previous.textContent = "‹";

  // Disable jika sedang berada di halaman pertama
  previous.disabled = currentPage === 1;

  previous.addEventListener("click", function () {
    if (currentPage > 1) {
      getMovies(currentPage - 1);

      // Kembali ke bagian paling atas halaman
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });

  pagination.appendChild(previous);

  // ================= NOMOR HALAMAN =================

  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    const button = document.createElement("button");

    button.className = "page-button";
    button.textContent = i;

    // Memberikan tanda pada halaman yang sedang aktif
    if (i === currentPage) {
      button.classList.add("active");
    }

    button.addEventListener("click", function () {
      getMovies(i);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    pagination.appendChild(button);
  }

  // ================= NEXT =================

  const next = document.createElement("button");

  next.className = "page-button";
  next.textContent = "›";

  // Disable jika sudah berada di halaman terakhir
  next.disabled = currentPage >= totalPages;

  next.addEventListener("click", function () {
    if (currentPage < totalPages) {
      getMovies(currentPage + 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });

  pagination.appendChild(next);
}

// ================= FILTER GENRE =================

genreButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    // Menghapus status active dari semua tombol genre
    genreButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    // Memberikan status active pada genre yang dipilih
    button.classList.add("active");

    currentGenre = button.getAttribute("data-genre");

    // Mengambil data dari halaman pertama
    getMovies(1);
  });
});

// ================= SEARCH =================

if (searchInput) {
  searchInput.addEventListener("keyup", function (event) {
    // Pencarian dilakukan ketika tombol Enter ditekan
    if (event.key !== "Enter") {
      return;
    }

    const keyword = searchInput.value.trim();

    // Jika pencarian kosong, tampilkan semua film
    if (keyword === "") {
      getMovies(1);
      return;
    }

    searchMovies(keyword);
  });
}

// ================= SEARCH MOVIE =================

async function searchMovies(keyword) {
  movieList.replaceChildren();

  const pesanCari = document.createElement("p");
  pesanCari.textContent = "Mencari film...";
  movieList.appendChild(pesanCari);

  if (pagination) {
    pagination.replaceChildren();
  }

  try {
    // Membuat URL untuk pencarian film
    const url =
      baseUrl +
      "/search/movie?query=" +
      encodeURIComponent(keyword) +
      "&language=id-ID&page=1";

    const response = await fetch(url, {
      headers: {
        // Mengirim token TMDB
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Search TMDB gagal");
    }

    const data = await response.json();

    tampilkanMovies(data.results);
  } catch (error) {
    console.error(error);

    movieList.replaceChildren();

    const pesanGagalCari = document.createElement("p");
    pesanGagalCari.textContent = "Gagal mencari film.";

    movieList.appendChild(pesanGagalCari);
  }
}

// ================= JALANKAN =================
// Mengambil parameter pencarian dari URL
const paramUrl = new URLSearchParams(window.location.search);
const kataKunciAwal = paramUrl.get("q");

if (kataKunciAwal) {
  if (searchInput) {
    searchInput.value = kataKunciAwal;
  }

  searchMovies(kataKunciAwal);
} else {
  // Jika tidak ada pencarian, tampilkan daftar film
  getMovies(1);
}

// TEMA & AREA AKUN
// ===============================================================

(function () {
  // Membungkus kode agar variabel tidak mengganggu script lain

  // ================= TEMA LIGHT / DARK =================
  function terapkanTema() {
    // Menerapkan tema yang tersimpan
    const tema = localStorage.getItem("movieTimeTheme") || "dark"; // Mengambil tema dari localStorage
    document.body.classList.toggle("light", tema === "light"); // Menambahkan atau menghapus class light

    document.querySelectorAll(".theme-button").forEach(function (tombol) {
      // Mengambil semua tombol tema
      while (tombol.firstChild) {
        // Mengecek apakah tombol masih memiliki isi
        tombol.removeChild(tombol.firstChild); // Menghapus ikon sebelumnya
      }

      const ikon = document.createElement("span"); // Membuat elemen ikon
      ikon.className = "material-symbols-outlined"; // Memberikan class Google Material Symbols
      ikon.textContent = tema === "light" ? "dark_mode" : "light_mode"; // Menentukan ikon berdasarkan tema
      tombol.appendChild(ikon); // Memasukkan ikon ke tombol
    });
  }

  terapkanTema(); // Menjalankan tema saat halaman dibuka

  document.querySelectorAll(".theme-button").forEach(function (tombol) {
    // Mengambil semua tombol tema
    tombol.addEventListener("click", function () {
      // Menjalankan fungsi saat tombol diklik
      const temaSekarang = localStorage.getItem("movieTimeTheme") || "dark"; // Mengambil tema saat ini
      const temaBaru = temaSekarang === "light" ? "dark" : "light"; // Mengubah tema ke kebalikannya
      localStorage.setItem("movieTimeTheme", temaBaru); // Menyimpan tema baru
      terapkanTema(); // Menerapkan tema baru
    });
  });

  // ================= AREA AKUN HEADER =================
  function terapkanAuthArea() {
    // Mengatur tampilan login atau akun
    const authArea = document.querySelector(".auth-area"); // Mengambil area akun pada header

    if (!authArea) {
      // Mengecek apakah area akun tidak tersedia
      return; // Menghentikan fungsi jika elemen tidak ditemukan
    }

    const basePath = authArea.dataset.base || ""; // Mengambil path halaman berdasarkan lokasi file
    const loginStatus = localStorage.getItem("login"); // Mengambil status login pengguna

    while (authArea.firstChild) {
      // Mengecek apakah area akun masih memiliki isi
      authArea.removeChild(authArea.firstChild); // Menghapus isi sebelumnya
    }

    if (loginStatus === "true") {
      // Mengecek apakah pengguna sudah login
      const userData = JSON.parse(localStorage.getItem("userData") || "null"); // Mengambil data pengguna
      const namaAkun = userData && userData.nama ? userData.nama : "Akun"; // Mengambil nama akun

      const tautanAkun = document.createElement("a"); // Membuat link menuju halaman akun
      tautanAkun.href = basePath + "account.html"; // Menentukan alamat halaman akun
      tautanAkun.className = "account"; // Memberikan class account
      tautanAkun.title = namaAkun; // Menampilkan nama saat kursor diarahkan

      const ikonAkun = document.createElement("span"); // Membuat elemen ikon akun
      ikonAkun.className = "material-symbols-outlined"; // Memberikan class Google Material Symbols
      ikonAkun.textContent = "person"; // Menentukan ikon pengguna
      tautanAkun.appendChild(ikonAkun); // Memasukkan ikon ke link akun

      const tombolLogout = document.createElement("button"); // Membuat tombol logout
      tombolLogout.type = "button"; // Menentukan tipe tombol
      tombolLogout.className = "logout"; // Memberikan class logout
      tombolLogout.id = "header-logout-button"; // Memberikan ID tombol logout
      tombolLogout.textContent = "Logout"; // Memberikan teks tombol

      authArea.appendChild(tautanAkun); // Menampilkan link akun
      authArea.appendChild(tombolLogout); // Menampilkan tombol logout

      tombolLogout.addEventListener("click", function () {
        // Menjalankan fungsi saat logout diklik
        localStorage.removeItem("login"); // Menghapus status login
        alert("Anda berhasil logout."); // Menampilkan pesan logout
        window.location.href = basePath + "../index.html"; // Mengarahkan kembali ke halaman utama
      });
    } else {
      // Menjalankan bagian ini jika pengguna belum login
      const tautanLogin = document.createElement("a"); // Membuat link login
      tautanLogin.href = basePath + "login.html"; // Menentukan alamat halaman login
      tautanLogin.className = "login"; // Memberikan class login
      tautanLogin.textContent = "Login"; // Memberikan teks Login

      const tautanDaftar = document.createElement("a"); // Membuat link daftar
      tautanDaftar.href = basePath + "register.html"; // Menentukan alamat halaman register
      tautanDaftar.className = "daftar"; // Memberikan class daftar
      tautanDaftar.textContent = "Daftar"; // Memberikan teks Daftar

      authArea.appendChild(tautanLogin); // Menampilkan link login
      authArea.appendChild(tautanDaftar); // Menampilkan link daftar
    }
  }

  terapkanAuthArea(); // Menjalankan pengaturan area akun
})();

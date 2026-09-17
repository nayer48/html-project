// LOGIN & REGISTER)
// ===============================
const loginForm = document.getElementById("login-form"); // Mengambil form login
const registerForm = document.getElementById("register-form"); // Mengambil form register

// CEK STATUS LOGIN
// ===============================
if (loginForm && localStorage.getItem("login") === "true") {
  // Mengecek apakah user sudah login di halaman login
  const userDataSudahLogin = JSON.parse(
    localStorage.getItem("userData") || "null",
  ); // Mengambil data user yang sedang login
  alert(
    "Anda sudah login" +
      (userDataSudahLogin && userDataSudahLogin.nama
        ? " sebagai " + userDataSudahLogin.nama
        : "") +
      ".",
  ); // Menampilkan informasi akun yang sudah login
  window.location.href = "account.html"; // Mengarahkan user ke halaman akun
}

if (registerForm && localStorage.getItem("login") === "true") {
  // Mengecek apakah user sudah login di halaman register
  alert("Anda sudah login. Silakan logout dulu untuk mendaftar akun baru."); // Memberikan peringatan kepada user
  window.location.href = "account.html"; // Mengarahkan user ke halaman akun
}

// LOGIN
// ===============================
if (loginForm) {
  // Mengecek apakah form login tersedia
  loginForm.addEventListener("submit", function (e) {
    // Menjalankan proses saat form login dikirim
    e.preventDefault(); // Mencegah halaman melakukan reload
    const email = document.getElementById("login-email").value.trim(); // Mengambil email dari input login
    const password = document.getElementById("login-password").value; // Mengambil password dari input login

    if (!email || !password) {
      // Mengecek apakah email atau password kosong
      alert("Email dan password wajib diisi."); // Menampilkan pesan jika input belum lengkap
      return; // Menghentikan proses login
    }

    // DATA AKUN
    // ===============================
    const userData = JSON.parse(localStorage.getItem("userData")); // Mengambil data akun dari localStorage
    if(!userData) {
      alert("anda belum terdaftar. silakan daftar dulu");
      window.location.href = "register.html"
      return;
    }
    if(userData.email !== email || userData.password !== password) {
      alert("email atau password salah");
      return;
    }

    localStorage.setItem("login", "true"); // Menyimpan status bahwa user sudah login
    alert("Login berhasil! Selamat datang, " + userData.nama + "."); // Menampilkan pesan login berhasil
    window.location.href = "../index.html"; // Mengarahkan user ke halaman utama
  });
}

// REGISTER
// ===============================
if (registerForm) {
  // Mengecek apakah form register tersedia
  registerForm.addEventListener("submit", function (e) {
    // Menjalankan proses saat form register dikirim
    e.preventDefault(); // Mencegah halaman melakukan reload

    const nama = document.getElementById("register-nama").value.trim(); // Mengambil nama dari input register
    const email = document.getElementById("register-email").value.trim(); // Mengambil email dari input register
    const password = document.getElementById("register-password").value; // Mengambil password dari input register

    if (!nama || !email || !password) {
      // Mengecek apakah semua input sudah diisi
      alert("Semua kolom wajib diisi."); // Menampilkan pesan jika ada input yang kosong
      return; // Menghentikan proses register
    }

    // CEK EMAIL TERDAFTAR
    // ===============================
    const dataLama = JSON.parse(localStorage.getItem("userData") || "null"); // Mengambil data akun yang sudah tersimpan

    if (dataLama && dataLama.email === email) {
      // Mengecek apakah email sudah pernah digunakan
      alert("Email ini sudah terdaftar. Silakan login."); // Memberikan informasi bahwa email sudah terdaftar
      window.location.href = "login.html"; // Mengarahkan user ke halaman login
      return; // Menghentikan proses register
    }

    // SIMPAN AKUN
    // ===============================
    const userData = {
      nama: nama,
      email: email,
      password: password
    };
    localStorage.setItem("userData",JSON.stringify(userData));
    localStorage.setItem("login", "false");
    alert("Akun berhasil dibuat. Silakan login."); // Menampilkan pesan register berhasil
    window.location.href = "login.html"; // Mengarahkan user ke halaman login
  });
}

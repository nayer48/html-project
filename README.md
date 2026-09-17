# MovieTime
**MovieTime** adalah website streaming sederhana yang dibuat sebagai project tugas pelatihan. Website ini menampilkan informasi film dan TV Show yang diambil dari **The Movie Database (TMDB)**. Pengguna dapat melihat film populer, film dengan rating tertinggi, mencari film atau TV Show, melihat detail film, serta menyimpan film atau TV Show ke dalam daftar favorit.

---
## 1. Tentang Project
MovieTime merupakan website dengan konsep platform hiburan yang digunakan untuk mencari dan melihat informasi mengenai film dan TV Show.
Website ini dibuat dengan tampilan yang sederhana dan modern agar pengguna dapat dengan mudah mencari dan menemukan tontonan sesuai dengan mood mereka.

### A. Tujuan
Project ini dibuat untuk:
1. Membuat website menggunakan HTML, CSS, dan JavaScript.
2. Menerapkan navigasi antar halaman.
3. Menggunakan API untuk mengambil data film dan TV Show.
4. Menampilkan data secara dinamis menggunakan JavaScript.
5. Membuat fitur pencarian dan filter berdasarkan genre.
6. Menerapkan penggunaan DOM dan event pada JavaScript.
7. Membuat fitur login, register, dan akun sederhana.
8. Membuat fitur favorite untuk menyimpan film atau TV Show yang disukai.

---
## 2. Fitur Website
Website MovieTime memiliki beberapa fitur utama:
| No | Fitur | Keterangan |
|---|---|---|
| 1 | Home | Menampilkan film dan TV Show pilihan |
| 2 | Movies | Menampilkan daftar film dari TMDB |
| 3 | TV Shows | Menampilkan daftar TV Show dari TMDB |
| 4 | Search | Mencari film atau TV Show berdasarkan judul |
| 5 | Genre | Memfilter film dan TV Show berdasarkan genre |
| 6 | Pagination | Berpindah halaman untuk melihat lebih banyak data |
| 7 | Detail | Menampilkan informasi lengkap mengenai film atau TV Show |
| 8 | Cast | Menampilkan daftar pemeran |
| 9 | Trailer | Menampilkan trailer melalui halaman detail |
| 10 | Favorite | Menyimpan film atau TV Show ke daftar favorit |
| 11 | Login | Masuk ke akun pengguna |
| 12 | Register | Membuat akun baru |
| 13 | Account | Menampilkan informasi akun dan daftar favorite |
| 14 | Theme | Mengubah tema tampilan website |

---
## 3. API yang Digunakan
MovieTime menggunakan **The Movie Database (TMDB) API** untuk mengambil data film dan TV Show.
Data yang digunakan dari TMDB antara lain:
- Film yang akan datang.
- Film populer.
- Film dengan rating tertinggi.
- TV Show populer.
- TV Show dengan rating tertinggi.
- Data berdasarkan genre.
- Informasi detail film dan TV Show.
- Data pemeran atau cast.
- Trailer dan informasi pendukung lainnya.
Data dari API kemudian ditampilkan ke halaman website menggunakan JavaScript dan Fetch API.

---
## 4. Struktur Project
Struktur file project MovieTime:
```text
Niar_Setya_Iassha_Putri/
│
├── index.html
│
├── assets/
│   ├── logo-movie.png
│   └── logoo.png
│
├── css/
│   ├── account.css
│   ├── detail.css
│   ├── index.css
│   ├── movi-tv.css
│   ├── re-log.css
│   └── style.css
│
├── html/
│   ├── account.html
│   ├── detail.html
│   ├── login.html
│   ├── movies.html
│   ├── register.html
│   └── tv-show.html
│
└── js/
    ├── account.js
    ├── auth.js
    ├── common.js
    ├── detail.js
    ├── index.js
    ├── movies.js
    └── tv-show.js
```

### Keterangan File
| File/Folder | Fungsi |
|---|---|
| `index.html` | Halaman utama MovieTime |
| `movies.html` | Halaman daftar film |
| `tv-show.html` | Halaman daftar TV Show |
| `detail.html` | Halaman detail film atau TV Show |
| `login.html` | Halaman login |
| `register.html` | Halaman pendaftaran akun |
| `account.html` | Halaman akun pengguna dan favorite |
| `style.css` | CSS utama website |
| `index.css` | CSS khusus halaman Home |
| `movi-tv.css` | CSS halaman Movies dan TV Shows |
| `detail.css` | CSS halaman Detail |
| `re-log.css` | CSS halaman Login dan Register |
| `account.css` | CSS halaman Account |
| `common.js` | Mengatur fungsi umum seperti navigasi, login, dan tema |
| `index.js` | Mengambil dan menampilkan data pada halaman Home |
| `movies.js` | Mengatur data film, genre, search, pagination, dan favorite |
| `tv-show.js` | Mengatur data TV Show, genre, pagination, dan favorite |
| `detail.js` | Mengatur informasi detail, cast, trailer, dan favorite |
| `auth.js` | Mengatur proses Login dan Register |
| `account.js` | Mengatur halaman akun dan daftar favorite |
| `assets/` | Menyimpan logo yang digunakan pada website |

---
## 5. Alur Website
Alur navigasi website MovieTime:
```text
                         MovieTime
                            │
                            ▼
                           Home
                            │
             ┌──────────────┼──────────────┐
             ▼              ▼              ▼
          Movies         TV Shows         Login
             │              │              │
       ┌─────┴─────┐   ┌────┴─────┐        ▼
       ▼           ▼   ▼          ▼     Register
    Search       Genre Search    Genre      │
       │           │     │          │       ▼
       └─────┬─────┘     └────┬─────┘     Account
             │                │              │
             ▼                ▼              ▼
          Detail           Detail         Favorite
             │                │
        ┌────┴────┐      ┌────┴────┐
        ▼         ▼      ▼         ▼
       Cast     Trailer Cast     Trailer
```

---
## 6. Tampilan dan Konsep Website
MovieTime menggunakan konsep website streaming sederhana dengan tampilan yang berfokus pada poster dan informasi tontonan.
Beberapa elemen yang digunakan pada website antara lain:
1. Logo MovieTime.
2. Navigasi Home, Movies, dan TV Shows.
3. Search bar untuk mencari tontonan.
4. Hero section untuk menampilkan film yang akan datang.
5. Daftar Popular Movies.
6. Daftar Top Rated Movies.
7. Daftar Popular TV Shows.
8. Daftar Top Rated TV Shows.
9. Filter berdasarkan genre.
10. Pagination untuk melihat halaman berikutnya.
11. Halaman detail film dan TV Show.
12. Informasi cast.
13. Trailer.
14. Tombol Favorite.
15. Halaman akun pengguna.
16. Mode perubahan tema.
17. Footer dengan media sosial dan email.

---
## 7. Sistem Login dan Account
MovieTime memiliki fitur login dan register sederhana.
Pengguna dapat:
- Membuat akun melalui halaman Register.
- Login menggunakan email dan password.
- Melihat informasi akun.
- Logout dari akun.
- Melihat daftar film dan TV Show yang telah disimpan sebagai favorite.
Data login dan akun disimpan menggunakan **LocalStorage** browser.
Karena project ini masih berupa frontend, sistem login belum menggunakan database atau backend.

---
## 8. Sistem Favorite
Fitur Favorite digunakan untuk menyimpan film atau TV Show yang ingin ditonton kembali.
Cara kerjanya:
```text
Pilih Film / TV Show
        │
        ▼
Klik Favorite
        │
        ▼
Cek Status Login
        │
   ┌────┴────┐
   ▼         ▼
 Belum      Sudah
 Login      Login
   │         │
   ▼         ▼
Login      Simpan
Dulu       Favorite
             │
             ▼
         LocalStorage
             │
             ▼
          Account
             │
             ▼
          Favorites
```
Data favorite disimpan pada **LocalStorage**, sehingga dapat ditampilkan kembali pada halaman Account selama data browser masih tersedia.

---
### Catatan API
Website membutuhkan akses ke **TMDB API** untuk menampilkan data film dan TV Show.
Jika data tidak muncul, periksa kembali koneksi internet dan konfigurasi token TMDB pada file JavaScript.

---
## 9. Catatan
Project MovieTime merupakan website frontend yang dibuat untuk keperluan tugas pelatihan.
Beberapa fitur seperti Login, Register, Favorite, dan Theme menggunakan **LocalStorage** sehingga data hanya tersimpan pada browser yang digunakan.
Website ini belum menggunakan database dan backend sehingga sistem akun yang dibuat masih bersifat sederhana dan belum ditujukan sebagai sistem autentikasi untuk penggunaan sebenarnya.
Data film dan TV Show yang ditampilkan berasal dari **The Movie Database (TMDB)**.

---
## 10. Identitas Project
| Keterangan | Detail |
|---|---|
| Nama Project | MovieTime |
| Nama | Niar Putri |
| Tahun | 2026 |
| Tema | Website Streaming / Movie Information |
| API | The Movie Database (TMDB) |

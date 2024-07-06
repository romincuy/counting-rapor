# Penghitung Rata-rata Nilai Rapor

Ini adalah proyek sederhana untuk menghitung rata-rata nilai rapor per semester. Aplikasi ini memungkinkan pengguna untuk menambahkan nilai mata pelajaran per semester dan menghitung rata-rata nilai untuk setiap semester dan keseluruhan semester. Data dapat diekspor dalam bentuk PDF.

## Fitur
- Tambahkan mata pelajaran dan nilai untuk setiap semester
- Hitung rata-rata nilai per semester
- Hitung rata-rata nilai keseluruhan dari semua semester
- Ekspor data nilai ke dalam file PDF
- Reset semua data

## Teknologi yang Digunakan
- HTML
- CSS
- JavaScript
- jsPDF (untuk ekspor PDF)
- jsPDF-AutoTable (untuk tabel di PDF)
- LocalStorage (untuk penyimpanan data sementara di browser)

## Cara Menggunakan
1. Buka file `index.html` di browser Anda.
2. Pilih semester yang diinginkan dari dropdown.
3. Isi nama mata pelajaran dan nilai, lalu klik tombol "Tambah".
4. Ulangi langkah 3 untuk menambahkan mata pelajaran lainnya.
5. Tabel nilai untuk semester yang dipilih akan tampil di bawahnya.
6. Rata-rata nilai untuk semester yang dipilih akan otomatis dihitung dan ditampilkan.
7. Rata-rata nilai keseluruhan akan ditampilkan di bagian bawah.
8. Klik tombol "Ekspor ke PDF" untuk menyimpan data nilai dalam bentuk file PDF.
9. Klik tombol "Reset" untuk menghapus semua data dan mengatur ulang tampilan.

## Instalasi
1. Clone repositori ini ke komputer Anda.
   ```bash
   git clone https://github.com/romincuy/counting-rapor

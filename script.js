document.addEventListener('DOMContentLoaded', (event) => {
    loadData();
});

function hitungRataRata() {
    const nilaiSemester = [];
    const form = document.getElementById('raporForm');
    
    for (let i = 1; i <= 5; i++) {
        const nilai = form[`semester${i}`].value;
        if (nilai) {
            nilaiSemester.push(parseFloat(nilai));
            localStorage.setItem(`semester${i}`, nilai);
        } else {
            localStorage.removeItem(`semester${i}`);
        }
    }

    if (nilaiSemester.length > 0) {
        const rataRata = nilaiSemester.reduce((a, b) => a + b, 0) / nilaiSemester.length;
        document.getElementById('rataRataNilai').textContent = rataRata.toFixed(2);

        // Menampilkan hasil
        const tbody = document.querySelector('#hasilTable tbody');
        tbody.innerHTML = ''; // Membersihkan tabel sebelum mengisi data baru

        nilaiSemester.forEach((nilai, index) => {
            const row = tbody.insertRow();
            const cellSemester = row.insertCell(0);
            const cellNilai = row.insertCell(1);
            cellSemester.textContent = `Semester ${index + 1}`;
            cellNilai.textContent = nilai;
        });
    }
}

function loadData() {
    const form = document.getElementById('raporForm');

    for (let i = 1; i <= 5; i++) {
        const nilai = localStorage.getItem(`semester${i}`);
        if (nilai) {
            form[`semester${i}`].value = nilai;
        }
    }

    hitungRataRata();
}

function resetForm() {
    const form = document.getElementById('raporForm');

    for (let i = 1; i <= 5; i++) {
        form[`semester${i}`].value = '';
        localStorage.removeItem(`semester${i}`);
    }

    document.getElementById('rataRataNilai').textContent = '';

    const tbody = document.querySelector('#hasilTable tbody');
    tbody.innerHTML = ''; // Membersihkan tabel
}

async function eksporKePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Warna untuk header dan baris tabel
    const headerColor = [63, 81, 181]; // Biru
    const rowColor = [240, 240, 240]; // Abu-abu muda

    const table = document.getElementById('hasilTable');
    const rows = table.querySelectorAll('tr');

    const cellWidth = 40; // Lebar setiap sel
    const tableWidth = cellWidth * rows[0].children.length; // Total lebar tabel
    const pageWidth = doc.internal.pageSize.getWidth(); // Lebar halaman PDF
    const startX = (pageWidth - tableWidth) / 2; // Posisi X awal untuk meratakan tabel di tengah

    // Menambahkan judul di atas tabel
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('RATA-RATA NILAI SEMESTER', pageWidth / 2, 20, { align: 'center' });

    let y = 40; // Posisi awal pada PDF setelah judul
    rows.forEach((row, rowIndex) => {
        const cells = row.querySelectorAll('th, td');
        cells.forEach((cell, cellIndex) => {
            if (rowIndex === 0) {
                // Header
                doc.setFillColor(...headerColor);
                doc.rect(startX + cellIndex * cellWidth, y - 10, cellWidth, 10, 'F');
                doc.setTextColor(255, 255, 255); // Putih
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(12);
            } else {
                // Baris biasa
                doc.setFillColor(...rowColor);
                doc.rect(startX + cellIndex * cellWidth, y - 10, cellWidth, 10, 'F');
                doc.setTextColor(0, 0, 0); // Hitam
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(10);

                // Jika ini adalah baris terakhir (rata-rata), buat teks lebih besar dan tebal
                if (rowIndex === rows.length - 1) {
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(12);
                }
            }
            doc.text(cell.textContent, startX + cellIndex * cellWidth + cellWidth / 2, y - 2, { align: 'center' });
        });
        y += 10; // Menambahkan jarak antara baris
    });

    doc.save('nilai_rapor.pdf');
}


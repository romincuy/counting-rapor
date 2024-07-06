let data = [];

function tambahMataPelajaran() {
    const semester = document.getElementById('semester').value;
    const mataPelajaran = document.getElementById('mataPelajaran').value;
    const nilai = parseFloat(document.getElementById('nilai').value);

    if (mataPelajaran && !isNaN(nilai)) {
        data.push({ semester, mataPelajaran, nilai });
        updateTable();
        document.getElementById('mataPelajaran').value = '';
        document.getElementById('nilai').value = '';
    } else {
        alert("Pastikan semua data terisi dengan benar.");
    }
}

function updateTable() {
    const hasilTable = document.getElementById('hasilTable').getElementsByTagName('tbody')[0];
    hasilTable.innerHTML = '';

    const selectedSemester = document.getElementById('semester').value;

    const filteredData = data.filter(item => item.semester === selectedSemester);

    filteredData.forEach(item => {
        const row = hasilTable.insertRow();
        row.insertCell(0).innerText = `Semester ${item.semester}`;
        row.insertCell(1).innerText = item.mataPelajaran;
        row.insertCell(2).innerText = item.nilai;
    });

    const totalNilai = filteredData.reduce((total, item) => total + item.nilai, 0);
    const rataRataNilai = totalNilai / filteredData.length;
    document.getElementById('rataRataNilai').innerText = filteredData.length > 0 ? rataRataNilai.toFixed(2) : '0.00';

    const totalKeseluruhanNilai = data.reduce((total, item) => total + item.nilai, 0);
    const rataRataKeseluruhan = totalKeseluruhanNilai / data.length;
    document.getElementById('rataRataKeseluruhan').innerText = data.length > 0 ? rataRataKeseluruhan.toFixed(2) : '0.00';
}

document.getElementById('semester').addEventListener('change', updateTable);

function resetData() {
    data = [];
    document.getElementById('raporForm').reset();
    updateTable();
    document.getElementById('rataRataKeseluruhan').innerText = '0.00';
    document.getElementById('rataRataNilai').innerText = '0.00';
}

function eksporToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Menambahkan judul di atas PDF
    doc.setFontSize(16);
    doc.text('Rekapitulasi Nilai Semester', 105, 10, null, null, 'center');
    doc.setFontSize(12);

    const semesterData = {};

    data.forEach(item => {
        if (!semesterData[item.semester]) {
            semesterData[item.semester] = [];
        }
        semesterData[item.semester].push(item);
    });

    let startY = 20; // Adjusted startY for title space

    Object.keys(semesterData).forEach(semester => {
        doc.text(`Semester ${semester}`, 10, startY);
        startY += 10;

        const tableData = semesterData[semester].map(item => [`Semester ${item.semester}`, item.mataPelajaran, item.nilai]);

        doc.autoTable({
            head: [['Semester', 'Mata Pelajaran', 'Nilai']],
            body: tableData,
            startY: startY,
        });

        const semesterTotalNilai = semesterData[semester].reduce((total, item) => total + item.nilai, 0);
        const semesterRataRataNilai = semesterTotalNilai / semesterData[semester].length;

        startY = doc.autoTable.previous.finalY + 10;
        
        // Mengatur ukuran font untuk teks "Rata-rata Semester"
        doc.setFontSize(10);
        doc.text(`Rata-rata Semester ${semester}: ${semesterRataRataNilai.toFixed(2)}`, 10, startY);
        startY += 10;
        doc.setFontSize(12);
    });

    const totalKeseluruhanNilai = data.reduce((total, item) => total + item.nilai, 0);
    const rataRataKeseluruhan = totalKeseluruhanNilai / data.length;

    // Mengurangi jarak margin atas dari rata-rata keseluruhan
    doc.text(`Rata-rata Semua Semester: ${rataRataKeseluruhan.toFixed(2)}`, 10, startY + 5);

    doc.save('nilai_rapor.pdf');
}






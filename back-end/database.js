// Menjalankan fungsi fetchDataForWeb() ketika DOM sudah terinisialisasi sepenuhnya
document.addEventListener('DOMContentLoaded', () => {
    ambilData();
});

// Fungsi async untuk mengambil data dari MongoDB
async function ambilData() {
    try {
        // Mendapatkan elemen dengan ID 'dataList' dari HTML
        const dataList = document.getElementById('dataList');
        if (!dataList) {
            throw new Error("Elemen dengan id 'dataList' tidak ditemukan.");
        }
        // Mengambil data dari backend menggunakan fetch
        const response = await fetch('http://localhost:5000/APOD/getData');
        const data = await response.json();

        dataList.innerHTML = '';// Mengosongkan isi dataList sebelum menambahkan data baru

        // Memproses setiap item data dan menambahkannya ke dalam tabel
        data.data.forEach(item => {
            const row = document.createElement('tr');// Membuat baris baru untuk setiap item data
            
            // Menambahkan HTML ke dalam baris sesuai dengan struktur tabel
            row.innerHTML = `
                <th scope="row">${item.id}</th>
                <td>${item.title}</td>
                <td>${item.explanation}</td>
                <td>${item.date}</td>
                <td>
                    <button type="button" class="btn btn-warning" onclick="updateData(${item.id})">Update</button>
                    <button type="button" class="btn btn-danger" onclick="deleteData(${item.id})">Delete</button>
                </td>
            `;
            dataList.appendChild(row);// Menambahkan baris ke dalam tabel dataList
        });
    } catch (error) {
        console.error(error.message);
    }
}

// Menjalankan fungsi kontrolData() ketika DOM sudah terinisialisasi sepenuhnya
document.addEventListener('DOMContentLoaded', () => {
    const addDataForm = document.getElementById('addDataForm');
    addDataForm.addEventListener('submit', kontrolData);
});
// Fungsi untuk berpindah ke halaman 'input.html' saat tombol 'Tambah Data' ditekan
function tambahData() {
    // Mengarahkan ke halaman input.html
    window.location.href = 'input.html';
}

// Fungsi untuk menambahkan data baru ke MongoDB saat formulir disubmit
async function kontrolData(event) {
    event.preventDefault();

    // Mengambil data dari formulir dan mengonversinya ke objek data
    const formData = new FormData(event.target);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        // Mengirim data ke backend menggunakan metode POST
        const response = await fetch('http://localhost:5000/APOD/addData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        // Menampilkan pesan berhasil/gagal berdasarkan respons dari backend
        if (response.ok) {
            alert('Data berhasil ditambahkan!');
            
        } else {
            alert('Gagal menambahkan data. Silakan coba lagi.');
        }
    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan. Silakan periksa konsol.');
    }
}
// Fungsi untuk kembali ke halaman 'admin.html
function kembaliKeAdmin() {
    // Mengarahkan kembali ke halaman admin.html
    window.location.href = 'admin.html';
}
// Fungsi untuk berpindah ke halaman 'updateData.html' dengan menyertakan ID pada parameter URL
function updateData(id) {
    // Mengarahkan ke halaman updateData.html dengan menyertakan ID pada parameter URL
    window.location.href = `updateData.html?id=${id}`;
}

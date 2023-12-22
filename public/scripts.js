window.onload = () => {
  // Mendefinisikan URL endpoint API
    const apiUrl = '/api/gambar-nasa';
    // Mendapatkan elemen input tanggal dari halaman HTML
    const inputtanggal = document.getElementById('cari-tanggal');
  
    // Memanggil fungsi untuk menampilkan gambar APOD terbaru saat halaman dimuat
    apodTerbaru();
    // Menambahkan event listener untuk perubahan tanggal pada input
    inputtanggal.addEventListener('ubah', cariTanggal);
  };
  
  // Fungsi untuk memeriksa apakah tanggal memiliki format YYYY-MM-DD yang valid
  function validasiTanggal(dateString) {
    return /\d{4}-\d{2}-\d{2}/.test(dateString); // Format YYYY-MM-DD
  }
  
  // Fungsi untuk menampilkan gambar APOD terbaru
  function apodTerbaru() {
    const apiUrl = '/api/gambar-nasa';
  
    // Mengambil data gambar APOD terbaru dari API
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const gambar = document.getElementById('list-gambar');
  
        // Memproses data dan menampilkan gambar APOD terbaru di halaman
        data.slice(0, 6).forEach(imageData => {
          const imageContainer = listGambar(imageData);
          gambar.appendChild(imageContainer);
        });
      })
      .catch(error => console.log(error));
  }
  // Fungsi untuk mencari gambar APOD berdasarkan tanggal tertentu
  function cariTanggal() {
    // Mengambil tanggal dari input di halaman HTML
    const date = document.getElementById('cari-tanggal').value;
  
    // Memeriksa apakah format tanggal yang dimasukkan valid
    if (!validasiTanggal(date)) {
      console.error('Format tanggal tidak valid. Silakan gunakan YYYY-MM-DD.');
      return;
    }
  
    const apiUrl = `/api/gambar-nasa?date=${date}`;
  
     // Mengambil data gambar APOD berdasarkan tanggal dari API
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const hasilPencarian = document.getElementById('search-results-list');
        hasilPencarian.innerHTML = '';
         // Menampilkan hasil pencarian gambar APOD berdasarkan tanggal
        data.forEach(imageData => {
          const cariItem = listGambar(imageData);
          hasilPencarian.appendChild(cariItem);
        });
  
        const bagianHasilPencarian = document.querySelector('.search-result');
        bagianHasilPencarian.style.display = 'block';
      })
      .catch(error => console.log(error));
  }
  
  // Fungsi untuk membuat elemen daftar gambar APOD
  function listGambar(imageData) {
    const gambarUrl = imageData.url;
    const gambarekspansi = imageData.explanation;
    const title = imageData.title;
    const tanggal = imageData.date;
    // Membuat elemen list item dengan informasi gambar APOD
    const listItem = document.createElement('li');
    listItem.classList.add('search-result-item');
    listItem.innerHTML = `
      <img src="${gambarUrl}" alt="${title}" class="search-result-image">
      <div class="search-result-text">
        <h5 class="search-result-title">${title}</h5>
        <p class="search-result-caption">${gambarekspansi}</p>
        <p class="search-result-date">Date: ${tanggal}</p>
      </div>
    `;
  
    
    return listItem;
  }
  
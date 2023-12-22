const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();// Mengimpor dotenv untuk mengelola variabel 
const cors =require("cors");
const axios = require('axios');
const NASA_API = process.env.YOUR_NASA || 'U9hRG8LbzgAQfqle2LAyPV9k6c6gTsvF4pVKpOsw';// Kunci API NASA 

app.use(express.static(path.join(__dirname, 'public')));// Menyajikan file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'back-end')));// Menyajikan file statis dari folder 'back-end'
const database= require("./config/database");// Mengimpor konfigurasi database
database();// Menginisialisasi koneksi ke database


app.use(cors());// Menggunakan middleware CORS untuk mengizinkan permintaan lintas domain
app.use(express.json());// Middleware untuk mengurai permintaan JSON
app.use(express.urlencoded({extended: true}));// Middleware untuk mengurai permintaan URL-encoded
const PORT =process.env.PORT;// Menentukan port server yang akan digunakan

function isValidDate(dateString) {
    return /\d{4}-\d{2}-\d{2}/.test(dateString); // Format YYYY-MM-DD
  }

  // Endpoint untuk mengambil gambar dari API NASA
  app.get('/api/gambar-nasa', (req, res) => {
    const date = req.query.date || '';// Mengambil tanggal dari query params jika ada
  
    if (date && !isValidDate(date)) {// Memeriksa apakah tanggal yang diberikan valid
      return res.status(400).json({ error: 'Format tanggal tidak valid. Silakan gunakan YYYY-MM-DD.' });
    }
  
    let apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API}`;
  
    if (date) {
      apiUrl += `&date=${date}`; // Jika tanggal diberikan, gunakan tanggal tersebut dalam permintaan API
    } else {
      apiUrl += '&count=6'; // Mengambil 6 APOD terbaru jika tidak ada tanggal yang diberikan
    }
  // Mengambil data dari API NASA menggunakan Axios
    axios.get(apiUrl)
      .then(response => {
        if (!Array.isArray(response.data)) {
          res.json([response.data]);
        } else {
          res.json(response.data);
        }
      })
      .catch(error => {
        console.error('Terjadi kesalahan saat mengambil gambar NASA:', error.message);
        res.status(500).json({ error: 'Gagal mengambil gambar NASA' });
      });
  });

//Route 
const nasaRoute = require('./routes/nasaRoutes');// Mengimpor rute khusus untuk API NASA
app.use("/APOD",nasaRoute);// Menggunakan rute khusus untuk '/APOD'

// Menjalankan server pada port yang ditentukan
app.listen(PORT,() =>{
    console.log(`server berjalan di http://localhost:${PORT}`)
});

const mongoose = require("mongoose");// Mengimpor library MongoDB

// Membuat skema untuk data terkait informasi NASA
const nasaSchema = new mongoose.Schema({
    id: {
        type: Number, // Tipe data untuk properti 'id' adalah angka (Number)
        required: true,// Properti 'id' wajib ada (required)
      },
      title: {
        type: String,// Tipe data untuk properti 'title' adalah string (String)
        required: true,// Properti 'title' wajib ada (required)
      },
    
      explanation: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
},{
    timestamps:true,// Opsi untuk menambahkan fields 'createdAt' dan 'updatedAt' secara otomatis
});
// Mengekspor model Mongoose berdasarkan skema 'nasaSchema' dengan nama koleksi 'nasa'
module.exports = mongoose.model("nasa",nasaSchema);
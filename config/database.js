const mongoose =require("mongoose"); // Mengimpor library Mongoose untuk berinteraksi dengan MongoDB

module.exports =async()=>{
    
    try{
        // Menggunakan Mongoose untuk terhubung dengan basis data MongoDB
        await mongoose.connect(process.env.Mongo_URL);// Menggunakan URL MongoDB dari environment variable

        // Jika koneksi berhasil, akan mencetak pesan ke konsol
        console.log("database berhasil konek");
    }catch(error){
        // Jika terjadi kesalahan saat koneksi, akan menangkap kesalahan tersebut
        console.log(error);
    }
}
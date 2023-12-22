const Joi = require("joi");// Mengimpor library Joi untuk validasi data

// Fungsi untuk membuat validasi data terkait informasi NASA
const buatValidasi = (data) => {
  // Membuat skema validasi menggunakan Joi
  const nasaSchema = Joi.object({
    id: Joi.number().required(),// Properti 'id' harus berupa angka dan wajib ada
    title: Joi.string().required(),// Properti 'title' harus berupa string dan wajib ada
    explanation: Joi.string().required(),// Properti 'explanation' harus berupa string dan wajib ada
    date: Joi.date().required(), // Properti 'date' harus berupa tanggal dan wajib ada
  });

  return nasaSchema.validate(data);// Melakukan validasi terhadap data yang diberikan sesuai skema yang telah dibuat
};
// Mengekspor fungsi createValidation agar dapat digunakan di file lain
module.exports = {
  buatValidasi,
};

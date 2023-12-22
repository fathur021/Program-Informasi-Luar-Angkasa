const express = require("express");// Mengimpor library Express.js untuk routing
const { addData, getData, getDataById, updateData, deleteData} = require("../controllers/nasaController");// Mengimpor fungsi dari nasaController
const route = express.Router();// Membuat objek router dari Express.js

// Mendefinisikan rute HTTP dan menghubungkannya dengan fungsi yang sesuai dari nasaController
route.post("/addData", addData);
route.get("/getData", getData);
route.get("/getData/:id",getDataById);
route.put("/editData/:id",updateData);
route.delete("/deleteData/:id",deleteData)

// Mengekspor objek router yang telah ditentukan rutenya
module.exports = route;

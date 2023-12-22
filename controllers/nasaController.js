const { response } = require('express');
const nasaModel = require('../models/nasaModel');// Mengimpor model Mongoose untuk data NASA

 // Mengimpor pesan respons default
const {
    responseDefault
} = require('../utils/responseMessage');

// Mengimpor fungsi validasi data
const {
    buatValidasi
} = require("../validation/nasaValidation");

//tambah data
const addData = async (req, res) => {
    try {
        // Mengecek apakah data dengan ID yang sama sudah ada
        const dataExist = await nasaModel.findOne({
            id: req.body.id
        });
        if (dataExist) {
            return res.status(400).json({
                message: responseDefault.DATA_EXIST,
            });
        }
        // Melakukan validasi data yang akan ditambahkan
        const {
            error
        } = buatValidasi(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        // Menambahkan data baru ke dalam basis data
        const response = await nasaModel.create(req.body);
        res.status(201).json({
            message: responseDefault.CREATED_DATA,
            data: response,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: responseDefault.INTERNAL_SERVER_ERROR,
        });
    }
};

// Fungsi untuk mendapatkan semua data
const getData = async (req, res) => {
    try {
        const response = await nasaModel.find();
        res.status(200).json({
            data: response,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: responseDefault.INTERNAL_SERVER_ERROR,
        });
    }
};

// Fungsi untuk mendapatkan data berdasarkan ID
const getDataById = async (req, res) => {
    try {
        const response = await nasaModel.findById(req.params.id);

        if (!response) {
            return res.status(404).json({
                message: responseDefault.ID_NOT_FOUND,
            });
        }

        res.status(200).json({
            data: response,
        });
    } catch (error) {
        // Menangani kesalahan, misalnya CastError
        if (error.name === 'CastError') {
            return res.status(404).json({
                message: responseDefault.ID_NOT_FOUND,
            });
        }

        console.error(error);
        res.status(500).json({
            message: responseDefault.INTERNAL_SERVER_ERROR,
        });
    }
};

// Fungsi untuk mengupdate data berdasarkan ID
const updateData = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    try {
        // Memeriksa apakah ID adalah string 24 karakter heksadesimal
        if (!/^[0-9a-fA-F]{24}$/.test(id)) {
            return res.status(400).json({
                message: 'Invalid ID format',
            });
        }

        const updatedData = await nasaModel.findByIdAndUpdate(id, { $set: body });

        if (!updatedData) {
            return res.status(404).json({
                message: 'Data not found',
            });
        }

        res.status(200).json({
            message: 'Data updated successfully',
        });
    } catch (error) {
        
        if (error.name === 'CastError') {
            return res.status(404).json({
                message: 'Data not found',
            });
        }

        console.error(error);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};
// Fungsi untuk menghapus data berdasarkan ID
const deleteData = async (req, res) => {
    try {
        const deletedData = await nasaModel.findByIdAndDelete(req.params.id);

        if (!deletedData) {
            return res.status(404).json({
                message: responseDefault.ID_NOT_FOUND,
            });
        }

        res.status(200).json({
            message: responseDefault.DATA_DELETE,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: responseDefault.INTERNAL_SERVER_ERROR,
        });
    }
};

//export fungsi
module.exports = {
    addData,
    getData,
    getDataById,
    updateData,
    deleteData,
};
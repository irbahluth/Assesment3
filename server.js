const express = require('express');
const cors = require('cors');

const port = 3000;
const app = express();

// Middleware untuk mengizinkan permintaan dari kelembapan asal tertentu
app.use(cors());

// Parsing body request
app.use(express.json());

// Data parameter (contoh data sederhana)
let parameters = [
    { id: 1, suhu: 'parameter 1', cuaca: 30, kelembapan: 'kelembapan parameter 1' },
    { id: 2, suhu: 'parameter 2', cuaca: 35, kelembapan: 'kelembapan parameter 2' },
    { id: 3, suhu: 'parameter 3', cuaca: 40, kelembapan: 'kelembapan parameter 3' }
];

// GET: Mendapatkan semua data parameter
app.get('/parameter', (req, res) => {
    res.json(parameters);
});

// GET: Mendapatkan data parameter berdasarkan ID
app.get('/parameter/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const parameter = parameters.find(g => g.id === id);
    if (parameter) {
        res.json(parameter);
    } else {
        res.status(404).json({ message: 'parameter tidak ditemukan' });
    }
});

// POST: Menambahkan data parameter baru
app.post('/parameter', (req, res) => {
    const parameter = req.body;
    parameter.id = parameters.length + 1;
    parameters.push(parameter);
    res.status(201).json(parameter);
});

// PUT: Mengupdate data parameter berdasarkan ID
app.put('/parameter/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const guruIndex = parameters.findIndex(g => g.id === id);
    if (guruIndex !== -1) {
        parameters[guruIndex] = { ...parameters[guruIndex], ...req.body };
        res.json(parameters[guruIndex]);
    } else {
        res.status(404).json({ message: 'parameter tidak ditemukan' });
    }
});

// DELETE: Menghapus data parameter berdasarkan ID
app.delete('/parameter/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const guruIndex = parameters.findIndex(g => g.id === id);
    if (guruIndex !== -1) {
        const parameter = parameters[guruIndex];
        parameters.splice(guruIndex, 1);
        res.json(parameter);
    } else {
        res.status(404).json({ message: 'parameter tidak ditemukan' });
    }
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});


const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/three.module.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'three.module.js'));
});

app.get('/GLTFLoader.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'GLTFLoader.js'));
});

app.get('/iphone.glb', (req, res) => {
    res.sendFile(path.join(__dirname, 'iphone.glb'));
});

app.get('/mesh.glb', (req, res) => {
    res.sendFile(path.join(__dirname, 'mesh.glb'));
});

app.get('/gltf_embedded_0.png', (req, res) => {
    res.sendFile(path.join(__dirname, 'gltf_embedded_0.png'));
});

app.listen(PORT, () => {
    console.log(`\x1b[35mServing Website on port ${PORT} \x1b[0m`);
});
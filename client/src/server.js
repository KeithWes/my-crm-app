const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let checklist = [
    { id: 1, text: 'Fundament legen', status: 'Fertig' },
    { id: 2, text: 'Wände hochziehen', status: 'In Bau' },
    { id: 3, text: 'Dach decken', status: 'In Planung' }
];

app.use(express.static(path.join(__dirname, '..', 'public')));

// Handle socket.io connections
io.on('connection', (socket) => {
    console.log('Ein Benutzer hat sich verbunden');
    
    // Sendet die aktuelle Checkliste an den neuen Benutzer
    socket.emit('update-checklist', checklist);

    // Hört auf das Ereignis 'add-item'
    socket.on('add-item', (item) => {
        item.id = checklist.length + 1; // Weisen Sie eine eindeutige ID zu
        checklist.push(item);
        io.emit('update-checklist', checklist);
    });

    // Hört auf das Ereignis 'update-status'
    socket.on('update-status', (update) => {
        const item = checklist.find(i => i.id === update.id);
        if (item) {
            item.status = update.status;
            io.emit('update-checklist', checklist);
        }
    });

    socket.on('disconnect', () => {
        console.log('Benutzer hat die Verbindung getrennt');
    });
});

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
